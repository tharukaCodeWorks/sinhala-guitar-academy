import { useCallback, useEffect, useRef, useState } from 'react'
import type { StrumStep, StrummingPattern } from '../data/strumming/types'
import {
  MAX_TEMPO_BPM,
  MIN_TEMPO_BPM,
  clampTempoBpm,
  stepDurationSeconds,
  stepGlyph,
  stepLabel,
} from '../data/strumming/utils'

export interface StrummingPlayerProps {
  pattern: StrummingPattern
  className?: string
}

/**
 * Note for callers that render more than one `StrummingPattern` through the
 * same `StrummingPlayer` mount point over time (e.g. a fixture picker): pass
 * `key={pattern.id}` so React remounts the player — and its tempo/playback
 * state — instead of trying to reconcile it in place.
 */

/** How often (ms) the scheduler wakes up to look for steps that need scheduling. */
const SCHEDULER_INTERVAL_MS = 25
/** How far ahead (seconds) of "now" the scheduler queues audio events. */
const SCHEDULE_AHEAD_SECONDS = 0.1

/** A step that has been handed to the Web Audio graph, with the exact AudioContext time it fires at. */
interface ScheduledStep {
  index: number
  time: number
}

/**
 * Plays a click/strum sound for a single step at a precise, pre-scheduled
 * AudioContext time. Using `AudioParam` automation scheduled directly on
 * `time` (rather than e.g. calling this at `time` via `setTimeout`) is what
 * gives the audio sample-accurate timing.
 */
function scheduleStepSound(
  audioContext: AudioContext,
  step: StrumStep,
  time: number,
) {
  if (step.type === 'rest') return

  const oscillator = audioContext.createOscillator()
  const gain = audioContext.createGain()
  oscillator.connect(gain)
  gain.connect(audioContext.destination)

  // Distinct timbre per step type so down/up/mute are distinguishable by ear.
  const frequencyHz =
    step.type === 'down' ? 880 : step.type === 'up' ? 1174.66 : 180
  oscillator.type = step.type === 'mute' ? 'square' : 'triangle'
  oscillator.frequency.setValueAtTime(frequencyHz, time)

  const peakGain =
    (step.accent ? 0.85 : 0.55) * (step.type === 'mute' ? 0.6 : 1)
  const durationSeconds = step.type === 'mute' ? 0.045 : 0.14

  gain.gain.setValueAtTime(0, time)
  gain.gain.linearRampToValueAtTime(peakGain, time + 0.004)
  gain.gain.exponentialRampToValueAtTime(0.0001, time + durationSeconds)

  oscillator.start(time)
  oscillator.stop(time + durationSeconds + 0.02)
}

/**
 * Renders a strumming pattern as a row of down/up/mute/rest indicators and
 * plays it back with an audible click on each step. Play/pause and tempo are
 * user-controlled; playback timing is driven by the Web Audio API using a
 * look-ahead scheduler (see `scheduler` below) rather than `setInterval`
 * alone, so it stays sample-accurate instead of drifting the way a naive
 * `setInterval`-per-step approach would.
 */
function StrummingPlayer({ pattern, className = '' }: StrummingPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [tempoBpm, setTempoBpm] = useState(pattern.tempoBpm)
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null)
  // Practice loop toggle: when on (the default), the bar auto-repeats for
  // continuous practice, same as before this control existed. When off,
  // playback stops itself after one pass through the bar, which is useful
  // for checking a pattern once without it running away on you.
  const [loopEnabled, setLoopEnabled] = useState(true)

  const audioContextRef = useRef<AudioContext | null>(null)
  const schedulerIntervalIdRef = useRef<number | null>(null)
  const animationFrameIdRef = useRef<number | null>(null)
  const autoStopTimeoutIdRef = useRef<number | null>(null)
  const nextStepIndexRef = useRef(0)
  const nextStepTimeRef = useRef(0)
  const scheduledStepsRef = useRef<ScheduledStep[]>([])
  // Set once the scheduler has queued the final step of a non-looping pass,
  // so it stops looking for more work instead of wrapping back to step 0.
  const loopStoppedRef = useRef(false)

  // Kept in refs so the scheduler/draw loops (which are only (re)started on
  // play) always read the *current* tempo/pattern/loop setting without
  // needing to be torn down and restarted every time those values change.
  const tempoBpmRef = useRef(tempoBpm)
  const patternRef = useRef(pattern)
  const loopEnabledRef = useRef(loopEnabled)
  useEffect(() => {
    tempoBpmRef.current = tempoBpm
  }, [tempoBpm])
  useEffect(() => {
    patternRef.current = pattern
  }, [pattern])
  useEffect(() => {
    loopEnabledRef.current = loopEnabled
  }, [loopEnabled])

  const stop = useCallback(() => {
    if (schedulerIntervalIdRef.current !== null) {
      window.clearInterval(schedulerIntervalIdRef.current)
      schedulerIntervalIdRef.current = null
    }
    if (animationFrameIdRef.current !== null) {
      window.cancelAnimationFrame(animationFrameIdRef.current)
      animationFrameIdRef.current = null
    }
    if (autoStopTimeoutIdRef.current !== null) {
      window.clearTimeout(autoStopTimeoutIdRef.current)
      autoStopTimeoutIdRef.current = null
    }
    scheduledStepsRef.current = []
    setIsPlaying(false)
    setCurrentStepIndex(null)
  }, [])

  // Tear down audio resources on unmount.
  useEffect(() => {
    return () => {
      stop()
      audioContextRef.current?.close().catch(() => {
        // Ignore: closing an already-closed context throws, which is harmless here.
      })
    }
  }, [stop])

  const getAudioContext = useCallback((): AudioContext => {
    if (!audioContextRef.current) {
      const AudioContextConstructor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      audioContextRef.current = new AudioContextConstructor()
    }
    return audioContextRef.current
  }, [])

  // Look-ahead scheduler: runs frequently on a plain interval, but only
  // decides *whether* to schedule something each tick — the actual audio
  // event time is always set against `audioContext.currentTime`, which is
  // the sample-accurate Web Audio clock. This is what keeps playback from
  // drifting the way driving audio directly off `setInterval` would.
  const scheduler = useCallback(() => {
    const audioContext = audioContextRef.current
    const steps = patternRef.current.steps
    if (!audioContext || steps.length === 0 || loopStoppedRef.current) return

    while (
      !loopStoppedRef.current &&
      nextStepTimeRef.current <
        audioContext.currentTime + SCHEDULE_AHEAD_SECONDS
    ) {
      const index = nextStepIndexRef.current
      const time = nextStepTimeRef.current
      const isLastStepOfBar = index === steps.length - 1
      const stepDuration = stepDurationSeconds(tempoBpmRef.current)

      scheduleStepSound(audioContext, steps[index], time)
      scheduledStepsRef.current.push({ index, time })

      nextStepTimeRef.current += stepDuration
      nextStepIndexRef.current = (index + 1) % steps.length

      // Practice loop off: once the bar's final step has been scheduled,
      // stop scheduling further steps and auto-stop playback once that
      // step finishes sounding, rather than wrapping back to step 0.
      if (isLastStepOfBar && !loopEnabledRef.current) {
        loopStoppedRef.current = true
        const msUntilBarEnds = Math.max(
          0,
          (time + stepDuration - audioContext.currentTime) * 1000,
        )
        autoStopTimeoutIdRef.current = window.setTimeout(() => {
          stop()
        }, msUntilBarEnds)
      }
    }
  }, [stop])

  // Visual draw loop: on every animation frame, advances the highlighted
  // step to whichever scheduled step's time has most recently passed
  // according to the same AudioContext clock the scheduler used, so the
  // indicator stays in sync with what's actually audible.
  const drawLoop = useCallback(function tick() {
    const audioContext = audioContextRef.current
    if (audioContext) {
      const now = audioContext.currentTime
      const scheduled = scheduledStepsRef.current
      let mostRecentlyPassed: ScheduledStep | undefined
      while (scheduled.length > 0 && scheduled[0].time <= now) {
        mostRecentlyPassed = scheduled.shift()
      }
      if (mostRecentlyPassed) {
        setCurrentStepIndex(mostRecentlyPassed.index)
      }
    }
    animationFrameIdRef.current = window.requestAnimationFrame(tick)
  }, [])

  const play = useCallback(() => {
    // Guard against double-starting (e.g. a rapid double click firing two
    // "play" events before React re-renders with isPlaying = true).
    if (schedulerIntervalIdRef.current !== null) return

    const audioContext = getAudioContext()
    if (audioContext.state === 'suspended') {
      void audioContext.resume()
    }

    nextStepIndexRef.current = 0
    // Give the very first step a small lead-in so it doesn't get scheduled
    // in the past if this tick is slightly late.
    nextStepTimeRef.current = audioContext.currentTime + 0.05
    scheduledStepsRef.current = []
    loopStoppedRef.current = false
    setCurrentStepIndex(null)

    scheduler()
    schedulerIntervalIdRef.current = window.setInterval(
      scheduler,
      SCHEDULER_INTERVAL_MS,
    )
    animationFrameIdRef.current = window.requestAnimationFrame(drawLoop)
    setIsPlaying(true)
  }, [getAudioContext, scheduler, drawLoop])

  function togglePlayback() {
    if (isPlaying) {
      stop()
    } else {
      play()
    }
  }

  function handleTempoChange(nextTempoBpm: number) {
    setTempoBpm(clampTempoBpm(nextTempoBpm))
  }

  const totalSteps = pattern.steps.length

  return (
    <div className={className}>
      {(pattern.title || pattern.description) && (
        <div className="mb-3">
          {pattern.title && (
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {pattern.title}
            </h3>
          )}
          {pattern.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {pattern.description}
            </p>
          )}
        </div>
      )}

      <div
        className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900"
        role="list"
        aria-label={`Strumming pattern steps for ${pattern.title}`}
      >
        {pattern.steps.map((step, index) => {
          const isCurrent = index === currentStepIndex
          return (
            <div
              key={index}
              role="listitem"
              aria-label={`Step ${index + 1}: ${stepLabel(step.type)}${step.accent ? ' (accented)' : ''}`}
              aria-current={isCurrent ? 'step' : undefined}
              className={`flex h-11 w-11 items-center justify-center rounded-md border text-lg font-semibold transition-colors duration-75 ${
                isCurrent
                  ? 'border-amber-500 bg-amber-300/80 text-gray-900 dark:border-amber-400 dark:bg-amber-400/40 dark:text-gray-100'
                  : 'border-gray-300 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
              } ${step.type === 'rest' ? 'opacity-40' : ''} ${step.accent ? 'ring-2 ring-amber-500/60' : ''}`}
            >
              {stepGlyph(step.type)}
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={togglePlayback}
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 focus:ring-2 focus:ring-amber-400 focus:outline-none"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          Tempo
          <input
            type="range"
            min={MIN_TEMPO_BPM}
            max={MAX_TEMPO_BPM}
            value={tempoBpm}
            onChange={(event) => handleTempoChange(Number(event.target.value))}
            aria-label="Tempo in beats per minute"
            className="w-32 accent-amber-500"
          />
          <input
            type="number"
            min={MIN_TEMPO_BPM}
            max={MAX_TEMPO_BPM}
            value={tempoBpm}
            onChange={(event) => handleTempoChange(Number(event.target.value))}
            aria-label="Tempo in beats per minute (exact value)"
            className="w-16 rounded border border-gray-300 bg-white px-1 py-0.5 text-sm dark:border-gray-700 dark:bg-gray-900"
          />
          BPM
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={loopEnabled}
            onChange={(event) => setLoopEnabled(event.target.checked)}
            aria-label="Loop this bar continuously while playing"
            className="h-4 w-4 rounded accent-amber-500"
          />
          Loop bar
        </label>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          Step {currentStepIndex !== null ? currentStepIndex + 1 : '–'} /{' '}
          {totalSteps}
        </span>
      </div>
    </div>
  )
}

export default StrummingPlayer

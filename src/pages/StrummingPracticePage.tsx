import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import PatternSourcePicker from '../components/PatternSourcePicker'
import StrummingPlayer from '../components/StrummingPlayer'
import type { StrummingPattern } from '../data/strumming/types'
import { strummingPatternFixtures } from '../data/strumming/fixtures'

/**
 * Strumming Practice page: pick one of the example patterns from the fixture
 * library, or build a custom one with a simple step editor, then practice it
 * with the embedded `StrummingPlayer` (which owns its own tempo, play/pause,
 * and practice-loop controls). Fully standalone — no song is selected here;
 * to practice a pattern *for* a specific song, use the Strum Builder tool
 * to import a chord sheet first.
 */
function StrummingPracticePage() {
  const [pattern, setPattern] = useState<StrummingPattern>(
    strummingPatternFixtures[0],
  )
  const [playerKey, setPlayerKey] = useState(strummingPatternFixtures[0].id)

  // `PatternSourcePicker` requires a stable `onChange` — wrap both setters
  // in one `useCallback` so the identity never changes across renders.
  const handlePatternChange = useCallback(
    (nextPattern: StrummingPattern, nextPlayerKey: string) => {
      setPattern(nextPattern)
      setPlayerKey(nextPlayerKey)
    },
    [],
  )

  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Strumming Practice
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Pick a common strumming pattern, or build your own, and practice it
          with the player below — tap play, adjust the tempo, and toggle the
          loop to repeat the bar for continuous practice. Building a pattern for
          a specific song? The{' '}
          <Link
            to="/strum-builder"
            className="font-medium text-amber-600 underline underline-offset-2 hover:text-amber-500 dark:text-amber-400"
          >
            Strum Builder
          </Link>{' '}
          tool can pull the chords straight out of a pasted chord sheet.
        </p>
      </div>

      <StrummingPatternGuide />

      <PatternSourcePicker onChange={handlePatternChange} />

      <div className="mt-8 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <StrummingPlayer key={playerKey} pattern={pattern} />
      </div>
    </section>
  )
}

/**
 * Reference guide: how to translate what a real chord/tab site (e.g.
 * Ultimate Guitar-style chord sheets) shows into a choice of pattern here,
 * plus general strumming know-how. Collapsed by default via `<details>` so
 * it doesn't crowd out the interactive picker/player for anyone who
 * already knows what they're looking for.
 */
function StrummingPatternGuide() {
  return (
    <details className="mb-6 rounded-lg border border-gray-200 bg-gray-50 open:pb-4 dark:border-gray-800 dark:bg-gray-900/40">
      <summary className="cursor-pointer list-none rounded-lg px-4 py-3 text-sm font-medium text-gray-900 select-none dark:text-gray-100">
        How do I pick the right pattern? (strumming notation guide)
      </summary>

      <div className="flex flex-col gap-6 px-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Reading a chord/tab site's strumming line
          </h3>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              Most chord/tab sites print an explicit strumming line right under
              the chords, as letters (
              <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-xs dark:bg-gray-800">
                D DU UDU
              </code>
              ) or arrows (
              <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-xs dark:bg-gray-800">
                ↓ ↓↑ ↑↓↑
              </code>
              ). Match each symbol to a step: <strong>D / ↓</strong> down,{' '}
              <strong>U / ↑</strong> up, <strong>X / x</strong> muted chuck, a
              dash or blank space rest. Build that exact sequence with the
              "Build your own" step editor above.
            </li>
            <li>
              Check the <strong>time signature</strong> printed at the top of
              the chart (4/4, 3/4, 6/8). Most pop, rock, and Bollywood songs are
              4/4 — the 8-step patterns here cover that. A 6/8 feel (common in
              baila and some folk songs) needs a 6-step bar — try{' '}
              <em>Baila 6/8 Shuffle</em>, or set the step editor to 6 steps.
            </li>
            <li>
              No pattern given? Use the <strong>genre or mood tag</strong> (or a
              high capo fret, which often signals a mellower cover) as a hint —
              "ballad" or "slow" points to a sparser strum like{' '}
              <em>Ballad Downstrokes</em> or <em>Bollywood Ballad (D-U-X-U)</em>
              ; "pop", "upbeat", or "dance" points to a fuller, faster one like{' '}
              <em>Pop-Folk (D-D-U-U-D-U)</em> or <em>Dance-Pop Upstrokes</em>.
            </li>
            <li>
              If a <strong>BPM/tempo number</strong> is given, dial the player's
              tempo control to match it — a pattern's shape and its tempo are
              independent, so you can always borrow a pattern's rhythm and set
              your own speed.
            </li>
            <li>
              Truly nothing specified? Start with{' '}
              <em>Pop-Folk (D-D-U-U-D-U)</em> — it's the most commonly taught
              pattern and fits the majority of pop/folk songs.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Strum notation legend
          </h3>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt className="font-mono font-semibold">D / ↓</dt>
            <dd>Downstroke</dd>
            <dt className="font-mono font-semibold">U / ↑</dt>
            <dd>Upstroke</dd>
            <dt className="font-mono font-semibold">X / x</dt>
            <dd>Muted/percussive chuck — stop the strings from ringing</dd>
            <dt className="font-mono font-semibold">- / blank</dt>
            <dd>Rest — keep the hand moving, don't strike the strings</dd>
            <dt className="font-mono font-semibold">bold / &gt;</dt>
            <dd>Accent — strike a little harder on that step</dd>
          </dl>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Good to know
          </h3>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              Keep your strumming hand moving in a steady down-up motion even
              through rests, just without touching the strings — a "ghost
              strum". Stopping the hand between strikes is the most common cause
              of losing time.
            </li>
            <li>
              A capo changes which chord shapes you play and what pitch they
              sound at, but it never changes the strumming pattern itself — the
              rhythm stays exactly the same regardless of capo position.
            </li>
            <li>
              These patterns are all built from 8th-note steps (or 6 for a 6/8
              feel), which covers almost every pop, folk, ballad, and
              Bollywood/baila groove. Faster, busier 16th-note feels aren't
              modeled step-by-step here — approximate them by adding mutes on
              the off-beats of an 8-step pattern.
            </li>
            <li>
              Two songs can share the exact same chords but feel completely
              different depending on the strumming pattern — always match the
              strum to the song's actual groove, not just its chord progression.
            </li>
          </ul>
        </div>
      </div>
    </details>
  )
}

export default StrummingPracticePage

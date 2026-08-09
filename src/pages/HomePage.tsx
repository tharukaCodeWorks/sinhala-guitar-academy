import { Link } from 'react-router-dom'
import { navGroups, type NavLeaf } from '../data/navigation'
import SectionIcon, { type SectionIconName } from '../components/SectionIcon'

/** Per-section blurbs, keyed by route — same content the old HomePage and
 *  KeyboardHomePage each already showed for these routes. */
const sectionDescriptions: Record<string, string> = {
  '/lessons': 'Follow a structured, sequential guitar method course.',
  '/chords': 'Look up chord diagrams and fingerings.',
  '/chord-families': 'Discover chords that sound great together.',
  '/capo-tool': 'Find the right capo position for any song.',
  '/fingering-practice': 'Drill chord shapes and transitions.',
  '/strumming-practice':
    'Learn common Sinhala and Hindi song strumming patterns.',
  '/strum-builder': 'Paste a chord sheet and build a strumming pattern for it.',
  '/songs': 'Play along with Sinhala songs, chords and tabs.',
  '/keyboard/lessons': 'Follow structured keyboard lessons from the basics up.',
  '/keyboard/chords': 'Look up keyboard chord diagrams and voicings.',
  '/keyboard/chord-families':
    'Discover chords that sound great together on keyboard.',
  '/keyboard/scales':
    'See scale notes and right/left-hand fingering on the keyboard.',
  '/keyboard/technique':
    'Drill technique exercises to build finger independence.',
  '/keyboard/songs': 'Play along with Sinhala songs arranged for keyboard.',
}

/** Icon per section, keyed by label (shared between the two tracks where the
 *  label means the same thing, e.g. both tracks have a "Lessons" section). */
const ITEM_ICONS: Record<string, SectionIconName> = {
  Lessons: 'book',
  'Chord Library': 'grid',
  'Chord Families': 'link',
  'Capo Tool': 'sliders',
  'Fingering Practice': 'hand',
  'Strumming Practice': 'waveform',
  'Strum Builder': 'wrench',
  Songs: 'note',
  'Scale Explorer': 'ladder',
  'Technique Drills': 'bolt',
}

const guitarGroup = navGroups.find((group) => group.label === 'Guitar')
const keyboardGroup = navGroups.find((group) => group.label === 'Keyboard')

interface TrackAccent {
  /** Eyebrow label + heading icon badge. */
  badge: string
  /** Heading icon badge background/text. */
  iconWrap: string
  /** Card border/background on hover. */
  cardHover: string
  /** Card icon badge. */
  cardIcon: string
  /** Solid CTA button (hub link, hero button). */
  solidButton: string
}

const guitarAccent: TrackAccent = {
  badge:
    'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
  iconWrap:
    'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400',
  cardHover:
    'hover:border-indigo-400 hover:bg-indigo-50 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10',
  cardIcon:
    'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
  solidButton:
    'bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400',
}

const keyboardAccent: TrackAccent = {
  badge:
    'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
  iconWrap:
    'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400',
  cardHover:
    'hover:border-violet-400 hover:bg-violet-50 dark:hover:border-violet-500 dark:hover:bg-violet-500/10',
  cardIcon:
    'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
  solidButton:
    'bg-violet-600 text-white hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400',
}

/** Staggered "equalizer" bars — a purely decorative CSS flourish for the
 *  hero, evoking sound/music without pulling in an image asset. */
function EqualizerBars() {
  const bars = [
    { height: 'h-8', delay: '0ms' },
    { height: 'h-14', delay: '150ms' },
    { height: 'h-6', delay: '300ms' },
    { height: 'h-16', delay: '450ms' },
    { height: 'h-10', delay: '600ms' },
    { height: 'h-5', delay: '750ms' },
  ]
  return (
    <div
      aria-hidden="true"
      className="flex items-end gap-1.5 rounded-2xl border border-gray-200/80 bg-white/60 p-4 shadow-sm backdrop-blur dark:border-gray-800/80 dark:bg-gray-900/60"
    >
      {bars.map((bar, index) => (
        <span
          key={index}
          style={{ animationDelay: bar.delay, animationDuration: '1.6s' }}
          className={`w-2.5 rounded-full bg-gradient-to-t from-indigo-500 to-violet-500 opacity-80 animate-pulse ${bar.height}`}
        />
      ))}
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Decorative gradient background: soft radial blobs plus a faint dot
          grid, all CSS — no raster assets. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/70 via-white to-white dark:from-indigo-950/30 dark:via-gray-950 dark:to-gray-950"
      />
      <div
        aria-hidden="true"
        className="absolute top-[-8rem] left-1/2 -z-10 h-96 w-[36rem] -translate-x-[70%] rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-500/20"
      />
      <div
        aria-hidden="true"
        className="absolute top-[-4rem] left-1/2 -z-10 h-96 w-[36rem] -translate-x-[10%] rounded-full bg-violet-400/30 blur-3xl dark:bg-violet-500/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)] [background-image:radial-gradient(circle,theme(colors.gray.400)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] dark:[background-image:radial-gradient(circle,theme(colors.gray.600)_1px,transparent_1px)]"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-20 text-center sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-gray-600 uppercase shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-300">
          Guitar &amp; Keyboard · Sinhala songs
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-100">
          Learn to play the songs you love, one{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            chord
          </span>{' '}
          at a time
        </h1>

        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Sinhala Guitar Academy teaches guitar and keyboard side by side —
          grounded in real Sinhala songs, with chord diagrams, structured
          lessons, and hands-on practice tools for both instruments.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#guitar"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            <SectionIcon name="guitar" className="h-4 w-4" />
            Start with Guitar
          </a>
          <a
            href="#keyboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400"
          >
            <SectionIcon name="piano" className="h-4 w-4" />
            Start with Keyboard
          </a>
        </div>

        <div className="mt-4 hidden sm:block">
          <EqualizerBars />
        </div>
      </div>
    </section>
  )
}

interface TrackSectionProps {
  id: string
  accent: TrackAccent
  icon: SectionIconName
  eyebrow: string
  title: string
  description: string
  items: NavLeaf[]
  hubLink?: NavLeaf
}

function TrackSection({
  id,
  accent,
  icon,
  eyebrow,
  title,
  description,
  items,
  hubLink,
}: TrackSectionProps) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent.iconWrap}`}
          >
            <SectionIcon name={icon} className="h-6 w-6" />
          </span>
          <div>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase ${accent.badge}`}
            >
              {eyebrow}
            </span>
            <h2 className="mt-1.5 text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-gray-100">
              {title}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>

        {hubLink && (
          <Link
            to={hubLink.path}
            className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm transition-colors ${accent.solidButton}`}
          >
            {hubLink.label}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`group flex h-full flex-col gap-3 rounded-xl border border-gray-200 bg-white/60 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/40 ${accent.cardHover}`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${accent.cardIcon}`}
              >
                <SectionIcon
                  name={ITEM_ICONS[item.label] ?? 'note'}
                  className="h-5 w-5"
                />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">
                  {sectionDescriptions[item.path]}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <HeroSection />

      {guitarGroup && (
        <TrackSection
          id="guitar"
          accent={guitarAccent}
          icon="guitar"
          eyebrow="Guitar track"
          title="Guitar"
          description="Chords, chord families, capo usage, fingering, and strumming practice for Sinhala and Hindi songs."
          items={guitarGroup.items}
        />
      )}

      {keyboardGroup && (
        <TrackSection
          id="keyboard"
          accent={keyboardAccent}
          icon="piano"
          eyebrow="Keyboard track"
          title="Keyboard"
          description="Lessons, chord library, chord families, scales, technique drills, and a Sinhala song library arranged for keyboard."
          items={keyboardGroup.items}
          hubLink={{ label: 'Open Keyboard Hub', path: '/keyboard' }}
        />
      )}
    </>
  )
}

export default HomePage

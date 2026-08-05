interface PlaceholderPageProps {
  title: string
  description: string
}

/**
 * Shared "coming soon" shell for routes whose real feature hasn't been
 * built yet. Later feature tasks (F2-F8) should replace the page that uses
 * this with real content rather than editing this component's markup.
 */
function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center gap-4 px-6 py-24 text-center">
      <span className="text-xs font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
        Coming soon
      </span>
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        {title}
      </h1>
      <p className="max-w-xl text-base text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </section>
  )
}

export default PlaceholderPage

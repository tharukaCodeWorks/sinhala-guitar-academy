function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 px-6 py-8 dark:border-gray-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm text-gray-500 sm:flex-row sm:justify-between sm:text-left dark:text-gray-400">
        <p>&copy; {year} Sinhala Guitar Academy. All rights reserved.</p>
        <p>
          Learn guitar through Sinhala songs — chords, capo, fingering &amp;
          strumming practice.
        </p>
      </div>
    </footer>
  )
}

export default Footer

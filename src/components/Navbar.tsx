import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../data/navigation'

const linkBaseClasses =
  'whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors'
const linkInactiveClasses =
  'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
const linkActiveClasses =
  'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return [
    linkBaseClasses,
    isActive ? linkActiveClasses : linkInactiveClasses,
  ].join(' ')
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4"
      >
        <NavLink
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="shrink-0 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100"
        >
          Sinhala Guitar Academy
        </NavLink>

        {/* Desktop nav links. `whitespace-nowrap` on each link (above) is
            the actual fix for labels wrapping onto two lines: without it, a
            squeezed flex item shrinks by reflowing its text rather than
            overflowing. `overflow-x-auto` is a graceful fallback for
            viewports too narrow to fit every item at once — it scrolls
            horizontally instead of ever wrapping to a second line. */}
        <ul className="scrollbar-hide hidden items-center gap-1 overflow-x-auto md:flex">
          {navItems.map((item) => (
            <li key={item.path} className="shrink-0">
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={navLinkClassName}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <ul
          id="mobile-nav-menu"
          className="flex flex-col gap-1 border-t border-gray-200 px-6 py-3 md:hidden dark:border-gray-800"
        >
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                onClick={() => setIsMenuOpen(false)}
                className={navLinkClassName}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar

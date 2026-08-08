import { useEffect, useRef, useState, type FocusEvent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { homeItem, navGroups, type NavGroup } from '../data/navigation'

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

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

/** Is any leaf in this group the current route (or a sub-route of it)? */
function useIsGroupActive(group: NavGroup) {
  const { pathname } = useLocation()
  return group.items.some(
    (item) => pathname === item.path || pathname.startsWith(`${item.path}/`),
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  )
}

interface NavGroupDropdownProps {
  group: NavGroup
}

/**
 * Desktop nav entry for one instrument group: a button that expands a
 * dropdown panel of that group's pages. Opens on hover or click, and is
 * fully keyboard-operable (Tab into the trigger opens it, Escape or
 * focusing/clicking outside closes it) — mirrors the aria-expanded /
 * aria-controls pattern already used on the mobile hamburger button below.
 */
function NavGroupDropdown({ group }: NavGroupDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isActive = useIsGroupActive(group)
  const panelId = `nav-dropdown-${slugify(group.label)}`

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        containerRef.current
          ?.querySelector<HTMLButtonElement>('button')
          ?.focus()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setIsOpen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={handleBlur}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={[
          linkBaseClasses,
          'inline-flex items-center gap-1',
          isActive ? linkActiveClasses : linkInactiveClasses,
        ].join(' ')}
      >
        {group.label}
        <ChevronIcon open={isOpen} />
      </button>

      <ul
        id={panelId}
        className={`absolute top-full left-0 z-20 mt-1 min-w-48 flex-col gap-0.5 rounded-md border border-gray-200 bg-white p-1.5 shadow-lg dark:border-gray-800 dark:bg-gray-900 ${
          isOpen ? 'flex' : 'hidden'
        }`}
      >
        {group.items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={navLinkClassName}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface MobileNavGroupProps {
  group: NavGroup
  onNavigate: () => void
}

/**
 * Mobile nav entry for one instrument group: an accordion section within
 * the slide-down menu. Same aria-expanded/aria-controls pattern as the
 * desktop dropdown and the hamburger toggle.
 */
function MobileNavGroup({ group, onNavigate }: MobileNavGroupProps) {
  const isActive = useIsGroupActive(group)
  const [isOpen, setIsOpen] = useState(isActive)
  const panelId = `mobile-nav-group-${slugify(group.label)}`

  return (
    <li>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={[
          linkBaseClasses,
          'flex w-full items-center justify-between',
          isActive ? linkActiveClasses : linkInactiveClasses,
        ].join(' ')}
      >
        {group.label}
        <ChevronIcon open={isOpen} />
      </button>

      {isOpen && (
        <ul id={panelId} className="mt-1 flex flex-col gap-1 pl-3">
          {group.items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onNavigate}
                className={navLinkClassName}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
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

        {/* Desktop nav: Home plus one dropdown per instrument group. */}
        <ul className="hidden items-center gap-1 md:flex">
          <li className="shrink-0">
            <NavLink to={homeItem.path} end className={navLinkClassName}>
              {homeItem.label}
            </NavLink>
          </li>
          {navGroups.map((group) => (
            <li key={group.label} className="shrink-0">
              <NavGroupDropdown group={group} />
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

      {/* Mobile menu panel: Home link plus an accordion per instrument group. */}
      {isMenuOpen && (
        <ul
          id="mobile-nav-menu"
          className="flex flex-col gap-1 border-t border-gray-200 px-6 py-3 md:hidden dark:border-gray-800"
        >
          <li>
            <NavLink
              to={homeItem.path}
              end
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClassName}
            >
              {homeItem.label}
            </NavLink>
          </li>
          {navGroups.map((group) => (
            <MobileNavGroup
              key={group.label}
              group={group}
              onNavigate={() => setIsMenuOpen(false)}
            />
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar

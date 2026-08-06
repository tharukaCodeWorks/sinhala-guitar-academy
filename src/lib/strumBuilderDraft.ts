/**
 * localStorage persistence for the Strum Builder tool's in-progress draft
 * (song title/artist plus pasted chord-sheet text), so refreshing the page
 * mid-session doesn't lose work. Single best-effort draft, same
 * fail-soft-on-corrupt-data approach as `fingeringPractice.ts`'s session
 * history — not a saved song library, just a scratch pad.
 */

export interface StrumBuilderDraft {
  title: string
  artist: string
  chordSheetText: string
}

const STORAGE_KEY = 'sga.strumBuilder.draft.v1'

function hasLocalStorage(): boolean {
  return typeof localStorage !== 'undefined'
}

function isStrumBuilderDraft(value: unknown): value is StrumBuilderDraft {
  if (typeof value !== 'object' || value === null) return false
  const draft = value as Record<string, unknown>
  return (
    typeof draft.title === 'string' &&
    typeof draft.artist === 'string' &&
    typeof draft.chordSheetText === 'string'
  )
}

/** Loads the persisted draft, or `undefined` if there isn't one (or it's corrupt/unavailable). */
export function loadDraft(): StrumBuilderDraft | undefined {
  if (!hasLocalStorage()) return undefined
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const parsed: unknown = JSON.parse(raw)
    return isStrumBuilderDraft(parsed) ? parsed : undefined
  } catch {
    return undefined
  }
}

/** Overwrites the persisted draft. Best-effort — silently no-ops if storage is full/unavailable. */
export function saveDraft(draft: StrumBuilderDraft): void {
  if (!hasLocalStorage()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
  } catch {
    // Storage full/unavailable (e.g. private browsing) — the draft is
    // best-effort, so silently drop the write rather than crash the tool.
  }
}

/** Clears the persisted draft. */
export function clearDraft(): void {
  if (!hasLocalStorage()) return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // best-effort, see saveDraft
  }
}

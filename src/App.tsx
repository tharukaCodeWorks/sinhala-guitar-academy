import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ChordLibraryPage from './pages/ChordLibraryPage'
import ChordFamiliesPage from './pages/ChordFamiliesPage'
import CapoToolPage from './pages/CapoToolPage'
import FingeringPracticePage from './pages/FingeringPracticePage'
import StrummingPracticePage from './pages/StrummingPracticePage'
import StrumBuilderPage from './pages/StrumBuilderPage'
import SongsPage from './pages/SongsPage'
import SongDetailPage from './pages/SongDetailPage'
import GuitarLessonsOverviewPage from './pages/GuitarLessonsOverviewPage'
import GuitarLessonDetailPage from './pages/GuitarLessonDetailPage'
import TabDisplayDemoPage from './pages/TabDisplayDemoPage'
import StrummingPlayerDemoPage from './pages/StrummingPlayerDemoPage'
import KeyboardHomePage from './pages/KeyboardHomePage'
import LessonsOverviewPage from './pages/LessonsOverviewPage'
import LessonDetailPage from './pages/LessonDetailPage'
import KeyboardChordLibraryPage from './pages/KeyboardChordLibraryPage'
import KeyboardChordFamiliesPage from './pages/KeyboardChordFamiliesPage'
import KeyboardScaleExplorerPage from './pages/KeyboardScaleExplorerPage'
import KeyboardTechniquePage from './pages/KeyboardTechniquePage'
import KeyboardSongsPage from './pages/KeyboardSongsPage'
import KeyboardSongDetailPage from './pages/KeyboardSongDetailPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="chords" element={<ChordLibraryPage />} />
        <Route path="chord-families" element={<ChordFamiliesPage />} />
        <Route path="capo-tool" element={<CapoToolPage />} />
        <Route path="fingering-practice" element={<FingeringPracticePage />} />
        <Route path="strumming-practice" element={<StrummingPracticePage />} />
        <Route path="strum-builder" element={<StrumBuilderPage />} />
        <Route path="songs" element={<SongsPage />} />
        <Route path="songs/:songId" element={<SongDetailPage />} />
        <Route path="lessons" element={<GuitarLessonsOverviewPage />} />
        <Route path="lessons/:lessonId" element={<GuitarLessonDetailPage />} />
        <Route path="demo/tabs" element={<TabDisplayDemoPage />} />
        <Route path="demo/strumming" element={<StrummingPlayerDemoPage />} />
        <Route path="keyboard" element={<KeyboardHomePage />} />
        <Route path="keyboard/lessons" element={<LessonsOverviewPage />} />
        <Route
          path="keyboard/lessons/:lessonId"
          element={<LessonDetailPage />}
        />
        <Route path="keyboard/chords" element={<KeyboardChordLibraryPage />} />
        <Route
          path="keyboard/chord-families"
          element={<KeyboardChordFamiliesPage />}
        />
        <Route path="keyboard/scales" element={<KeyboardScaleExplorerPage />} />
        <Route path="keyboard/technique" element={<KeyboardTechniquePage />} />
        <Route path="keyboard/songs" element={<KeyboardSongsPage />} />
        <Route
          path="keyboard/songs/:songId"
          element={<KeyboardSongDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ChordLibraryPage from './pages/ChordLibraryPage'
import ChordFamiliesPage from './pages/ChordFamiliesPage'
import CapoToolPage from './pages/CapoToolPage'
import FingeringPracticePage from './pages/FingeringPracticePage'
import StrummingPracticePage from './pages/StrummingPracticePage'
import SongsPage from './pages/SongsPage'
import TabDisplayDemoPage from './pages/TabDisplayDemoPage'
import StrummingPlayerDemoPage from './pages/StrummingPlayerDemoPage'
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
        <Route path="songs" element={<SongsPage />} />
        <Route path="demo/tabs" element={<TabDisplayDemoPage />} />
        <Route path="demo/strumming" element={<StrummingPlayerDemoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

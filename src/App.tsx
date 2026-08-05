import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TabDisplayDemoPage from './pages/TabDisplayDemoPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="demo/tabs" element={<TabDisplayDemoPage />} />
      </Route>
    </Routes>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/AuthContext'  // Import your AuthProvider
import LoginRegister from './pages/LoginRegister'
import Notes from './pages/Notes'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
  const selectedTheme = localStorage.getItem('theme')

  if (selectedTheme) {
    document.body.className = selectedTheme
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='app'>
          <div className='max-w-screen-sm mx-auto py-9'>
            <Routes>
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/register" element={<LoginRegister />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Notes />} />
              </Route>
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
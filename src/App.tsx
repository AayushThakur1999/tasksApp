import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import Notes from './pages/Notes'

const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginRegister />,
  },
  {
    path: '/',
    element: <Notes />,
  }
])

function App() {

  const selectedTheme = localStorage.getItem('theme')

  if (selectedTheme) {
    document.body.className = selectedTheme
  }

  return (
    <div className='app'>
      <div className='max-w-screen-sm mx-auto py-9'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App

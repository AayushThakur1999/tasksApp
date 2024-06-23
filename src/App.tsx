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

  return (
    <RouterProvider router={router} />
  )
}

export default App

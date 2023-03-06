import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
]);

function App() {
  return (
    <div className="content">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

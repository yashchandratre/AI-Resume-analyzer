import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard/Dashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AnalysisResult from './Pages/AnalysisResult/AnalysisResult'
import Layout from './Layout/Layout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route
          path="/analysis/:resumeId"
          element={<ProtectedRoute>
            <Layout>
              <AnalysisResult />
            </Layout>
          </ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

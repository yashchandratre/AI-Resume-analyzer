import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard/Dashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AnalysisResult from './Pages/AnalysisResult/AnalysisResult'
import Layout from './Layout/Layout'
import { Toaster } from 'sonner'
import Resume from './Pages/Resume/Resume'
import AnalysisHistory from './Pages/AnalysisHistory/AnalysisHistory'

function App() {

  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>} />
          <Route
            path="/analysis/:resumeId"
            element={<ProtectedRoute>
              <Layout>
                <AnalysisResult />
              </Layout>
            </ProtectedRoute>}
          />
          <Route
            path="/myresumes/"
            element={<ProtectedRoute>
              <Layout>
                <Resume />
              </Layout>
            </ProtectedRoute>}
          />
          <Route
            path="/analysis-history"
            element={
              <ProtectedRoute>
                <Layout>
                  <AnalysisHistory />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import PredictPage from './pages/PredictPage'
import ExplainabilityPage from './pages/ExplainabilityPage'
import OptimizationPage from './pages/OptimizationPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { PredictionProvider } from './context/PredictionContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <PredictionProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/predict" element={<PredictPage />} />
              <Route path="/explainability" element={<ExplainabilityPage />} />
              <Route path="/optimization" element={<OptimizationPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
        </Router>
      </PredictionProvider>
    </ThemeProvider>
  )
}

export default App

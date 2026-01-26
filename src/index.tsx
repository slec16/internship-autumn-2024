import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import ErrorBoundary from '@app/providers/error-boundary
// import '@app/styles/index.css'
// import App from '@app/App'
import App from './app/App'
import './app/styles/global.scss'
import { ThemeProvider } from '@/app/providers/theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    {/* <ErrorBoundary> */}
    <ThemeProvider defaultTheme='dark'>
      <App />
    </ThemeProvider>
    {/* </ErrorBoundary> */}
    </BrowserRouter>
  </StrictMode>,
)

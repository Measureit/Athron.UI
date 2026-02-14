import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { APP_CONFIG } from './config/app.config'

const appName = APP_CONFIG.APP_NAME
const metaDesc = document.querySelector('meta[name="description"]')
if (metaDesc) {
  metaDesc.setAttribute(
    'content',
    `${appName} - Baza wiedzy o wychowaniu dzieci w sporcie, treningi, porady dla młodych sportowców.`,
  )
}
document.title = `${appName} - Wychowanie w Sporcie`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

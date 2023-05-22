import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { SnackbarProvider } from 'notistack'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      preventDuplicate
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ImageContext from './contexts/ImageContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <ImageContext>
     <App /> 
    </ImageContext>
  </React.StrictMode>,
)

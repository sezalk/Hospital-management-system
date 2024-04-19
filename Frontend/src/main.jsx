import React, { createContext,useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
export const Context= createContext({isAutheticated:false})

const AppWrapper = ()=>{
  const [isAutheticated,setIsAutheticated] = useState(false);
  const [user,setUser] = useState({})

  return(
    <Context.Provider value={{isAutheticated,setIsAutheticated,user,setUser}}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)

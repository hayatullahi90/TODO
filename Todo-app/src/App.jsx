import { useState } from 'react'
import './App.css';
import Todo from './Todo';

function App() {
const [dark, setDark] = useState(false)
  return (
      <div>
        <div className="h-screen w-full  relative">
          <div className='z-100'>

          <Todo setDark={setDark} dark={dark} />
          </div>
          <div className='absolute inset-0 -z-10'>

          <div className={`h-[35%] ${dark ? "bg-[url('/bg-desktop-dark.jpg')]" : "bg-[url('/bg-desktop-light.jpg')]" }  bg-cover bg-center `}/>
          <div className={` ${dark ? 'bg-gray-900' :'bg-white'} h-[65%]   `} />
          </div>
        </div>
      </div>
  )
}

export default App

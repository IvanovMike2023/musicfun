import {useState} from 'react'
import s from "./App.module.css";
import {Routing} from "@/common/routing";
import {Header} from "@/common/components/Header";

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
        <Header/>
        <div className={s.layout}>
            <Routing />
        </div>
    </>
  )
}

export default App

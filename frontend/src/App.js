import { useState ,useEffect } from "react"
function App() {

  const [backend , setabackend] = useState([{}]) ;
      useEffect
      (() =>{
        fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          setabackend(data)
          console.log(data)
        })
      } , [] ) ;

  return (
    <div>
      { backend.length !== 0 ? backend.map((task , index) => (
        <div key={index} >
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.is_completed ? "completed" : "uncompleted"}</p>
        </div>
      )) : <h1>Loading...</h1> }
    </div>
  )
}

export default App

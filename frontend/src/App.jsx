import { useState, useEffect } from "react"

function App() {
  useEffect(
    () => {
        fetch("/api/hello")
        .then(resp => resp.json())
        .then(data => setMessage(data.msg))
        .catch(err => console.log(err))
    },
    []
  );
  const [message, setMessage] = useState('');
  const [ct, setCt] = useState(0);


  return (
    <div className="app">
        <h1>{message}</h1>
        <button onClick={() => setCt(Math.floor(Math.random() * 1000000000))}>
          {ct}
        </button>
    </div>
  )
}

export default App

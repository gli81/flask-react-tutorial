import { useState, useEffect } from 'react'

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

  return (
    <div className='app'>
        <h1>{message}</h1>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cityname, setcityname] = useState("");
  const [inputtext, setinputtext] = useState("")
  const [data, setdata] = useState({})
  const [error, seterror] = useState(null)

  useEffect(() => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=8bfa3bf73bffa7a31e3a6b5d507306f3`)
      .then((res) => {
        if (!res.status === 200) {
          throw Error('something wrong')
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setdata(data)
      }).catch((err) => seterror(err.message))
  }, [cityname, error])

  const handlesearch = (event) => {
    if (event.key === 'Enter') {
      setcityname(event.target.value);
      setinputtext('')
    }

  }
  return (
    <div className="App">
      <div className='search'>
        <input type='text' value={inputtext} onChange={(event) => setinputtext(event.target.value)} onKeyDown={handlesearch}
          placeholder='Enter location'></input>
      </div>
      <div className='container'>
        <div className='error'>
          <p>{data.message}</p>
        </div>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p>{data.main.humidity}%</p> : null}
            <p>humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p>{data.wind.speed}MPH</p> : null}
            <p>Wind speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

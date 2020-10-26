import React, { useEffect, useState } from 'react';
import axios from 'axios';
import asteroid from './asteroid.png'
import fire from './config/fire' ;
import './App.css';
// import bgImage from './asteroid.jpg'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const API_KEY = 'Q6Qo8BlhbsRxnL4pG0cwTRZ91mtfK5iiHBKo8vLi'
  const [asteroids, setAsteroids] = useState([]);
  const [asteroidsRange, setAsteroidsRange] = useState([])
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [asteroidID, setasteroidID] = useState('')
  const [listofAster, setlistofAster] = useState([])
  
  let tempp
  // let mappedData = []
  //https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=Q6Qo8BlhbsRxnL4pG0cwTRZ91mtfK5iiHBKo8vLi
  //`https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=${API_KEY}`

  useEffect(() => {
      
  }, [asteroids, asteroidsRange, listofAster])


  function handleOnChange(e) {

      if(e.target.id === 'start'){
          setStartDate(e.target.value)
          console.log(startDate)
      }
      else if(e.target.id === 'end'){
          setEndDate(e.target.value)
      }
      else{
          setasteroidID(e.target.value)
      }
  }

  function mapDataToAsteroids(data){
    const mapped = [];
    data.forEach(element => {
        mapped.push({ 
            id: element.id,
            name: element.name,
            magnitude: element.absolute_magnitude_h
        })
    });
    return mapped
  }
  function mapDataToAsteroidsRange(data){
      // data = JSON.parse(data);
      console.log(data)
      const mappedRange = [];
      for( var key in data){
        console.log(typeof(key))
          data[key].forEach(asterRange => {
             mappedRange.push({
               date: key,
               id: asterRange.id,
               name: asterRange.name,
               magnitude: asterRange.absolute_magnitude_h
           })
        })
      }
    return mappedRange
  }

  function mapDataToAsteroidsID(data){
    const mappedRange = []

    mappedRange.push({
      id: data.id,
      name: data.name,
      magnitude: data.absolute_magnitude_h
    })
    console.log(mappedRange)

    return mappedRange;

  }
  const apiURL = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=${API_KEY}`;
  const apiURLRange1 = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&detailed=true&api_key=${API_KEY}`;
  const apiURLRange2 = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${API_KEY}`;

  const fetchData = async () => {
        const response = await axios.get(apiURL)
        await setAsteroids(mapDataToAsteroids(response.data.near_earth_objects))
        console.log(asteroids[0])
  }

  const fetchDataRange = async (e) => {
        e.preventDefault()
        let response = {}
        if(endDate === ''){
            response = await axios.get(apiURLRange1)  
        }
        else{
            response = await axios.get(apiURLRange2)
        }
        // console.log(response.data.near_earth_objects)
        // console.log(typeof(response.data.near_earth_objects));
        await setAsteroidsRange(mapDataToAsteroidsRange(response.data.near_earth_objects))
        console.log(asteroidsRange[0])
    }

    const apiURLsearchID= `https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=${API_KEY}`
    // const apiURLsearchID = 'https://api.nasa.gov/neo/rest/v1/neo/2021277?api_key=Q6Qo8BlhbsRxnL4pG0cwTRZ91mtfK5iiHBKo8vLi'

    const fetchDataID = async (e) => {
        e.preventDefault()
        let response = {}
        response = await axios.get(apiURLsearchID)

        await setlistofAster(mapDataToAsteroidsID(response.data))
        // tempp = await  mapDataToAsteroidsID(response.data)
        // console.log(tempp[0].name)
        console.log(listofAster[0])

    }


  return (
    <div className="App" style={{ backgroundImage:`url(${asteroid})` }}>
        {/* <img className = 'bg' style={{height:'100%', width:'100%', position: 'absolute'}} src={ bgImage }/> */}
        <div className="container list-of-asteroids">
          <div className="row justify-content offset-4">
              {/* <div className="offset-4"></div> */}
              <h3 style={{ color: 'white' }}>Welcome to explore Asteroids</h3>
          </div>
          <div className="row mt-3 mb-5">
            <button className="offset-5 btn btn-info" onClick={fetchData}>
              Fetch Data - List of Asteroids
            </button>
          </div>
          <div className="row">
              <hr/>
                {asteroids &&
                  asteroids.map(aster => {
                    return (
                      <div className="col-md-4">
                          <div className="card mb-5" style={{width: '18rem'}}>
                            <div className ="card-header">
                              Featured
                            </div>
                            <ul className ="list-group list-group-flush">
                              <li className ="list-group-item">Asteroid ID : {aster.id}</li>
                              <li className ="list-group-item">Asteroid Name : {aster.name}</li>
                              <li className ="list-group-item">Asteroid magnitude : {aster.magnitude}</li>
                            </ul>
                            <hr/>
                          </div>
                      </div>
                    );
                  })}
          </div>
        </div>
        <div className="container list-using-range">
              <div className="row mt-5 justify-content-center offset-1">
              <h2 style={{ color: 'white' }} className = 'note mb-5'>Find Asteroids within Date Range(Max Range:7 days)</h2>
                  
                  <form onSubmit={fetchDataRange}>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="form-group">        
                              <label style={{ color: 'white' }} className = 'range' for="start"> Start date:</label>
                              <hr/>
                              <input type="date" id="start" name="range-start" value = {startDate} onChange = {handleOnChange}></input>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group">        
                              <label style={{ color: 'white' }} className = 'range' for="end"> End date:</label>
                              <hr/>
                              <input type="date" id="end" value = {endDate} name="range-end" onChange = {handleOnChange}></input>
                        </div>
                      </div>
                      <div className="col-md-2">
                              <button type="submit" class="btn btn-info">Submit</button>
                      </div>
                    </div>
                  </form>
              </div>
              <div className="row mt-2 centre">
              
                <hr/>
                {asteroidsRange &&
                  asteroidsRange.map(aster => {
                    return (
                      <div className="col-md-2 centre ">
                          <div className="card mb-2" style={{width: '18rem',leftmargin: '20px'}}>
                            <div style={{ marginLeft: '5px' }} className ="card-header">
                              {aster.date}
                            </div>
                            <ul className ="col-md-2 centre">
                              <li className ="list-group-item">Asteroid ID : {aster.id}</li>
                              <li className ="list-group-item">Asteroid Name : {aster.name}</li>
                              <li className ="list-group-item">Asteroid magnitude : {aster.magnitude}</li>
                            </ul>
                            <hr/>
                          </div>
                      </div>
                    );
                  })}
            </div>
              
        </div>
        <div className="container list-using-id offset-1">
              <div className="row justify-content-center">
                  <div className="col-md-5">
                    <form onSubmit = {fetchDataID}>
                        <div className="form-group">        
                            <label className = 'listID' for="ID"> <h2 style={{ color: 'white' }}>Search by ID </h2></label>
                            <hr/>
                            <input type="text" id="asteroidID" name="asteroidID" value = {asteroidID} onChange = {handleOnChange}></input>
                            <button type="submit" class="btn btn-info">Find</button>
                      </div>
                    </form>
                  </div>
              </div> 

              <div className="row mt-5 justify-content-center offset-1">
                  
                <hr />
                
                 {listofAster &&
                  listofAster.map(aster => {
                    return (
                      <div className="col-md-4 ">
                          <div className="card mb-2 " style={{width: '15rem'}}>
                            <div className ="card-header">
                              {aster.date}
                            </div>
                            <ul className ="list-group list-group-flush " >
                              <li className ="list-group-item">Asteroid ID : {aster.id}</li>
                              <li className ="list-group-item">Asteroid Name : {aster.name}</li>
                              <li className ="list-group-item">Asteroid magnitude : {aster.magnitude}</li>
                            </ul>
                            <hr/>
                          </div>
                      </div>
                    );
                 })}
            </div>     
        </div>
    </div>
  );
}

export default App;

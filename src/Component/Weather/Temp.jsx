import React ,{useState, useEffect}from 'react';
import Weathercard from './weathercard';
import "./style.css"


const Temp = () => {
    const [searchValue, setSearchValue ] = useState("Tundla");
    const [tempInfo, setTempInfo ] = useState({});
 
    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=d9f82f71350a185cb8914ad105d2d21d`;
            
            let res = await fetch(url);
            let data = await res.json();

            const {temp, pressure, humidity} = data.main;
            const {main: weathermood } = data.weather[0];
            
            const  { name } = data;
            const { speed } = data.wind;
            const {country, sunset, sunrise } = data.sys;

            const myWeatherInfo = {
                temp, 
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
                sunrise,
            };
            setTempInfo(myWeatherInfo);


            
        } catch (error) {
            console.log(error)
        }
     };


     useEffect(() => {
       getWeatherInfo();
     }, []);


  return (
    <>
        <div className="wrap">
            <div className="search">
                <input
                 type="search"
                 placeholder='search city'
                 
                 autoFocus 
                 id='search' 
                 className='searchTerm'
                 
                 value=  {searchValue}
                 onChange = { (e) => setSearchValue(e.target.value)} />
                <button
                 className='searchButton' 
                 type='button'
                 onClick= {getWeatherInfo} >
                    
                    Search</button>
            </div>
        </div>

 {/* OUR Temperature Card  */} 
        <Weathercard tempInfo={tempInfo} />


    </>
  );
}

export default Temp;

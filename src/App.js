import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import './App.css';

function App() {

 
  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const feedback="Found";
  const getWetherDetails = (cityName) => {
    if (!cityName) {
    
      alert("Please Enter a Place!");
      setData("Not Found");
      return;
    }
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
   
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
     
      alert("Please Enter a Valid Place Name!");
      console.log("Please Enter Valid City", err)
      setData("Not Found");
    })
    
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = (e) => {
      // e.preventDefault();
      getWetherDetails(inputCity);

  }
  const handleKeypress = e => {
      //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        handleSearch()
      }
  };
  
  return (
    <div className="col-md-12">
      <div className="wetherBg bg-img" 
      >
        <h1 className="heading">Weather App</h1>
        
        
        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control"
            value={inputCity} placeholder="Please Enter Place!"
            onChange={handleChangeInput} onKeyPress={handleKeypress} />
          <button className="btn btn-primary" 
           
            onClick={handleSearch}   
            type="submit"
          >Search</button>
          
        </div>
      </div>
     

      {
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded wetherResultBox">
            <img className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />
            { Object.keys(data).length===0  &&  
              <h5 className="weathorCity">
                Not Found
              </h5>
            }


            {  Object.keys(data).length>0 && <div>
              <h5 className="weathorCity">
                {data?.name}
              </h5>
              <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
            </div>}
          </div>
        </div>
      }
   
      

    </div>
  );
}

export default App;
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './Weather.css'
// import Display from '../Display';

  
class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            long: null,
            lat: null,
            api:"09e5c52ec07e9419af52dd31544416e9",
            currentTemperature: null,
            tempFa: null,
            tempCe: null,
            weatherCond: null,
            icon: null,
            Temperature: true,
        }
    } 
    componentDidMount() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    long:(position.coords.longitude),
                    lat:(position.coords.latitude)
                })
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&appid=${this.state.api}`)
                .then(value=>value.json())
                .then(json=>{
                    console.log(json);
                    getInfo(json);
                })
            })
        }
        let getInfo = (json) =>{
            let myTemp = json.main.temp;
            let tempVa = (myTemp-273.15)*9/5 + 32;
            tempVa = Math.round(tempVa);
            
            let tempC = (tempVa - 32) * (5/9);
            tempC = Math.round(tempC);
            
            let currentTemp = json.main.temp;
            currentTemp = Math.round(currentTemp);
            this.setState({
                currentTemperature: currentTemp,
                tempFa: tempVa,
                tempCe: tempC,
                weatherCond: json.weather[0].main
            })
            console.log(this.state.currentTemperature)
            // let currentTemperature = json.main.temp;
            // let tempFa = (currentTemperature-273.15)*9/5 + 32; // degrees Farenheit
            // tempFa = Math.round(tempFa);
            
            // let tempCe = (tempFa - 32) *(5/9); // degrees celcius
            // tempCe = Math.round(tempCe);
            
            // let weatherCond = json.weather[0].main;
            // console.log(weatherCond);
        }
    }
    currentTemperature = (e) => {
        return this.state.Temperature ? 
            <h1>
                {this.state.tempFa}&deg;F
            </h1>   
             : 
            <h1>
                {this.state.tempCe}&deg;C
            </h1>
            ;
    };
    Toggle = () => {
        this.setState({Temperature: !this.state.Temperature})
    }

    render() {
        return (
            <div>
             <Card className="weather">
                <CardContent>
                    <h1>Weather Condition:
                        <p>{this.state.weatherCond}</p>
                    </h1>
                <div>
                    {this.currentTemperature()}
                    <Button variant="outlined" color="primary" onClick={this.Toggle}>
                        Temperature toggle
                    </Button>
                </div>
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default Weather;
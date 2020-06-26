import React from 'react';
import './Weather.css';
//Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            long: null,
            lat: null,
            key: "09e5c52ec07e9419af52dd31544416e9",
            currentTemperature: null,
            tempFa: null,
            tempCe: null,
            weatherCond: null,
            icon: null,
            Temperature: true,
        }
    }
    componentDidMount = (props) => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    long:(position.coords.longitude),
                    lat:(position.coords.latitude)
                })
                console.log(this.state.long, this.state.lat);
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&appid=${this.state.key}`)
                    .then(value => {
                        return value.json();
                    })
                    .then(json => {
                        console.log(json);
                        getInfo(json);
                    })
                    .catch(console.log);
            })
        }
        let getInfo = (json) => {
            let myTemp = json.main.temp;
            let tempVa = (myTemp - 273.15) * 9/5 + 32;
            tempVa = Math.round(tempVa);
            let tempC = (tempVa - 32) * (5/9);
            tempC = Math.round(tempC);
            let currentTemp = json.main.temp;
            currentTemp = Math.round(currentTemp)
            let icons = "http://openweathermap.org/img/wn/"; //10d@2x.png";
            let getCurrentIcon = json.weather[0].icon;
            let finalUrl = `${icons}${getCurrentIcon}@2x.png`;

            this.setState({
                currentTemperature: currentTemp,
                tempFa: tempVa,
                tempCe: tempC,
                weatherCond: json.weather[0].main,
                icon: finalUrl
            })
            // console.log(this.state.currentTemperature, this.state.tempFa, this.state.tempCe, this.state.weatherCond);
        }
    }
    //The display for toggled Temperatures
    currentTemperature = (e) => {
        return this.state.Temperature ?
            <h1>Temperature:
                <p>{this.state.tempFa}&deg;F</p>
            </h1>
             :
            <h1>Temperature:
                <p>{this.state.tempCe}&deg;C</p>
            </h1>
            ;
    };
    //Toggles temperatures
    Toggle = () => {
        this.setState({Temperature: !this.state.Temperature})
    }

    render() {
        return (
            <div>
                <Card className='weather'>
                    <CardContent>
                        <h1>Weather Condition:
                            <p>{this.state.weatherCond}</p>
                            <img src = {this.state.icon} alt = "icons"/>
                        </h1>
                        <div>
                            {this.currentTemperature()}
                            <Button variant='outlined' color='primary' onClick={this.Toggle}>
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
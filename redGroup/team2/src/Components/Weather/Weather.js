import React from "react";
import "./Weather.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyle = makeStyles({
    root:{
        minWidth:275
    },
    show:{
        display:"flex",
        justifyContent:"center"
    }
    
})
class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            long:null,
            lat:null,
            api:"09e5c52ec07e9419af52dd31544416e9",
            currentTemperature:null,
            tempFa:null,
            tempCe:null,
            weatherCond:null,
            icon:null,
            Temperature:true
        }
    }

    componentDidMount(){

        if(navigator.geolocation){
            //console.log(navigator.geolocation);
            navigator.geolocation.getCurrentPosition((position)=>{
                this.setState({
                    long:(position.coords.longitude),
                    lat:(position.coords.latitude)
                })
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&appid=${this.state.api}`
                    )
                    .then(value=>{
                        return value.json();
                    })
                    .then(json=>{
                        getInfo(json);
                    })
                    .catch(console.log);
            })
        }
        let getInfo = (json)=>{
            let myTemp = json.main.temp;
            let tempVa = (myTemp-273.15)*9/5 + 32;
            tempVa = Math.round(tempVa);
            let tempC = (tempVa - 32) * (5/9);
            tempC = Math.round(tempC);
            let currentTemp = json.main.temp;
            currentTemp = Math.round(currentTemp);
            let icons = "http://openweathermap.org/img/wn/"; //10d@2x.png";
            let getCurrentIcon = json.weather[0].icon;
            let finalUrl = `${icons}${getCurrentIcon}@2x.png`;
            this.setState({
                currentTemperature:currentTemp,
                tempFa:tempVa,
                tempCe:tempC,
                weatherCond:json.weather[0].main,
                icon:finalUrl
            })
            // let currentTemperature = json.main.temp;
            // let tempFa = (currentTemperature-273.15)*9/5 + 32; //F
            // tempFa = Math.round(tempFa);
            //temp in celcius
            // let tempCe = (tempFa-32) *(5/9);
            // let weatherCond = json.weather[0].main;
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
    render(){
        return(
            <div>
                <Card className = "weather">
                    <CardContent>

                        <h1>
                            {this.state.weatherCond}
                        </h1>
                        <img src = {this.state.icon} alt = "icons"/>
                        <div>
                            {this.currentTemperature()}
                            <Button variant = "outlined" onClick={this.Toggle}>
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
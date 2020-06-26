import React from "react";
import "./Nasa.css";
class Nasa extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            long:null,
            lat:null,
            key:"FIfAffLUWJhboK8VEwDpW0vjUVZVrRj0WWrf2dbZ",
            img:''
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
                const thirdParty = "https://cors-anywhere.herokuapp.com/";
                //https://cors-anywhere.herokuapp.com/
                //`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&appid=${this.state.api}`
                fetch(`${thirdParty}https://api.nasa.gov/planetary/earth/assets?lon=${this.state.long}&lat=${this.state.lat}&dim=0.10&api_key=${this.state.key}`)
                .then(value=>{
                    // this.setState({
                    //     img:value.url
                    // })
                    return value.json();
                })
                .then(json=>{
                    this.setState({
                        img:json.url
                    })
                });
                
            })
        }
    }
    render(){
        return(
            <div>
                <h1>Nasa Picture</h1>
                <img src = {this.state.img} style = {{height:"495px",width:"350px"}}alt = "myPic"/>
            </div>
        )
    }
}
export default Nasa;

import React from 'react';
import './Nasa.css';

class Nasa extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            long: null,
            lat: null,
            key: "FIfAffLUWJhboK8VEwDpW0vjUVZVrRj0WWrf2dbZ",
            img: ''
        }
    }
    componentDidMount() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    long:(position.coords.longitude),
                    lat:(position.coords.latitude)
                })
                fetch(`https://api.nasa.gov/planetary/earth/imagery?lon=${this.state.long}&lat=${this.state.lat}&dim=0.10&api_key=${this.state.key}`)
                .then(json=> {
                    console.log(json);
                    this.setState({
                        img: json.url
                    })
                    console.log(this.state.img);
                })
            })
        }
    }

    render(){
        return(
            <div>
                <h1>Satellite image matching your location:</h1>
                <img className="img" src={this.state.img} alt="current location" height="400" width="500" />
            </div>      
        )   
    }   
}

export default Nasa;
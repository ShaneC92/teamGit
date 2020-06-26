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

    componentDidMount = (props) => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    long:(position.coords.longitude),
                    lat:(position.coords.latitude)
                })
                fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${this.state.long}&lat=${this.state.lat}&dim=0.10&api_key=${this.state.key}`)
                .then(value => {
                    return value.json()
                })
                .then(json => {
                    console.log(json);
                    this.setState({
                        img: json.url
                    })
                    console.log(this.state.img);
                })
            })
        }
    }

    render() {
        return (
            <div className='nasaBox'>
                <h3>Satelite Image for Current Location</h3>
                <img src={this.state.img} alt="Geolocation" height="495px" width="450px" />
            </div>
        )
    }
}

export default Nasa;
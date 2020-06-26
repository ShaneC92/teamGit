import React from "react";
import './Restaurant.css';

class Restaurant extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            long:null,
            lat:null,
            key:"39c1d21ebf8795be55f050ab1fc9a41b ",
            listOfRestaurent: []
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
                fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${this.state.lat}&lon=${this.state.long}&apikey=${this.state.key}`)
                .then((value)=>{
                    return value.json();
                })
                .then(json=>{
                    console.log(json.nearby_restaurants);
                    nearByRestaurants(json.nearby_restaurants);
                });
            })
            let nearByRestaurants = (jsonData)=>{
                //console.log(jsonData.length);
                let condition = 0;
                while(condition < jsonData.length){
                    const myList = this.state.listOfRestaurent.slice();
                    console.log(jsonData[condition].restaurant.name);
                    myList[condition] = jsonData[condition].restaurant.name;
                    this.setState({
                        listOfRestaurent:myList
                })
                condition++;
                }
                //console.log(jsonData[0].restaurant.name);
                let myLength = (this.state.listOfRestaurent.length);
                let ul = document.getElementsByTagName("ul")[0];
                for(let i = 0; i < myLength;i++){
                    let child = document.createElement("li");
                    child.textContent = this.state.listOfRestaurent[i];
                    ul.appendChild(child);
                }
            }
        }
    }
    render(){
        return(
            <div>
                <h1>List of nearby restaurants:</h1>
                <ul>
                {/* {this.state.listOfRestaurent} */}
                </ul>
            </div>
        )
    }
}
export default Restaurant;
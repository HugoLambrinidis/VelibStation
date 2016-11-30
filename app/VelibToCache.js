import React, {Component} from 'react'
import {
    Navigator,
    AsyncStorage
} from 'react-native'

export default class VelibToCache extends Component{

    constructor(props) {
        super(props)
        if (props.coords != undefined) {
            this.state = {
                pos: {
                    lat: props.coords.latitude,
                    lng: props.coords.longitude
                }
            }
        }
        this.apiKey = "7a01e84da0e59b6f73961062a3cf3bf68fd598273c57bc93ca8950b3"
        this.url = "https://opendata.paris.fr/api/records/1.0/search/?"
        this.dataset = "stations-velib-disponibilites-en-temps-reel"
    }

    getVelibListAround() {
        that = this
        url = this.url + "dataset=" + this.dataset + "&apiKey="
            + this.apiKey + "&geofilter.distance=" + this.state.pos.lat
            + "," + this.state.pos.lng + ",1000"
         return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            return response.json()
         }).catch((error) => {
                console.log(error)
            })


    }

    async sendVelibListToCache()
    {
        try {
            await this.getVelibListAround().then((response) => AsyncStorage.setItem('VelibList', JSON.stringify(response)));
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    }
}
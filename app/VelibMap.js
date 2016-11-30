/**
 * Created by hugoLambrinidis on 29/11/16.
 */
import React, {Component} from 'react'

import {
    AppRegistry,
    View,
    AsyncStorage,
    StyleSheet
} from 'react-native'

import MapView from 'react-native-maps'

export default class VelibMap extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.state.markers = []
        this.state.props = props
        this.state.styles = props.style
    }

    getAllVelibStation()
    {
        return fetch('https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=c4aa950b3715b559064138cf4b901f2aa10b9816', {
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

    async getMarkers() {
        try {
            await this.getAllVelibStation().then((data) => {
                let markers = []
                data.map(marker => {
                    markers.push({
                        coordinates: {
                            latitude: marker.position.lat,
                            longitude: marker.position.lng
                        },
                        image: require('./assets/img/bicycle.png'),
                        name: marker.name,
                        stands: marker.bike_stands,
                        bikes: marker.available_bikes
                    })
                })
                this.setState({markers})
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getMarkers()
    }

    render() {
        styles = {
            height: this.state.styles.height._value
        }
        return (
        <View style={StyleSheet.flatten([styles, Styles.map])}>
            <MapView
                region={this.state.region}
                loadingEnabled={true}
                showsUserLocation={true}
                followsUserLocation={true}
                showsPointsOfInterest={false}
                style={Styles.map}
            >
                {this.state.markers.map((marker, key) => (
                    <MapView.Marker
                        key={key}
                        coordinate={marker.coordinates}
                        image={marker.image}
                        description={marker.name + " " +marker.bikes + "/" + marker.stands}
                    />
                ))}
            </MapView>
        </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})
/**
 * Created by hugoLambrinidis on 28/11/16.
 */
import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Animated
} from 'react-native'

import VelibMap from './VelibMap'
import VelibList from './VelibList'
import VelibLocation from './VelibLocation'
import FavoriteVelibStationList from './FavoriteVelibStationList'

export default class MainComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            styles: {
                map: {
                    height: new Animated.Value(200)
                },
                list: {
                    top: new Animated.Value(220)
                }
            },
            favorite: []
        }
        this.location = new VelibLocation()
    }

    resizeMap() {
        console.log("ici")
        if (this.state.styles.map <= 300) {
            Animated.timing(
                this.state.styles.map.height,
                {toValue: 200}
            ).start()
            Animated.timing(
                this.state.styles.list.top,
                {toValue: 220}
            ).start()
        } else {
            Animated.timing(
                this.state.styles.map.height,
                {toValue: 400}
            ).start()
            Animated.timing(
                this.state.styles.list.top,
                {toValue: 420}
            ).start()
        }

    }

    render() {

        return (
            <View style={Styles.view}>
                <Animated.View style={this.state.styles.map}>
                    <VelibMap location={this.location}
                              style={this.state.styles.map}
                    />
                </Animated.View>
                <TouchableOpacity onPress={this.resizeMap()}>
                    <Text>Agrandir</Text>
                </TouchableOpacity>
                <Animated.View style={StyleSheet.flatten([Styles.list, this.state.styles.list])}>
                    <VelibList/>
                </Animated.View>
            </View>
        );
    }
}




const Styles = StyleSheet.create({
    list: {
        position: 'absolute'
    },
    view: {
        flex: 1,
        flexDirection: 'column'
    }
});
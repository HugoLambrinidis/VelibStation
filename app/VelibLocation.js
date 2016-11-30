/**
 * Created by hugoLambrinidis on 29/11/16.
 */
import React, { Component } from 'react'
import {
    Navigator,
    AsyncStorage
} from 'react-native'

import VelibToCache from './VelibToCache'

export default class VelibLocation extends Component{

    constructor(props) {
        super(props)
        this.state = {}
        this.setPosition()
    }

    setPosition() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.state = {position: position}
            },
            (error) => alert(error.message)
        ), navigator.geolocation.watchPosition((position) => {
            this.state = {position: position}
            list = new VelibToCache(position)
            list.sendVelibListToCache()
        })
    }

    getPostion() {
        this.setPosition()
        return this.state.position
    }
}
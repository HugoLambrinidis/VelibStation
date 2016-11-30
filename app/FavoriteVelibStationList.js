import React, { Component } from 'react';

import {
    View,
    ListView,
    Text
} from 'react-native'

export default class FavoriteVelibStationList extends Component {

    constructor(props) {
        super(props)
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {dataSource: ds.cloneWithRows(["un", "deux"])}
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <Text>{rowData}</Text>
                }
            />
        )
    }

}
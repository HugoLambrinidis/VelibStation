import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    AsyncStorage,
    TouchableOpacity
} from 'react-native'

export default class VelibList extends Component {

    constructor(props) {
        super(props)
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {dataSource: ds.cloneWithRows([])}
        this.getListContent()
    }

    async getListContent() {
        const value = AsyncStorage.getItem('VelibList')
        try {
            if (value !== null) {
                return Promise.resolve(value).then((res) => {
                    let parsedJSON = JSON.parse(res);
                    this.setState({
                        dataSource: ds.cloneWithRows(parsedJSON.records)
                    });
                })
            } else {
                console.log("Error while retrieving datas")
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return(
            <ListView
                style={{flex: 1}}
                dataSource = {this.state.dataSource}
                renderRow = {(rowData) =>
                    <View style={Styles.list}>
                        <Text>{rowData.fields.name}</Text>
                        <Text style={Styles.velibs}>{rowData.fields.available_bikes}/{rowData.fields.bike_stands}</Text>
                    </View>
                }
            />
        )
    }

}

const Styles = StyleSheet.create({
    list: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
    },
    velibs: {
        color: 'blue'
    }
})
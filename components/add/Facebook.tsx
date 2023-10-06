import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { getFacebookFriends } from '../../services/factory/Friends'

interface IIProps {
    data: any
    onSelect: any
}

const Item = ({ data, onSelect }: IIProps) => (
    <View style={Style.item}>
        <Text>{data.pseudo}</Text>
        <TouchableOpacity
            onPress={() => onSelect(data.id)}
            style={Style.addButton}
        >
            <Image
                source={require('../../assets/images/add2.png')}
                style={Style.addIcon}
            />
        </TouchableOpacity>
    </View>
)

export default () => {
    const [list, setList] = useState<Array<any>>([])

    useEffect(() => {
        const extract = getFacebookFriends()
        setList(extract)
    }, [])

    const onSelect = (id: number) => {
        console.log(id)
    }

    return (
        <View style={Style.container}>
            <View style={Style.label}>
                <Text>{'synchroniser avec mes amis '}</Text>
                <Text style={Style.span}>Facebook :</Text>
            </View>
            <View style={Style.listContainer}>
                <ScrollView horizontal>
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => `result${index}`}
                        renderItem={({ item }) => (
                            <Item data={item} onSelect={onSelect} />
                        )}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
    },
    label: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 375,
        maxWidth: 375,
    },
    span: {
        color: '#CC317C',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#1B2444',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
    },
    addIcon: {
        height: 13,
        width: 20,
    },
    addButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
    },
})

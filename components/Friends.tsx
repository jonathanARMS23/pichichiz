import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams, FriendStackParams } from '../navigation/tool/tool'
import { IState } from '../store/configureStore'
import Switch from './friends/Switch'
import List from './friends/List'
import Header from './mode/Header'
import Request from './friends/Request'

type FriendNavProp = StackNavigationProp<RootStackParams, 'room'>
type FriendRouteProp = RouteProp<FriendStackParams, 'manage'>

export default () => {
    const user = useSelector((state: IState) => state.user)
    const navigation = useNavigation<FriendNavProp>()
    const { params } = useRoute<FriendRouteProp>()
    const { option: paramsOption } = params
    const [option, setOption] = useState(paramsOption ?? 1)

    useEffect(() => {
        if (!user.id) {
            navigation.navigate('noaccess')
        }
    }, [user])

    const onPressList = () => {
        setOption(1)
    }

    const onPressDM = () => {
        setOption(2)
    }

    return (
        <View style={Style.container}>
            <ScrollView>
                <Header />
                <Switch
                    option={option}
                    onPressDM={onPressDM}
                    onPressList={onPressList}
                />
                {option === 1 ? <List /> : <Request />}
            </ScrollView>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})

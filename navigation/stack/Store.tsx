import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StoreStackParams } from '../tool/tool'
import Order from '../../screens/Order'
import Store from '../../screens/Store'

const Stack = createStackNavigator<StoreStackParams>()
const { Navigator, Screen } = Stack

export default () => (
    <Navigator
        initialRouteName="storemain"
        screenOptions={{ headerShown: false }}
    >
        <Screen name="storemain" component={Store} />
        <Screen name="order" component={Order} />
    </Navigator>
)

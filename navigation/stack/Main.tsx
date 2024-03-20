import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MainStackParams } from '../tool/tool'
import Online from '../../screens/Online'
import Main from '../../screens/Main'

const Stack = createStackNavigator<MainStackParams>()
const { Navigator, Screen } = Stack

export default () => (
    <Navigator initialRouteName="root" screenOptions={{ headerShown: false }}>
        <Screen name="root" component={Main} />
        <Screen name="online" component={Online} />
    </Navigator>
)

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { FriendStackParams } from '../tool/tool'
import Friends from '../../screens/Friends'
import Add from '../../screens/Add'
import Share from '../../screens/Share'
import Scan from '../../screens/Scan'

const Stack = createStackNavigator<FriendStackParams>()
const { Navigator, Screen } = Stack

export default () => (
    <Navigator initialRouteName="manage" screenOptions={{ headerShown: false }}>
        <Screen name="manage" component={Friends} />
        <Screen name="add" component={Add} />
        <Screen name="share" component={Share} />
        <Screen name="scan" component={Scan} />
    </Navigator>
)

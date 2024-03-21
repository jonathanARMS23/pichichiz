import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MainStackParams } from '../tool/tool'
import Online from '../../screens/Online'
import Main from '../../screens/Main'
import Ligue from '../../components/ligue'
import ManageLigue from '../../components/ManageLigue'
import RejoindreLigue from '../../components/ligue/RejoindreLigue'
import confirmRejoindre from '../../components/ligue/confirmRejoindre'
import ligueGame from '../../components/ligue/ligueGame/ligueGame'
import ligueSettings from '../../components/ligue/ligueGame/ligueSettings'

const Stack = createStackNavigator<MainStackParams>()
const { Navigator, Screen } = Stack

export default () => (
    <Navigator initialRouteName="root" screenOptions={{ headerShown: false }}>
        <Screen name="root" component={Main} />
        <Screen name="online" component={Online} />
        <Screen name="liguemain" component={Ligue} />
        <Screen name="manageligue" component={ManageLigue} />
        <Screen name="rejoindreligue" component={RejoindreLigue} />
        <Screen name="confirmrejoindre" component={confirmRejoindre} />
        <Screen name="liguegame" component={ligueGame} />
        <Screen name="liguesettings" component={ligueSettings} />
    </Navigator>
)

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MainStackParams } from '../tool/tool'
import Online from '../../screens/Online'
import Main from '../../screens/Main'
import Ligue from '../../components/ligue'
import ManageLigue from '../../components/ManageLigue'
import ligueGame from '../../components/ligue/ligueGame/ligueGame'
import ligueSettings from '../../components/ligue/ligueGame/ligueSettings'
import RejoindreLigue from '../../components/ligue/RejoindreLigue'
import Pyramide from '../../components/Pyramide'
import MultiJoueur from '../../components/MultiJoueur'
import Tournoi from '../../components/multi/tournoi/Tournoi'

const Stack = createStackNavigator<MainStackParams>()
const { Navigator, Screen } = Stack

export default () => (
    <Navigator initialRouteName="root" screenOptions={{ headerShown: false }}>
        <Screen name="root" component={Main} />

        {/* Multijoueur */}
        <Screen name="multijoueur" component={MultiJoueur} />
        <Screen name="tournoi" component={Tournoi} />
        {/* Online */}
        <Screen name="online" component={Online} />
        <Screen name="liguemain" component={Ligue} />
        <Screen name="manageligue" component={ManageLigue} />
        <Screen name="liguegame" component={ligueGame} />
        <Screen name="liguesettings" component={ligueSettings} />
        <Screen name="rejoindreligue" component={RejoindreLigue} />
        <Screen name="pyramide" component={Pyramide} />
    </Navigator>
)

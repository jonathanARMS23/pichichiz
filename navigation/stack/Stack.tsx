import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParams } from '../tool/tool'
/** import screen */
import Home from '../../screens/Home'
import Signin from '../../screens/Signin'
import Signup from '../../screens/Signup'
import Confirmation from '../../screens/Confirmation'
import Solo from '../../screens/Solo'
import SoloGame from '../../screens/SoloGame'

import Duel from '../../screens/Duel'
import DuelGame from '../../screens/DuelGame'
import Launch from '../../components/Launch'
import NoAccess from '../../screens/NoAccess'
import Results from '../../screens/Results'
import Notification from '../../screens/notification'
import FinishedDuel from '../../screens/FinishedDuel'
import Bilan from '../../screens/Bilan'
/** import navigation screen */
import Main from '../tab/Main'
import Ligue from '../../screens/ligue'
import LigueDetails from '../../components/ligue/LigueDetails'
import ManageLigue from '../../screens/ManageLigue'
import RejoindreLigue from '../../components/ligue/RejoindreLigue'
import confirmRejoindre from '../../components/ligue/confirmRejoindre'
import ligueGame from '../../components/ligue/ligueGame/ligueGame'
import ligueSettings from '../../components/ligue/ligueGame/ligueSettings'

const Stack = createStackNavigator<RootStackParams>()
const { Navigator, Screen } = Stack

export default () => (
    <NavigationContainer>
        <Navigator
            initialRouteName="launch"
            screenOptions={{ headerShown: false }}
        >
            <Screen name="home" component={Home} />
            <Screen name="signin" component={Signin} />
            <Screen name="signup" component={Signup} />
            <Screen name="confirmation" component={Confirmation} />
            <Screen name="room" component={Main} />
            <Screen name="solo" component={Solo} />
            <Screen name="sologame" component={SoloGame} />
            <Screen name="duel" component={Duel} />
            <Screen name="duelgame" component={DuelGame} />
            <Screen name="launch" component={Launch} />
            <Screen name="noaccess" component={NoAccess} />
            <Screen name="results" component={Results} />
            <Screen name="notification" component={Notification} />
            <Screen name="duelfinished" component={FinishedDuel} />
            <Screen name="bilan" component={Bilan} />

            {/* LIGUE */}
            <Screen name="ligue" component={Ligue} />
            <Screen name="liguedetails" component={LigueDetails} />
            <Screen name="invitationrejoindre" component={RejoindreLigue} />
            <Screen name="confirmrejoindre" component={confirmRejoindre} />
            <Screen name="manageligue" component={ManageLigue} />
            <Screen name="liguegame" component={ligueGame} />
            <Screen name="liguesettings" component={ligueSettings} />
        </Navigator>
    </NavigationContainer>
)

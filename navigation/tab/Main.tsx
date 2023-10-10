import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabParams } from '../tool/tool'
import Main from '../stack/Main'
import Profil from '../../screens/Profil'
// import Reward from '../../screens/Reward'
import Friends from '../stack/Friends'
import Icon from '../components/Icon'
import Label from '../components/Label'
import Store from '../stack/Store'

const Tab = createBottomTabNavigator<MainTabParams>()

const { Navigator, Screen } = Tab

export default () => (
    <Navigator
        initialRouteName="main"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size }) => (
                <Icon type={route.name} size={size} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => {
                let title

                switch (route.name) {
                    case 'main':
                        title = 'ACCUEIL'
                        break
                    case 'profil':
                        title = 'MON PROFIL'
                        break
                    case 'store':
                        title = 'STORE'
                        break
                    case 'friends':
                        title = 'MES AMIS'
                        break
                    case 'reward':
                        title = 'MES RECOMPENSES'
                        break
                    default:
                        title = 'ACCUEIL'
                        break
                }

                return <Label title={title} focused={focused} />
            },
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#1B2444',
                height: 60,
                paddingVertical: 10,
            },
        })}
    >
        <Screen name="main" component={Main} />
        <Screen
            name="friends"
            component={Friends}
            initialParams={{ screen: 'manage', params: { option: 1 } }}
        />
        <Screen name="store" component={Store} />
        {/** <Screen name="reward" component={Reward} /> */}
        <Screen name="profil" component={Profil} />
    </Navigator>
)

import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Image,
} from 'react-native'
import React from 'react'
import { COLORS } from '../../../utiles/constantes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-eva-icons'

interface IProps {
    setScreen: any
    screen: number
}

export default ({ setScreen, screen }: IProps) => {
    return (
        <View style={{ ...Style.container }}>
            <View style={{ ...Style.itemFooter, backgroundColor: '#ffffff' }}>
                <TouchableOpacity
                    style={Style.btn}
                    onPress={() => {
                        screen === 2 ? setScreen(1) : setScreen(2)
                    }}
                >
                    {screen !== 2 ? (
                        <Image
                            source={require('../../../assets/images/calendar_month.png')}
                        />
                    ) : null}

                    <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>
                        {screen === 2 ? 'PRINCIPAL' : 'CALENDRIER'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    ...Style.itemFooter,
                    backgroundColor: COLORS.light_primary,
                    borderWidth: 0,
                }}
            >
                <TouchableOpacity
                    style={Style.btn}
                    onPress={() => {
                        screen === 3 ? setScreen(1) : setScreen(3)
                    }}
                >
                    {screen !== 3 ? (
                        <Image
                            source={require('../../../assets/images/leaderboard_xl.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    ) : null}

                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                        {screen === 3 ? 'PRINCIPAL' : 'CLASSEMENT'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 60,
        maxHeight: 60,
        width: 375,
        marginBottom: 20,
    },
    itemFooter: {
        //flex: 1,
        width: 375 / 2 - 20,
        minHeight: 45,
        maxHeight: 45,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.primary,
    },
    btn: {
        flex: 1,
        width: 375 / 2 - 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})

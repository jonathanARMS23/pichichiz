import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { COLORS } from '../../../utiles/constantes'
import { Icon } from 'react-native-eva-icons'

export default () => {
    const { width } = useWindowDimensions()
    return (
        <View style={{ ...Style.container, width: width }}>
            <View>
                <Text
                    style={{ color: COLORS.very_light_primary, fontSize: 12 }}
                >
                    classement
                </Text>
                <View
                    style={{ flexDirection: 'row', alignItems: 'flex-start' }}
                >
                    <Text style={{ ...Style.textBanner, fontSize: 20 }}>9</Text>
                    <Text
                        style={{
                            ...Style.textBanner,
                            fontSize: 11,
                            lineHeight: 18,
                        }}
                    >
                        ème
                    </Text>
                </View>
            </View>
            <View style={{ ...Style.middle }}>
                <Text style={{ ...Style.textBanner, fontSize: 17 }}>
                    LIGUE SPORT360°
                </Text>
                <Text style={{ color: COLORS.very_light_primary }}>
                    JOURNEE 4
                </Text>
            </View>
            <View
                style={{
                    backgroundColor: COLORS.light_primary,
                }}
            >
                <TouchableOpacity style={Style.settingButton}>
                    <Icon
                        name="settings-2-outline"
                        height={30}
                        width={30}
                        fill="#FFFFFF"
                    />
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
        justifyContent: 'space-around',
        backgroundColor: COLORS.light_primary,
        minHeight: 70,
        maxHeight: 70,
    },
    textBanner: {
        color: '#ffffff',
    },
    middle: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    controls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: 40,
        maxHeight: 50,
        minWidth: 70,
        maxWidth: 70,
    },
    settingButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
    },
})

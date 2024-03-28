import React, { useState } from 'react'
import {
    View,
    Image,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'

export default () => {
    const { width } = useWindowDimensions()
    const [visible, setVisible] = useState(false)

    const onClose = () => {
        setVisible(false)
    }

    const onOpen = () => {
        setVisible(true)
    }
    return (
        <View style={{ ...Style.container, minWidth: width }}>
            <View style={Style.imageWrapper}>
                <Image
                    source={require('../../assets/images/pyramideBanner.png')}
                    style={Style.banner}
                />
            </View>
            <View style={Style.controls}>
                <TouchableOpacity onPress={onOpen} style={Style.infoButton}>
                    <Icon
                        name="info-outline"
                        height={20}
                        width={20}
                        fill="#000000"
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
        justifyContent: 'space-between',
        minHeight: 70,
        maxHeight: 70,
    },
    imageWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 40,
        maxHeight: 50,
        // minWidth: 265,
        // maxWidth: 265,
    },
    banner: {
        height: 60,
        width: 232,
    },
    controls: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: 40,
        maxHeight: 50,
    },
    infoButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EBECF0',
        borderRadius: 10,
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
        marginRight: 20,
    },
})

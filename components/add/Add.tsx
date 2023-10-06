import React from 'react'
import {
    View,
    // Image,
    // Text,
    StyleSheet,
    // TouchableOpacity,
    useWindowDimensions,
} from 'react-native'
/* import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { FriendStackParams } from '../../navigation/tool/tool' */
import Search from './Search'
import Email from './Email'
// import Code from './Code'
// import Facebook from './Facebook'

// type AddNavProp = StackNavigationProp<FriendStackParams, 'add'>

export default () => {
    // const navigation = useNavigation<AddNavProp>()
    const { height } = useWindowDimensions()

    /** const openShare = () => {
        navigation.navigate('share')
    }

    const openScan = () => {
        navigation.navigate('scan')
    } */

    return (
        <View style={{ ...Style.container, minHeight: height - 175 }}>
            <Search />
            <Email />
            {/* <Code /> */}
            {/* <Facebook /> */}
            {/** <View style={{ ...Style.footer, marginTop: height - 275 }}>
                <TouchableOpacity style={Style.scan} onPress={openScan}>
                    <Image
                        source={require('../../assets/images/scan.png')}
                        style={{ height: 20, width: 20 }}
                    />
                    <Text>{`  SCANNER`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.share} onPress={openShare}>
                    <Image
                        source={require('../../assets/images/share.png')}
                        style={{ height: 20, width: 13 }}
                    />
                    <Text
                        style={{ color: '#FFFFFF' }}
                    >{`  PARTAGER MON PROFIL`}</Text>
                </TouchableOpacity>
    </View> */}
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    /** footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
        position: 'absolute',
    },
    share: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        backgroundColor: '#1B2444',
        borderRadius: 10,
        minWidth: 200,
        maxWidth: 200,
    },
    scan: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        borderColor: '#1B2444',
        borderRadius: 10,
        borderWidth: 2,
        minWidth: 150,
        maxWidth: 150,
        backgroundColor: '#FFFFFF',
    }, */
})

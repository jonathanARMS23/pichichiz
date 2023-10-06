import React, { useEffect, useState } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    useWindowDimensions,
    Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useDispatch } from 'react-redux'
import { RootStackParams } from '../../navigation/tool/tool'
import { getUserFromStorage } from '../../services/factory/User'
import { setUser } from '../../store/reducers/user'

type AnimationNavProp = StackNavigationProp<RootStackParams, 'launch'>

export default () => {
    const Dispatch = useDispatch()
    const navigation = useNavigation<AnimationNavProp>()
    const { width, height } = useWindowDimensions()
    const [color, setColor] = useState('#1B2444')
    const [step, setStep] = useState(1)
    const [background, setBackground] = useState<any>(
        require('../../assets/images/animation_background.png')
    )

    useEffect(() => {
        let tmp = 1
        let secondInterval: number
        const interval = setInterval(() => {
            if (tmp === 6) {
                setBackground(
                    require('../../assets/images/animation_background_bw.png')
                )
                setColor('#FFFFFF')
                secondInterval = setInterval(async () => {
                    tmp++
                    setStep(tmp)
                    if (tmp === 9) {
                        await onFinish()
                        clearInterval(interval)
                        navigation.navigate('home')
                    }
                }, 1000)
                clearInterval(interval)
            } else {
                tmp++
                setStep(tmp)
            }
        }, 300)

        return () => {
            clearInterval(interval)
            clearInterval(secondInterval)
        }
    }, [])

    const onFinish = async () => {
        try {
            const data = await getUserFromStorage()
            if (data) Dispatch(setUser(JSON.parse(data)))
        } catch (error) {
            console.log(error)
        }
    }

    const renderLogo = () => {
        switch (step) {
            case 1:
                return require('../../assets/images/logo_animation1.png')
            case 2:
                return require('../../assets/images/logo_animation2.png')
            case 3:
                return require('../../assets/images/logo_animation1.png')
            case 4:
                return require('../../assets/images/logo_animation3.png')
            case 5:
                return require('../../assets/images/logo_animation1.png')
            case 6:
                return require('../../assets/images/logo_animation1.png')
            case 7:
                return require('../../assets/images/logo_animation4.png')
            case 8:
                return require('../../assets/images/logo_animation4.png')
            default:
                return require('../../assets/images/logo_animation4.png')
        }
    }

    return (
        <View
            style={{
                ...Style.container,
                backgroundColor: color,
                minHeight: height,
                minWidth: width,
            }}
        >
            <ImageBackground
                style={
                    step < 8
                        ? {
                              ...Style.backgroundStyle1,
                              backgroundColor: color,
                              minHeight: height,
                              minWidth: width,
                          }
                        : {
                              ...Style.backgroundStyle2,
                              backgroundColor: color,
                              minHeight: height,
                              minWidth: width,
                          }
                }
                source={background}
            >
                <Image source={renderLogo()} style={Style.logo} />
            </ImageBackground>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundStyle1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundStyle2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
    },
    logo: {
        height: 77,
        width: 277,
    },
})

import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/tool/tool'

type OptionNavProp = StackNavigationProp<RootStackParams, 'room'>

interface IProps {
    title: string
    type: string
    description: string
    level?: boolean
    levelValue: string | number
    color: string
    scoreColor?: string
    iconColor?: string
    disabled?: boolean
}

interface OIProps {
    type: string
}

const images = {
    single: require('../../assets/images/solo.png'),
    multi: require('../../assets/images/multi.png'),
    online: require('../../assets/images/online.png'),
}

const OImage = ({ type }: OIProps) => {
    switch (type) {
        case 'solo':
            return <Image source={images.single} style={Style.icon} />
        case 'multi':
            return <Image source={images.multi} style={Style.icon} />
        case 'online':
            return <Image source={images.online} style={Style.icon} />
        default:
            return <Image source={images.single} style={Style.icon} />
    }
}

export default ({
    title,
    type,
    description,
    level,
    levelValue,
    color,
    scoreColor,
    iconColor,
    disabled,
}: IProps) => {
    const navigation = useNavigation<OptionNavProp>()

    const handlePress = () => {
        if (type === 'solo') navigation.navigate('solo')
        if (type === 'online')
            navigation.navigate('room', {
                screen: 'main',
                params: { screen: 'online' },
            })
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={
                disabled
                    ? {
                          ...Style.container,
                          ...Style.elevation,
                          marginVertical: 15,
                          opacity: 0.5,
                      }
                    : {
                          ...Style.container,
                          ...Style.elevation,
                          marginVertical: 15,
                      }
            }
        >
            <View
                style={{
                    ...Style.container,
                    backgroundColor: disabled ? '#BDBDBD' : color,
                }}
            >
                <View style={Style.header}>
                    <View style={Style.titleContainer}>
                        <Icon
                            name="play-circle-outline"
                            height={20}
                            width={20}
                            fill={iconColor}
                        />
                        <Text style={Style.title}>{` ${title}`}</Text>
                    </View>
                    <View style={Style.iconContainer}>
                        <OImage type={type} />
                    </View>
                </View>
                <View style={Style.body}>
                    <View style={Style.descriptionContainer}>
                        <Text style={Style.description}>{description}</Text>
                    </View>
                    <View style={Style.arrowContainer}>
                        <Icon
                            name="arrow-ios-forward-outline"
                            height={50}
                            width={50}
                            fill="#000000"
                        />
                    </View>
                </View>
                {level ? (
                    <View style={Style.footer}>
                        <View
                            style={{
                                ...Style.score,
                                backgroundColor: scoreColor,
                            }}
                        >
                            <Text
                                style={{ fontWeight: 'bold' }}
                            >{`Niveau ${levelValue}`}</Text>
                        </View>
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    elevation: {
        shadowColor: '#B1B1B1',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    container: {
        flex: 1,
        minHeight: 170,
        maxHeight: 170,
        minWidth: 325,
        maxWidth: 325,
        borderRadius: 15,
    },
    header: {
        flex: 1,
        minWidth: 300,
        maxWidth: 300,
        minHeight: 50,
        maxHeight: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 200,
        maxWidth: 200,
        minHeight: 50,
        maxHeight: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 75,
        maxHeight: 75,
        minWidth: 100,
        maxWidth: 100,
        marginTop: -25,
    },
    icon: {
        height: 75,
        width: 75,
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 70,
        maxHeight: 70,
    },
    descriptionContainer: {
        flex: 1,
        minWidth: 250,
        maxWidth: 250,
        minHeight: 70,
        maxHeight: 70,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    description: {
        minWidth: 250,
        maxWidth: 250,
        minHeight: 40,
        maxHeight: 40,
        fontSize: 15,
        paddingHorizontal: 10,
        fontStyle: 'italic',
        textAlign: 'justify',
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 50,
        maxWidth: 50,
        minHeight: 70,
        maxHeight: 70,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 300,
        maxWidth: 300,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 20,
    },
    score: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 30,
        maxHeight: 30,
        minWidth: 100,
        maxWidth: 150,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#31CCC5',
    },
})

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
    color: string
    subtitle: string
    disabled?: boolean
}

interface OIProps {
    type: string
}

const images = {
    duel: require('../../assets/images/duel.png'),
    ligue: require('../../assets/images/ligue.png'),
    pyramide: require('../../assets/images/pyramide.png'),
}

const OImage = ({ type }: OIProps) => {
    switch (type) {
        case 'duel':
            return (
                <Image
                    source={images.duel}
                    style={{ minWidth: 59, minHeight: 53 }}
                />
            )
        case 'ligue':
            return <Image source={images.ligue} style={Style.icon} />
        case 'pyramide':
            return <Image source={images.pyramide} style={Style.icon} />
        default:
            return <Image source={images.duel} style={Style.icon} />
    }
}

export default ({
    title,
    type,
    description,
    color,
    subtitle,
    disabled,
}: IProps) => {
    const navigation = useNavigation<OptionNavProp>()

    const handlePress = () => {
        if (disabled) return
        if (type === 'duel') navigation.navigate('duel')
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
                        <Text style={Style.title}>{` ${title}`}</Text>
                    </View>
                    <View style={Style.iconContainer}>
                        <OImage type={type} />
                    </View>
                </View>
                <View style={Style.body}>
                    <View style={Style.descriptionContainer}>
                        {subtitle && subtitle !== '' ? (
                            <Text style={Style.subtittle}>{subtitle}</Text>
                        ) : null}
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
        minHeight: 200,
        maxHeight: 200,
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
        minHeight: 150,
        maxHeight: 150,
    },
    descriptionContainer: {
        flex: 1,
        minWidth: 250,
        maxWidth: 250,
        minHeight: 150,
        maxHeight: 150,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
    },
    subtittle: {
        fontWeight: 'bold',
        paddingHorizontal: 10,
        minHeight: 50,
        maxHeight: 50,
    },
    description: {
        minWidth: 250,
        maxWidth: 250,
        minHeight: 100,
        maxHeight: 100,
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
})

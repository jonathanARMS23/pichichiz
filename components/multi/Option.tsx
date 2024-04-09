import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParams, RootStackParams } from '../../navigation/tool/tool'

type OptionNavProp = StackNavigationProp<MainStackParams, 'online'>

interface IProps {
    title: string
    type: string
    description: string
    color: string
    nbMax: number
    disabled?: boolean
}

interface OIProps {
    type: string
}

const images = {
    tournoi: require('../../assets/images/tournoi.png'),
    montre: require('../../assets/images/contre-montre.png'),
    mort: require('../../assets/images/mort-subite.png'),
}

const OImage = ({ type }: OIProps) => {
    switch (type) {
        case 'tournoi':
            return (
                <Image
                    source={images.tournoi}
                    style={{ minWidth: 59, minHeight: 53 }}
                />
            )
        case 'montre':
            return <Image source={images.montre} style={Style.icon} />
        case 'mort':
            return <Image source={images.mort} style={Style.icon} />
        default:
            return <Image source={images.tournoi} style={Style.icon} />
    }
}

export default ({
    title,
    type,
    description,
    color,
    nbMax,
    disabled,
}: IProps) => {
    const navigation = useNavigation<OptionNavProp>()

    const handlePress = () => {
        if (disabled) return
        if (type === 'tournoi') navigation.navigate('tournoi')
        if (type === 'ligue') navigation.navigate('liguemain')
        if (type === 'pyramide') navigation.navigate('pyramide')
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
                        <Text style={Style.description}>{description}</Text>
                        <Text
                            style={{
                                ...Style.description,
                                fontSize: 13,
                                fontStyle: 'italic',
                                marginBottom: 5,
                            }}
                        >
                            {nbMax} joueurs max.
                        </Text>
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
        minHeight: '100%',
        maxHeight: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
    },
    description: {
        minWidth: 250,
        maxWidth: 250,
        fontSize: 15,
        paddingHorizontal: 10,
        fontStyle: 'italic',
        textAlign: 'justify',
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 50,
        maxWidth: 50,
        minHeight: '100%',
        maxHeight: '100%',
    },
})

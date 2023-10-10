import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    useWindowDimensions,
    StyleSheet,
    Image,
} from 'react-native'
import DynamicRate from './DynamicRate'

interface IProps {
    rate: number
    level: number
    bonus: any
}

export default ({ rate, level, bonus }: IProps) => {
    const { width } = useWindowDimensions()
    const [passed, setPassed] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (rate > 7) setPassed(true)
        else setPassed(false)
    }, [])

    const getIconStatic = () => {
        switch (bonus) {
            case 'INDICE':
                return require('../../../assets/images/indice.png')
            case 'PASSER':
                return require('../../../assets/images/passer.png')
            case 'DOUBLE CHANCE':
                return require('../../../assets/images/double_chance.png')
            case 'TEMPS':
                return require('../../../assets/images/temps.png')
            case 'LETTRES':
                return require('../../../assets/images/lettres.png')
            case '50/50':
                return require('../../../assets/images/cinquante.png')
            default:
                return require('../../../assets/images/indice.png')
        }
    }

    if (!loaded)
        return (
            <View
                style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}
            >
                <View style={Style.motif}>
                    <View style={Style.elipse}>
                        <Text>SCORE</Text>
                        <DynamicRate rate={rate} setLoad={setLoaded} />
                    </View>
                </View>
            </View>
        )

    return (
        <View style={{ ...Style.wrapper, minWidth: width, maxWidth: width }}>
            <ImageBackground
                source={
                    passed
                        ? require('../../../assets/images/victory.png')
                        : require('../../../assets/images/defeat.png')
                }
                style={Style.motif}
            >
                <ImageBackground
                    source={
                        passed
                            ? require('../../../assets/images/victoryElipse.png')
                            : require('../../../assets/images/defeatElipse.png')
                    }
                    style={Style.elipse}
                >
                    <Text style={{ color: '#323D65' }}>SCORE</Text>
                    <DynamicRate rate={rate} setLoad={setLoaded} />
                </ImageBackground>
            </ImageBackground>
            <View style={Style.message}>
                <Text
                    style={{
                        color: passed ? '#31CCC0' : '#CC317C',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}
                >
                    {passed ? `BRAVO !` : `BIEN JOUE`}
                </Text>
                <Text style={{ color: '#EBECF0', fontSize: 12 }}>
                    {passed
                        ? `tu as débloqué le niveau ${
                              level + 1
                          }`.toLocaleUpperCase()
                        : `bien joué mais pas suffisant pour valider le niveau ${level}`.toLocaleUpperCase()}
                </Text>
            </View>
            {bonus ? (
                <View style={Style.bonusContainer}>
                    <ImageBackground
                        source={require('../../../assets/images/victory.png')}
                        style={Style.motif}
                    >
                        <ImageBackground
                            source={require('../../../assets/images/victoryElipse.png')}
                            style={Style.elipse}
                        >
                            <Image
                                source={getIconStatic()}
                                style={Style.image2}
                            />
                        </ImageBackground>
                        <Text
                            style={{ color: '#FFFFFF', fontSize: 12 }}
                        >{`Tu as gagné un bonus ${bonus}`}</Text>
                    </ImageBackground>
                </View>
            ) : null}
        </View>
    )
}

const Style = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 444,
        maxHeight: 444,
    },
    motif: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 124,
        maxHeight: 124,
        minWidth: 245.13,
        maxWidth: 245.13,
    },
    elipse: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 105,
        maxHeight: 105,
        minWidth: 105,
        maxWidth: 105,
    },
    message: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 63,
        maxHeight: 63,
        minWidth: 329,
        maxWidth: 329,
    },
    image2: {
        height: 46,
        width: 46,
    },
    bonusContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        maxHeight: 100,
    },
})

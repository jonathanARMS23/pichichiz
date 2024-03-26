import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    StyleSheet,
} from 'react-native'
import { RNAatkit } from '@addapptr/react-native-aatkit'
import { Icon } from 'react-native-eva-icons'
import { Bar } from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../../navigation/tool/tool'
import { PLACEMENT } from '../../../pubs'
import { useAppSelector } from '../../../store/hooks/hooks'

type FooterNavProp = StackNavigationProp<RootStackParams, 'sologame'>

interface IProps {
    rate: number
    onPress: any
}

export default ({ rate, onPress }: IProps) => {
    const navigation = useNavigation<FooterNavProp>()
    const { width } = useWindowDimensions()
    const [passed, setPassed] = useState(false)
    const { haveAd } = useAppSelector((state) => state.pubs)
    const [load, setLoad] = useState(false)

    const duration = 4000

    const [progress, setProgress] = useState(0)
    const incrementRate = (100 / duration) * 100 // Calcul du taux d'incrémentation pour atteindre 100% en "totalDuration" millisecondes

    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 100) {
                setProgress((prevProgress) =>
                    Math.min(prevProgress + incrementRate, 100)
                ) // Assure que la progression n'excède pas 100
            } else {
                clearInterval(interval)
            }
        }, duration / 100) // Intervalle de mise à jour basé sur le temps total nécessaire pour atteindre 100%

        return () => clearInterval(interval) // Nettoyage de l'intervalle lorsque le composant est démonté
    }, [progress, duration, incrementRate])

    useEffect(() => {
        setLoad(false)
        let timeout: any
        if (haveAd) {
            timeout = setTimeout(() => {
                RNAatkit.showPlacement(PLACEMENT, (inter) =>
                    console.log('show placement', inter)
                )
                setLoad(true)
            }, duration)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [haveAd])

    useEffect(() => {
        if (rate > 7) setPassed(true)
        else setPassed(false)
    }, [])

    const onCancel = () => {
        navigation.navigate('solo')
    }

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <TouchableOpacity
                disabled={!load}
                onPress={onPress}
                style={{ ...Style.button, opacity: !load ? 0.5 : 1 }}
            >
                <Text>{passed ? `NIVEAU SUIVANT` : `REESSAYER`}</Text>
                <Icon
                    name="arrow-forward"
                    fill="#000000"
                    height={20}
                    width={20}
                />
            </TouchableOpacity>
            <TouchableOpacity
                disabled={!load}
                onPress={onCancel}
                style={{ ...Style.cancel, opacity: !load ? 0.5 : 1 }}
            >
                <Icon
                    name="close-circle"
                    fill="#323D65"
                    height={51}
                    width={51}
                />
            </TouchableOpacity>
            <Bar progress={progress} width={100} color="#EBECF0" />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: 177,
        maxHeight: 177,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 212,
        maxWidth: 212,
        backgroundColor: '#EBECF0',
    },
    cancel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 51,
        maxHeight: 51,
        minWidth: 51,
        maxWidth: 51,
    },
})

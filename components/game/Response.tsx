/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react'
import {
    View,
    ScrollView,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useDispatch } from 'react-redux'
import { upScore } from '../../store/reducers/game'
// import { useBonus, InitializeBonusState } from '../../store/reducers/bonus'
import {
    extractResponseData,
    rightResponse,
    manageIndice,
} from '../../services/factory/Game'
// import { useBonusFactory } from '../../services/factory/bonus'
import Option from './Option'
import Bonus from './Bonus/Bonus'
// import BonusStore from '../../services/store/Bonus'

interface IProps {
    data: any
    elapsed: boolean
    onNext: any
    upTime: any
    setStopped: any
}

export default ({ data, elapsed, onNext, upTime, setStopped }: IProps) => {
    const { height, width } = useWindowDimensions()
    const ResponseHeight = height / 2 - 70
    // const user = useSelector((state: any) => state.user)
    const [right, setRight] = useState<any>(null)
    const [choice, setChoice] = useState<Array<any> | null>(null)
    const [verify, setVerify] = useState(false)
    const [valid, setValid] = useState(false)
    const [chance, setChance] = useState(1)
    const [reload, setReload] = useState(false)
    const [indice, setIndice] = useState<string | null>(null)
    const [showIndice, setShowIndice] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const extractChoice = extractResponseData(data)
        if (extractChoice) setChoice(extractChoice)
        const extract = rightResponse(data)
        if (extract) setRight(extract)
        const extractIndice = manageIndice(data)
        if (extractIndice) setIndice(extractIndice)
    }, [])

    useEffect(() => {
        console.log(`Nombre de chance: ${chance}`)
    }, [chance])

    useEffect(() => {
        if (elapsed) {
            setVerify(true)
        }
    }, [elapsed])

    // fonction appeller par le bouton "suivant"
    const handlePress = () => {
        setStopped(false)
        if (valid) {
            // ajouter au score
            const score = parseInt(data.score, 10)
            dispatch(upScore(score))
        }
        // next
        onNext()
    }

    // fonction pour recharger le composant "Response"
    const onReload = () => {
        setReload(true)
        const timeout = setTimeout(() => {
            setReload(false)
            clearTimeout(timeout)
        }, 50)
    }

    // fonction appeller lors de l'activation du bonus "50/50"
    const fifty = () => {
        if (Array.isArray(choice) && right && choice.length > 2) {
            const options: Array<any> = []
            let response: any
            for (const el of choice) {
                if (el.id !== right) options.push(el)
                else response = el
            }
            const randomIndex = Math.floor(Math.random() * 3)
            const newChoice = [response, options[randomIndex]]
            setChoice(newChoice)
            onReload()
        }
    }

    const onUse = async (type: string) => {
        /** if (user.id) {
            const API = new BonusStore()
            const response = await API.useBonus({
                nom: type,
                quantity: 1,
                user_id: user.id,
            })
            if (!response.canceled && Array.isArray(response)) {
                // chargement dans le global state "bonus"
                dispatch(
                    InitializeBonusState({
                        list: response,
                    })
                )
            }
        } else {
            // soustraire le bonus utilisé
            await useBonusFactory(type)
            dispatch(useBonus({ type }))
        } */
        console.log(type)
        if (type === 'DOUBLE CHANCE') {
            const tmp = chance
            setChance(tmp + 1)
            console.log(`double chance utilisé, chance: ${chance}`)
        }
        if (type === 'PASSER') {
            // ajouter au score
            const score = parseInt(data.score, 10)
            dispatch(upScore(score))
            // next
            onNext()
        }
        if (type === 'TEMPS') {
            upTime()
        }
        if (type === '50/50') {
            fifty()
        }
        if (type === 'INDICE') {
            setShowIndice(true)
        }
    }

    if (reload) return null

    return (
        <View
            style={{
                ...Style.supercontainer,
                minWidth: width,
                maxWidth: width,
                minHeight: showIndice ? ResponseHeight + 40 : ResponseHeight,
                maxHeight: showIndice ? ResponseHeight + 40 : ResponseHeight,
            }}
        >
            {showIndice ? (
                <View
                    style={{
                        ...Style.indice,
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    <Text style={{ fontSize: 11 }}>
                        {indice ?? `Indice non disponible pour cette question`}
                    </Text>
                </View>
            ) : null}
            <View
                style={{
                    ...Style.container,
                    minWidth: width,
                    maxWidth: width,
                    minHeight: ResponseHeight,
                    maxHeight: ResponseHeight,
                }}
            >
                <View
                    style={{
                        ...Style.listContainer,
                        minWidth: width,
                        maxWidth: width,
                        minHeight: showIndice
                            ? ResponseHeight - 130
                            : ResponseHeight - 90,
                        maxHeight: showIndice
                            ? ResponseHeight - 130
                            : ResponseHeight - 90,
                    }}
                >
                    <ScrollView horizontal>
                        <FlatList
                            data={choice}
                            keyExtractor={(item, index) => `choice${index}`}
                            renderItem={({ item }) => (
                                <Option
                                    id={item.id}
                                    response={item.text}
                                    responseId={right}
                                    verified={verify}
                                    verify={setVerify}
                                    setValid={setValid}
                                    chance={chance}
                                    setChance={setChance}
                                    setStopped={setStopped}
                                />
                            )}
                        />
                    </ScrollView>
                </View>
                {verify ? (
                    <View
                        style={{
                            ...Style.footer,
                            minWidth: width,
                            maxWidth: width,
                        }}
                    >
                        <TouchableOpacity
                            style={Style.button}
                            onPress={handlePress}
                        >
                            <Text>SUIVANT</Text>
                            <Icon
                                name="arrow-forward"
                                fill="#000000"
                                height={20}
                                width={20}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Bonus onUse={onUse} />
                )}
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    indice: {
        flex: 1,
        minHeight: 40,
        maxHeight: 40,
        backgroundColor: '#EBECF0',
        paddingHorizontal: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    supercontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#1B2444',
        paddingVertical: 10,
        justifyContent: 'flex-start',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 60,
        maxHeight: 60,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        minWidth: 194,
        maxWidth: 194,
        minHeight: 60,
        maxHeight: 60,
    },
})

/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
    TextInput,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useDispatch } from 'react-redux'
import { useBonus } from '../../store/reducers/bonus'
import { extractRightResponse } from '../../services/factory/Duel'
import { useBonusFactory } from '../../services/factory/bonus'
import Option from './OptionPenalty'
import Bonus from '../game/Bonus/Bonus'

interface IProps {
    data: any
    elapsed: boolean
    onNext: any
    upTime: any
    setStopped: any
    setInput: any
}

export default ({
    data,
    elapsed,
    onNext,
    upTime,
    setStopped,
    setInput,
}: IProps) => {
    const { height, width } = useWindowDimensions()
    const ResponseHeight = height / 2 - 70
    const [right, setRight] = useState<any>(null)
    const [choice, setChoice] = useState<Array<any> | null>(null)
    const [verify, setVerify] = useState(false)
    const [valid, setValid] = useState(false)
    const [chance, setChance] = useState(1)
    const [reload, setReload] = useState(false)
    const [value, setValue] = useState('')
    const [hasFault, setHasFault] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const extract = extractRightResponse(data)
        if (extract) setRight(extract)
    }, [])

    useEffect(() => {
        if (elapsed) {
            setVerify(true)
        }
    }, [elapsed])

    const handlePress = async () => {
        setStopped(false)
        await onNext(valid)
    }

    const onReload = () => {
        setReload(true)
        const timeout = setTimeout(() => {
            setReload(false)
            clearTimeout(timeout)
        }, 50)
    }

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
        // soustraire le bonus utilisé
        await useBonusFactory(type)
        dispatch(useBonus({ type }))
        if (type === 'DOUBLE CHANCE') {
            const tmp = chance
            setChance(tmp + 1)
        }
        if (type === 'PASSER') {
            // next
            await onNext()
        }
        if (type === 'TEMPS') {
            upTime()
        }
        if (type === '50/50') {
            fifty()
        }
    }

    const onChangeValue = (text: string) => {
        setHasFault(false)
        const regex = /^\d+$/
        if (regex.test(text)) {
            setValue(text)
            setInput(text)
        }
    }

    const handleValid = () => {
        if (chance - 1 === 0) {
            setValid(parseInt(`${value}`, 10) === parseInt(`${right}`, 10))
            setStopped(true)
            setVerify(true)
        } else {
            setHasFault(true)
        }
    }

    if (reload) return null

    return (
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
                    minHeight: ResponseHeight - 90,
                    maxHeight: ResponseHeight - 90,
                }}
            >
                {verify ? (
                    <View
                        style={{
                            ...Style.inputContainer,
                            justifyContent: 'center',
                            minWidth: width,
                            maxWidth: width,
                            minHeight: ResponseHeight - 90,
                            maxHeight: ResponseHeight - 90,
                        }}
                    >
                        <Option
                            id={value}
                            response={value}
                            responseId={right}
                            verified={verify}
                        />
                        {parseInt(`${value}`, 10) !==
                        parseInt(`${right}`, 10) ? (
                            <Option
                                id={right}
                                response={right}
                                responseId={right}
                                verified={verify}
                            />
                        ) : null}
                    </View>
                ) : (
                    <View
                        style={{
                            ...Style.inputContainer,
                            minWidth: width,
                            maxWidth: width,
                            minHeight: ResponseHeight - 90,
                            maxHeight: ResponseHeight - 90,
                        }}
                    >
                        <TextInput
                            placeholder="Votre réponse..."
                            placeholderTextColor="#ffffff"
                            value={value}
                            onChangeText={onChangeValue}
                            style={{
                                ...Style.input,
                                borderColor: hasFault ? '#CC317C' : '#FFFFFF',
                            }}
                        />
                        <TouchableOpacity
                            onPress={handleValid}
                            style={Style.validationButton}
                        >
                            <Text style={Style.validationText}>VALIDER</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
                <Bonus onUse={onUse} noFifty noPass />
            )}
        </View>
    )
}

const Style = StyleSheet.create({
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
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    input: {
        minWidth: 341,
        maxWidth: 341,
        minHeight: 50,
        maxHeight: 50,
        borderWidth: 0,
        borderBottomWidth: 2,
        backgroundColor: '#1B2444',
        color: '#FFFFFF',
        fontSize: 15,
    },
    validationButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 191,
        maxWidth: 191,
        minHeight: 60,
        maxHeight: 60,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        borderWidth: 3,
    },
    validationText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
})

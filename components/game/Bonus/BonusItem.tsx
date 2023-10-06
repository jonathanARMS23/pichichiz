import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    useWindowDimensions,
    ImageBackground,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    activateBonus,
    InitializeBonusState,
} from '../../../store/reducers/bonus'
import {
    activateBonusFactory,
    formatBonus,
    useBonusFactory,
    getBonus,
} from '../../../services/factory/bonus'
import { IBonusList } from '../../../services/models/Bonus'
import BonusStore from '../../../services/store/Bonus'
import Badge from '../../sous-components/Badge'

interface IProps {
    data: IBonusList
    onUse: any
    noFifty?: boolean
    noPass?: boolean
}

export default ({ data, onUse, noFifty, noPass }: IProps) => {
    const user = useSelector((state: any) => state.user)
    const { width, height } = useWindowDimensions()
    const [visible, setVisible] = useState(false)
    const [launched, setLaunched] = useState(false)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    const onLaunched = async () => {
        setLaunched(true)
        const showIcon = setTimeout(() => {
            setShow(true)
            clearTimeout(showIcon)
        }, 500)
        const hiddenIcon = setTimeout(() => {
            setShow(false)
            clearTimeout(hiddenIcon)
        }, 2500)
        const stop = setTimeout(() => {
            setLaunched(false)
            onUse(data.nom)
            clearTimeout(stop)
        }, 3000)
        // enlever le bonus
        if (user.id) {
            const API = new BonusStore()
            const response = await API.useBonus({
                nom: data.nom,
                user_id: user.id,
                quantity: 1,
            })
            if (!response.canceled && Array.isArray(response)) {
                // chargement dans le global state "bonus"
                dispatch(
                    InitializeBonusState({
                        list: formatBonus(response),
                    })
                )
            }
        } else {
            await useBonusFactory(data.nom)
            const bonus = await getBonus()
            if (bonus) {
                dispatch(
                    InitializeBonusState({
                        list: bonus,
                    })
                )
            }
        }
    }

    const onPress = async () => {
        if (data.count > 0) {
            if (!data.introduced) {
                setVisible(true)
            } else {
                await onLaunched()
            }
        }
        // onLaunched()
    }

    const handleUse = async () => {
        await activateBonusFactory(data.nom)
        dispatch(activateBonus({ type: data.nom }))
        setVisible(false)
        await onLaunched()
    }

    const getIcon = () => {
        switch (data.nom) {
            case 'INDICE':
                return data.count > 0
                    ? require('../../../assets/images/indice.png')
                    : require('../../../assets/images/indice_inactivated.png')
            case 'PASSER':
                return data.count > 0
                    ? require('../../../assets/images/passer.png')
                    : require('../../../assets/images/passer_inactivated.png')
            case 'DOUBLE CHANCE':
                return data.count > 0
                    ? require('../../../assets/images/double_chance.png')
                    : require('../../../assets/images/double_chance_inactivated.png')
            case 'TEMPS':
                return data.count > 0
                    ? require('../../../assets/images/temps.png')
                    : require('../../../assets/images/temps_inactivated.png')
            case 'LETTRES':
                return data.count > 0
                    ? require('../../../assets/images/lettres.png')
                    : require('../../../assets/images/lettre_inactivated.png')
            case '50/50':
                return data.count > 0
                    ? require('../../../assets/images/cinquante.png')
                    : require('../../../assets/images/cinquante_inactivated.png')
            default:
                return data.count > 0
                    ? require('../../../assets/images/indice.png')
                    : require('../../../assets/images/indice_inactivated.png')
        }
    }

    const getIconStatic = () => {
        switch (data.nom) {
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

    if (noFifty && data.nom === '50/50') return null

    if (noPass && data.nom === 'PASSER') return null

    return (
        <View style={Style.container}>
            <TouchableOpacity onPress={onPress} style={Style.bonus}>
                <Image source={getIcon()} style={Style.image} />
                {data.count > 0 ? (
                    <Badge
                        value={data.count}
                        height={46}
                        width={46}
                        badgeDimension={14}
                        fontSize={8}
                    />
                ) : null}
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false)
                }}
            >
                <View
                    style={{
                        ...Style.modal,
                        minHeight: height,
                        maxHeight: height,
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 14 }}>
                        MODE SOLO
                    </Text>
                    <ImageBackground
                        source={require('../../../assets/images/victory.png')}
                        style={Style.imageBackground}
                    >
                        <Text style={Style.title}>NOUVEAU</Text>
                        <Text style={Style.title}>BONUS!</Text>
                    </ImageBackground>
                    <View style={Style.bonusType}>
                        <View
                            style={{
                                ...Style.bonus,
                                minHeight: 90,
                                maxHeight: 90,
                                minWidth: 90,
                                maxWidth: 90,
                            }}
                        >
                            <Image
                                source={getIconStatic()}
                                style={Style.image2}
                            />
                            <Badge
                                value={data.count}
                                height={74}
                                width={74}
                                badgeDimension={22.52}
                                fontSize={10}
                            />
                        </View>
                        <Text style={{ ...Style.title, fontWeight: 'bold' }}>
                            {data.nom}
                        </Text>
                    </View>
                    <Text
                        style={{
                            ...Style.text,
                            fontWeight: 'bold',
                            fontSize: 16,
                            textAlign: 'center',
                        }}
                    >{`Le bonus ${data.nom} est maintenant disponible !`}</Text>
                    <Text
                        style={{
                            ...Style.text,
                            fontSize: 14,
                            textAlign: 'center',
                        }}
                    >
                        {data.description}
                    </Text>
                    <View
                        style={{
                            ...Style.footer,
                            minWidth: width,
                            maxWidth: width,
                        }}
                    >
                        <TouchableOpacity
                            style={Style.useButton}
                            onPress={handleUse}
                        >
                            <Text style={{ ...Style.title, color: '#000000' }}>
                                UTILISER
                            </Text>
                            <Icon
                                name="arrow-forward"
                                height={12}
                                width={16}
                                fill="#000000"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={launched}
                onRequestClose={() => {
                    setLaunched(false)
                }}
            >
                <View
                    style={{
                        ...Style.animationModal,
                        minHeight: height,
                        maxHeight: height,
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    {show ? (
                        <View
                            style={{
                                ...Style.bonus,
                                minHeight: 90,
                                maxHeight: 90,
                                minWidth: 90,
                                maxWidth: 90,
                            }}
                        >
                            <Image
                                source={getIconStatic()}
                                style={Style.image3}
                            />
                            <Badge
                                value={1}
                                height={177}
                                width={177}
                                badgeDimension={53.87}
                                fontSize={20}
                            />
                        </View>
                    ) : null}
                </View>
            </Modal>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 5,
        paddingTop: 10,
        minHeight: 100,
        maxHeight: 100,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#1B2444',
    },
    bonus: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
        position: 'relative',
    },
    image: {
        height: 46,
        width: 46,
    },
    image2: {
        height: 74,
        width: 74,
    },
    image3: {
        height: 177,
        width: 177,
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 114.52,
        maxHeight: 114.52,
        minWidth: 245.13,
        maxWidth: 245.13,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    bonusType: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 118,
        maxHeight: 118,
        minWidth: 100,
        maxWidth: 100,
    },
    useButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#EBECF0',
        minHeight: 60,
        maxHeight: 60,
        minWidth: 194,
        maxWidth: 194,
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 90,
        maxHeight: 90,
    },
    text: {
        color: '#FFFFFF',
    },
    animationModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
})

/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    StyleSheet,
    Modal,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StoreStackParams } from '../../navigation/tool/tool'
import OrderStore, { CreateOrder } from '../../services/store/Order'
import { useAppSelector } from '../../store/hooks/hooks'
import BonusItem from './BonusItem'
import HpItem from './HpItem'

interface ISelected {
    type: 'bonus' | 'hp' | 'pack' | 'pub'
    name?: string
}

type NavProp = StackNavigationProp<StoreStackParams, 'storemain'>

interface IBonus {
    type: string
}

const Bonus = ({ type }: IBonus) => {
    const getIcon = () => {
        switch (type) {
            case 'INDICE':
                return require('../../assets/images/indice.png')
            case 'PASSER':
                return require('../../assets/images/passer.png')
            case 'DOUBLE CHANCE':
                return require('../../assets/images/double_chance.png')
            case 'TEMPS':
                return require('../../assets/images/temps.png')
            case 'LETTRES':
                return require('../../assets/images/lettres.png')
            case '50/50':
                return require('../../assets/images/cinquante.png')
            default:
                return require('../../assets/images/indice.png')
        }
    }

    return <Image source={getIcon()} style={{ height: 46, width: 46 }} />
}

const HP = () => (
    <Image
        source={require('../../assets/images/hp_store.png')}
        style={{ width: 50, height: 40.97 }}
    />
)

const Pack = () => (
    <Image
        source={require('../../assets/images/premium_pack.png')}
        style={{ width: 50, height: 26.1 }}
    />
)

const Pub = () => (
    <Image
        source={require('../../assets/images/no_pub.png')}
        style={{ width: 50, height: 47.76 }}
    />
)

export default () => {
    const user = useAppSelector((state) => state.user)
    const navigation = useNavigation<NavProp>()
    const { width, height } = useWindowDimensions()
    const [selected, setSelected] = useState<ISelected | null>(null)
    const [open, setOpen] = useState(false)
    // const [icon, setIcon] = useState(require('../../assets/images/indice.png'))
    const [title, setTitle] = useState(`Acheter 1`)
    const [label, setLabel] = useState(`xxxx`)
    const [quantity, setQuantity] = useState<number>(1)
    const [description, setDescription] = useState('')

    const onSelect = (data: ISelected) => {
        if (data && data.type) {
            setSelected(data)
            setOpen(true)
        }
    }

    const handleClose = () => {
        setSelected(null)
        setOpen(false)
    }

    const add = () => {
        let tmp = quantity
        if (tmp < 100) tmp += 1
        setQuantity(tmp)
    }

    const sub = () => {
        let tmp = quantity
        if (tmp > 1) tmp -= 1
        setQuantity(tmp)
    }

    const onOrder = async () => {
        if (selected && selected.type) {
            const data: CreateOrder = {
                ...selected,
                quantity,
                id_user: user.id,
            }
            const API = new OrderStore()
            const response = await API.Create(data)
            if (!response.canceled) {
                const { id_order } = response
                navigation.navigate('order', { id_order })
            }
        }
    }

    /* const getIcon = (type: string) => {
        switch (type) {
            case 'INDICE':
                return require('../../assets/images/indice.png')
            case 'PASSER':
                return require('../../assets/images/passer.png')
            case 'DOUBLE CHANCE':
                return require('../../assets/images/double_chance.png')
            case 'TEMPS':
                return require('../../assets/images/temps.png')
            case 'LETTRES':
                return require('../../assets/images/lettres.png')
            case '50/50':
                return require('../../assets/images/cinquante.png')
            default:
                return require('../../assets/images/indice.png')
        }
    } */

    const getBonusDesc = (type: string) => {
        switch (type) {
            case 'INDICE':
                return 'Le bonus INDICE te donne une indication vers la réponse.'
            case 'PASSER':
                return 'Le bonus PASSER te permet de passer une question qui sera comptée comme un point cadeau.'
            case 'DOUBLE CHANCE':
                return 'Le bonus DOUBLE CHANCE te permet de choisir 2 réponses, ainsi avoir une chance en plus pour trouver la bonne réponse.'
            case 'TEMPS':
                return 'Le bonus TEMPS te permet de gagner 30 secondes supplémentaire pour répondre à la question.'
            case 'LETTRES':
                return 'Le bonus LETTRES est disponible lors d’une question ouverte, et te permet d’afficher les premières lettres des mots de la réponse.'
            case '50/50':
                return 'Le bonus 50/50 est disponible lors d’une question à choix multiples, et te permet d’enlever 2 mauvaises réponses pour choisir la bonne réponse parmi 2 propositions.'
            default:
                return ''
        }
    }

    useEffect(() => {
        if (selected && selected.type) {
            switch (selected.type) {
                case 'bonus':
                    // const image = getIcon(selected.name as string)
                    const desc = getBonusDesc(selected.name as string)
                    // setIcon(image)
                    setDescription(desc)
                    setTitle(`Acheter 1 bonus ${selected.name}`)
                    setLabel(`bonus ${selected.name}`)
                    break
                case 'hp':
                    setDescription(
                        'Les vies sont utilisables pour le mode SOLO. Tu perds une vie quand tu as moins de 8 points sur un niveau, tu peux donc acheter des vies pour augmenter tes chances de passer le niveau !'
                    )
                    setTitle(`Acheter 1 VIE`)
                    setLabel(`VIE`)
                    break
                case 'pack':
                    setDescription(
                        'Le pack premium vous offres un exemplaire de tout les types de bonus existant.'
                    )
                    setTitle(`Acheter 1 PACK PREMIUM`)
                    setLabel(`PACK PREMIUM`)
                    break
                case 'pub':
                    setDescription(
                        `Profitez d'une expérience sans publicité en achetant le mode sans pub.`
                    )
                    setTitle(`Acheter 1 MODE SANS PUB`)
                    setLabel(`MODE SANS PUB`)
                    break
                default:
                    break
            }
        }
    }, [selected])

    const getPrice = () => {
        if (selected && selected.type) {
            switch (selected.type) {
                case 'bonus':
                    return '2,79 €'
                case 'hp':
                    return '1,79 €'
                case 'pack':
                    return '12,99 €'
                case 'pub':
                    return '9,99 €'
                default:
                    return '0 €'
            }
        }
        return '0 €'
    }

    const getIconImage = () => {
        if (selected && selected.type) {
            switch (selected.type) {
                case 'bonus':
                    return <Bonus type={selected.name as string} />
                case 'hp':
                    return <HP />
                case 'pack':
                    return <Pack />
                case 'pub':
                    return <Pub />
                default:
                    return null
            }
        }
        return null
    }

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <View style={Style.intro}>
                <Text style={Style.introText}>
                    Hey ! De quoi as-tu besoin ?
                </Text>
            </View>
            <View style={Style.bonusHpContainer}>
                <View style={Style.bloc}>
                    <BonusItem key="INDICE" type="INDICE" onSelect={onSelect} />
                    <BonusItem key="50/50" type="50/50" onSelect={onSelect} />
                    <BonusItem key="PASSER" type="PASSER" onSelect={onSelect} />
                </View>
                <View style={Style.bloc}>
                    <BonusItem key="TEMPS" type="TEMPS" onSelect={onSelect} />
                    <BonusItem
                        key="DOUBLE CHANCE"
                        type="DOUBLE CHANCE"
                        onSelect={onSelect}
                    />
                    <HpItem onSelect={onSelect} />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => onSelect({ type: 'pack' })}
                style={{ ...Style.pack, backgroundColor: '#1B2444' }}
            >
                <View style={Style.desc}>
                    <Text
                        style={{
                            textAlign: 'justify',
                            color: '#FFFFFF',
                            maxWidth: 163,
                        }}
                    >
                        PACK PREMIUM
                    </Text>
                    <View
                        style={{ ...Style.price, backgroundColor: '#FFFFFF' }}
                    >
                        <Text style={{ color: '#1B2444' }}>12,99 €</Text>
                    </View>
                </View>
                <Image
                    source={require('../../assets/images/premium_pack.png')}
                    style={{ width: 159, height: 83 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onSelect({ type: 'pub' })}
                style={{ ...Style.pack, backgroundColor: '#EBECF0' }}
            >
                <View style={Style.desc}>
                    <Text
                        style={{
                            textAlign: 'justify',
                            color: '#1B2444',
                            maxWidth: 163,
                        }}
                    >
                        ACHETER UN MODE SANS PUB
                    </Text>
                    <View
                        style={{ ...Style.price, backgroundColor: '#1B2444' }}
                    >
                        <Text style={{ color: '#FFFFFF' }}>9,99 €</Text>
                    </View>
                </View>
                <Image
                    source={require('../../assets/images/no_pub.png')}
                    style={{ width: 67, height: 64 }}
                />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                onRequestClose={handleClose}
            >
                <View
                    style={{
                        ...Style.healthModalWrapper,
                        minHeight: height,
                        maxHeight: height,
                        minWidth: width,
                        maxWidth: width,
                    }}
                >
                    <View style={Style.healthModal}>
                        <View style={Style.header}>
                            <View style={Style.titleContainer}>
                                <Icon
                                    name="shopping-cart-outline"
                                    height={24}
                                    width={24}
                                    fill="#1B2444"
                                />
                                <Text
                                    style={{
                                        color: '#1B2444',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {title}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleClose}
                                style={Style.exitButton}
                            >
                                <Icon
                                    name="close-outline"
                                    height={20}
                                    width={20}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.healthTextContainer}>
                            <View style={Style.description}>
                                <Text>{description}</Text>
                            </View>
                            <View style={Style.article}>
                                {getIconImage()}
                                <View style={Style.articleDetails}>
                                    <Text>{label}</Text>
                                    <Text style={Style.priceText}>
                                        {getPrice()}
                                    </Text>
                                </View>
                            </View>
                            <View style={Style.quantityWrapper}>
                                <View style={Style.quantity}>
                                    <TouchableOpacity
                                        onPress={sub}
                                        style={Style.items}
                                    >
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                    <View style={Style.items}>
                                        <Text>{quantity}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={add}
                                        style={Style.items}
                                    >
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={Style.healthButtons}>
                            <TouchableOpacity
                                onPress={onOrder}
                                style={{
                                    ...Style.Hbuttons,
                                    backgroundColor: '#1B2444',
                                }}
                            >
                                <Text style={{ color: '#FFFFFF' }}>
                                    ACHETER
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleClose}
                                style={Style.Hbuttons}
                            >
                                <Text style={{ color: '#1B2444' }}>
                                    ANNULER
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    bonusHpContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 354,
        maxWidth: 354,
        minHeight: 298,
        maxHeight: 298,
        marginVertical: 10,
    },
    bloc: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 144,
        maxHeight: 144,
        minWidth: 354,
        maxWidth: 354,
    },
    pack: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        minWidth: 354,
        maxWidth: 354,
        borderRadius: 10,
        minHeight: 115,
        maxHeight: 115,
        marginVertical: 10,
    },
    desc: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        minHeight: 75,
        maxHeight: 75,
        minWidth: 163,
        maxWidth: 163,
    },
    price: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minWidth: 56,
        maxWidth: 56,
        minHeight: 20,
        maxHeight: 20,
    },
    intro: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 354,
        maxWidth: 354,
        minHeight: 20,
        maxHeight: 20,
        marginVertical: 10,
    },
    introText: {
        color: '#1B2444',
        fontWeight: 'bold',
        fontSize: 15,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 340,
        maxWidth: 340,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    exitButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 40,
        maxWidth: 40,
        borderRadius: 20,
        backgroundColor: '#EBECF0',
    },
    healthModalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    healthModal: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-around',
        minWidth: 380,
        maxWidth: 380,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        minHeight: 441,
        maxHeight: 441,
    },
    healthTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 256,
        maxHeight: 256,
    },
    healthButtons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 100,
        maxHeight: 100,
    },
    Hbuttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 200,
        maxWidth: 200,
        borderRadius: 7,
    },
    article: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 340,
        maxWidth: 340,
    },
    articleDetails: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        minWidth: 290,
        maxWidth: 290,
        minHeight: 46,
        maxHeight: 46,
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    quantityWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350,
        maxWidth: 350,
        minHeight: 75,
        maxHeight: 75,
    },
    quantity: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 144,
        maxWidth: 144,
        minHeight: 45,
        maxHeight: 45,
        backgroundColor: '#EBECF0',
        borderRadius: 5,
    },
    items: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 48,
        maxWidth: 48,
        minHeight: 45,
        maxHeight: 45,
    },
    description: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minWidth: 340,
        maxWidth: 340,
        minHeight: 75,
        maxHeight: 75,
    },
})

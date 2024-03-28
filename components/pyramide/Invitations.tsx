import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    Image,
    SafeAreaView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Statut from '../sous-components/Statut'
import { Icon } from 'react-native-eva-icons'
import { COLORS } from '../../utiles/constantes'
import CheckBox from '@react-native-community/checkbox'
import { ScrollView } from 'react-native-gesture-handler'

interface IIProps {
    data: any
    friend?: boolean
}

const invitationList = [
    {
        actif: true,
        name: 'bibiholmes',
    },
]

const friendList = [
    {
        actif: true,
        name: 'Laulau4',
    },
    {
        actif: true,
        name: 'ArnaudK',
    },
    {
        actif: true,
        name: 'Jonathan',
    },
    {
        actif: true,
        name: 'Laulau4',
    },
    {
        actif: true,
        name: 'ArnaudK',
    },
    {
        actif: true,
        name: 'Jonathan',
    },
    {
        actif: true,
        name: 'ArnaudK',
    },
    {
        actif: true,
        name: 'Jonathan',
    },
]

const Item = ({ data, friend }: IIProps) => {
    // const User = useSelector((state: any) => state.user)

    // const onRejoindre = () => {
    //     navigation.navigate('confirmrejoindre', {
    //         data: data,
    //     })
    // }
    const [value, setValue] = useState(false)
    const onFight = async () => {
        console.log('supprimer invitation')
    }

    return (
        <View style={Style.item}>
            <View style={Style.player}>
                <Statut size={10} actif={data.actif} />
                <Text>{`  ${data.name}`}</Text>
            </View>
            {friend ? (
                <CheckBox
                    value={value}
                    onValueChange={(newValue) => setValue(newValue)}
                />
            ) : (
                <View style={Style.playerAction}>
                    <TouchableOpacity
                        style={{
                            ...Style.playerActionButton,
                            minWidth: 140,
                            maxWidth: 140,
                            minHeight: 40,
                            maxHeight: 40,
                        }}
                    >
                        <Text style={Style.buttonFight}>{` JOUER `}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onFight}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 40,
                            maxWidth: 40,
                            minHeight: 40,
                            maxHeight: 40,
                        }}
                    >
                        <Icon
                            name="close-outline"
                            height={35}
                            width={35}
                            fill="#CC317C"
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default () => {
    const [search, setSearch] = useState('')
    const [friendSearch, setFriendSearch] = useState(friendList)

    function recherche(value: string) {
        let newList: any[] = []
        for (let i = 0; i < friendList.length; i++) {
            const element = friendList[i]
            if (element.name.includes(value)) newList = [...newList, element]
        }
        return setFriendSearch(newList)
    }

    useEffect(() => {
        recherche(search)
        console.log('friendSearch', friendSearch)
    }, [search])
    return (
        <View style={Style.container}>
            <View style={Style.titleContainer}>
                <Text style={Style.title}>INVITATIONS RECUES</Text>
            </View>
            <View style={Style.invitationList}>
                <FlatList
                    data={invitationList}
                    keyExtractor={(item, index) => `duel${index}`}
                    renderItem={({ item }) => <Item data={item} />}
                />
            </View>
            <View style={Style.infoLancer}>
                <Text
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}
                >
                    Lance une partie en séléctionnant 8 joueurs max.
                </Text>
            </View>
            <View style={{ ...Style.titleContainer, borderBottomWidth: 0 }}>
                <Text style={Style.title}>AMIS CONNECTES</Text>
            </View>
            <SafeAreaView style={Style.recherche}>
                <TextInput
                    value={search}
                    placeholder="rechercher un ami"
                    onChangeText={(text) => setSearch(text)}
                    style={Style.inputText}
                />
                <Image
                    source={require('../../assets/images/search.png')}
                    style={{ width: 20, height: 20 }}
                />
            </SafeAreaView>

            <ScrollView style={Style.friendList}>
                {friendSearch.map((item, index) => (
                    <Item data={item} friend={true} key={index} />
                ))}
            </ScrollView>
            <View>
                <TouchableOpacity style={Style.btnJouer}>
                    <Text style={{ fontSize: 16, color: '#ffffff' }}>
                        JOUER
                    </Text>
                    <Image
                        source={require('../../assets/images/arrow_right_alt.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'scroll',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 15,
        minHeight: 40,
        maxHeight: 40,
        minWidth: 375,
        maxWidth: 375,
        borderBottomWidth: 2,
        borderColor: '#1B2444',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    invitationList: {
        alignItems: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerAction: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    playerActionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#31CCC0',
    },
    buttonFight: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    infoLancer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
        marginTop: 30,
        justifyContent: 'space-between',
        backgroundColor: COLORS.very_light_primary,
        borderRadius: 10,
    },
    recherche: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        backgroundColor: COLORS.very_light_primary,
        borderRadius: 10,
    },
    inputText: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        minWidth: 300,
        maxWidth: 300,
    },
    friendList: {
        flex: 1,
        overflow: 'scroll',
    },
    btnJouerContainer: {
        flex: 1,
        minWidth: 375,
        maxWidth: 375,
        minHeight: 80,
        maxHeight: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnJouer: {
        minWidth: 160,
        maxWidth: 160,
        height: 50,
        backgroundColor: COLORS.light_primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10,
    },
})

import React, { useState } from 'react'
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native'
import { getByCode } from '../../services/factory/Friends'

export default () => {
    const [search1, setSearch1] = useState('')
    const [search2, setSearch2] = useState('')
    const [search3, setSearch3] = useState('')
    const [search4, setSearch4] = useState('')
    const [search5, setSearch5] = useState('')
    const [search6, setSearch6] = useState('')
    const [search7, setSearch7] = useState('')
    const [search8, setSearch8] = useState('')
    const [search9, setSearch9] = useState('')
    const [target, setTarget] = useState<any>(null)

    const onSend = () => {
        const result = getByCode(
            `${search1}${search2}-${search3}${search4}${search5}-${search6}${search7}${search8}${search9}`
        )
        if (result) setTarget(result)
        else setTarget(null)

        console.log(target)
    }

    return (
        <View style={Style.container}>
            <View style={Style.label}>
                <Text>{'Ajouter un ami avec son '}</Text>
                <Text style={Style.span}>code:</Text>
            </View>
            <View style={Style.inputContainer}>
                <View style={Style.input}>
                    <TextInput
                        onChangeText={setSearch1}
                        value={search1}
                        style={Style.inputText}
                        maxLength={1}
                    />
                    <TextInput
                        onChangeText={setSearch2}
                        value={search2}
                        style={Style.inputText}
                        maxLength={1}
                    />
                    <Text>-</Text>
                    <TextInput
                        onChangeText={setSearch3}
                        value={search3}
                        style={Style.inputText}
                        maxLength={1}
                    />
                    <TextInput
                        onChangeText={setSearch4}
                        value={search4}
                        style={Style.inputText}
                        maxLength={1}
                    />
                    <TextInput
                        onChangeText={setSearch5}
                        value={search5}
                        style={Style.inputText}
                        maxLength={1}
                    />
                    <Text>-</Text>
                    <TextInput
                        onChangeText={setSearch6}
                        value={search6}
                        style={Style.inputText}
                        maxLength={1}
                    />
                    <TextInput
                        onChangeText={setSearch7}
                        value={search7}
                        style={Style.inputText}
                        maxLength={1}
                    />
                    <TextInput
                        onChangeText={setSearch8}
                        value={search8}
                        style={Style.inputText}
                        maxLength={1}
                    />
                    <TextInput
                        onChangeText={setSearch9}
                        value={search9}
                        style={Style.inputText}
                        maxLength={1}
                    />
                    <TouchableOpacity onPress={onSend} style={Style.search}>
                        <Image
                            source={require('../../assets/images/add2.png')}
                            style={Style.addIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        minWidth: 375,
        maxWidth: 375,
    },
    label: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 375,
        maxWidth: 375,
    },
    span: {
        color: '#CC317C',
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        maxHeight: 50,
        minWidth: 375,
        maxWidth: 375,
    },
    inputText: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        minWidth: 30,
        maxWidth: 30,
        borderWidth: 0,
        borderRadius: 5,
        marginHorizontal: 2,
        backgroundColor: '#EBECF0',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    search: {
        flex: 1,
        minHeight: 50,
        maxHeight: 50,
        minWidth: 30,
        maxWidth: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    addIcon: {
        height: 13,
        width: 20,
    },
})

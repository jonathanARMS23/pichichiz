import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-eva-icons'

interface ILabel {
    labelText: string
    required: boolean
    width: number
}

interface IProps extends ILabel {
    label: boolean
    icon: boolean
    iconName: string
    placeholder: string
    value: string
    onChangeText: any
    secure: boolean
    bottomOnly?: boolean
}

const Label = ({ labelText, required, width }: ILabel) => (
    <View style={{ ...Style.label, minWidth: width, maxWidth: width }}>
        <Text>{labelText}</Text>
        {required ? <Text style={Style.required}> * </Text> : null}
    </View>
)

export default ({
    label,
    labelText,
    required,
    icon,
    iconName,
    width,
    placeholder,
    value,
    onChangeText,
    secure,
    bottomOnly,
}: IProps) => {
    const [hidden, setHidden] = useState(secure)

    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            {label ? (
                <Label
                    labelText={labelText}
                    required={required}
                    width={width}
                />
            ) : null}
            <View
                style={{
                    ...Style.inputGroup,
                    minWidth: width,
                    maxWidth: width,
                    borderWidth: bottomOnly ? 0 : 1,
                    borderBottomWidth: 1,
                }}
            >
                {icon ? (
                    <View style={Style.iconContainer}>
                        <Icon
                            name={iconName}
                            height={20}
                            width={20}
                            fill="#C3C3C3"
                        />
                    </View>
                ) : null}
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    onChangeText={(text) => onChangeText(text)}
                    secureTextEntry={hidden}
                    style={{
                        ...Style.input,
                        minWidth: width - 50,
                        maxWidth: width - 50,
                    }}
                />
                {secure ? (
                    <TouchableOpacity
                        style={Style.iconContainer}
                        onPress={() => setHidden(!hidden)}
                    >
                        <Icon
                            name={hidden ? 'eye-outline' : 'eye'}
                            height={20}
                            width={20}
                            fill="#1B2444"
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 70,
        maxHeight: 70,
        marginVertical: 10,
    },
    label: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 30,
        maxHeight: 30,
    },
    required: {
        color: '#ff0000',
    },
    inputGroup: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderColor: '#1B2444',
        borderRadius: 10,
        minHeight: 50,
        maxHeight: 50,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    input: {
        borderWidth: 0,
        backgroundColor: '#FFFFFF',
        minHeight: 40,
        maxHeight: 40,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        maxHeight: 40,
        minWidth: 20,
        maxWidth: 20,
        backgroundColor: '#FFFFFF',
    },
})

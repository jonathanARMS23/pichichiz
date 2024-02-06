import React from 'react'
import RNPickerSelect, { Item } from 'react-native-picker-select'

interface IProps {
    items: Item[]
    value: any
    setValue: Function
    width: number
    height: number
    backgroundColor: string
}

export default ({
    items,
    value,
    setValue,
    width,
    height,
    backgroundColor,
}: IProps) => (
    <RNPickerSelect
        value={value}
        onValueChange={(newvalue) => setValue(newvalue)}
        items={items}
        style={{
            viewContainer: {
                width,
                height,
                backgroundColor,
                borderRadius: 10,
            },
            inputAndroid: {
                textAlign: 'center',
                width,
                height,
            },
        }}
    />
)

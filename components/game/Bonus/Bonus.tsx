/* eslint-disable no-restricted-syntax */
import React from 'react'
import { View, FlatList, useWindowDimensions, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { IBonus } from '../../../services/models/Bonus'
import BonusItem from './BonusItem'

interface IProps {
    onUse: any
    noFifty?: boolean
    noPass?: boolean
}

export default ({ onUse, noFifty, noPass }: IProps) => {
    const { width } = useWindowDimensions()
    const bonus = useSelector((state: any) => state.bonus)
    const { list } = bonus as IBonus
    return (
        <View style={{ ...Style.container, minWidth: width, maxWidth: width }}>
            <FlatList
                horizontal
                data={list}
                keyExtractor={(item, index) => `bonus${index}`}
                renderItem={({ item }) => (
                    <BonusItem
                        data={item}
                        onUse={onUse}
                        noFifty={noFifty}
                        noPass={noPass}
                    />
                )}
            />
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 100,
        maxHeight: 100,
        backgroundColor: '#1B2444',
    },
})

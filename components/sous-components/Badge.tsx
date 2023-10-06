import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface IBadge {
    value: number
    height: number
    width: number
    badgeDimension: number
    fontSize: number
}

export default ({ value, height, width, badgeDimension, fontSize }: IBadge) => (
    <View
        style={{
            ...Style.badge,
            minHeight: height,
            maxHeight: height,
            minWidth: width,
            maxWidth: width,
        }}
    >
        <View
            style={{
                ...Style.badgeContainer,
                minHeight: badgeDimension,
                maxHeight: badgeDimension,
                minWidth: badgeDimension,
                maxWidth: badgeDimension,
                borderRadius: badgeDimension / 2,
                marginTop: -(badgeDimension / 2),
                marginRight: -(badgeDimension / 2),
            }}
        >
            <Text
                style={{
                    ...Style.badgeText,
                    fontSize,
                    minHeight: badgeDimension,
                    maxHeight: badgeDimension,
                    minWidth: badgeDimension,
                    maxWidth: badgeDimension,
                }}
            >
                {value}
            </Text>
        </View>
    </View>
)

const Style = StyleSheet.create({
    badge: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        position: 'absolute',
    },
    badgeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    badgeText: {
        minHeight: 14,
        maxHeight: 14,
        minWidth: 14,
        maxWidth: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 9,
        fontWeight: 'bold',
    },
})

import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import Header from './signin/Header'
import Form from './signin/Form'
// import Social from './sous-components/Social'

export default () => (
    <View
        style={{
            ...Style.container,
            paddingVertical: Platform.OS === 'ios' ? 35 : 0,
        }}
    >
        <Header />
        {/** <Social authType="signin" /> */}
        <Form />
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
})

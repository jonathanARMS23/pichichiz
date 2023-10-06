import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import Header from './signup/Header'
import Form from './signup/Form'
// import Social from './sous-components/Social'

export default () => (
    <View style={Style.container}>
        <ScrollView>
            <Header />
            {/** <Social authType="signup" /> */}
            <Form />
        </ScrollView>
    </View>
)

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
})

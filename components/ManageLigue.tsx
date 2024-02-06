import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Banner from './manageligue/Banner'
import Header from './mode/Header'
import Form from './manageligue/Form'
import Invitations from './manageligue/Invitations'
import Code from './manageligue/Code'

export default () => {
    const [step, setSteps] = useState(1)
    const [ligue, setLigue] = useState(1)
    const [code, setCode] = useState('CMLK4G56')

    return (
        <View style={Style.container}>
            <Header />
            <Banner />
            {step === 1 && (
                <Form
                    setSteps={setSteps}
                    setLigue={setLigue}
                    setCode={setCode}
                />
            )}
            {step === 2 && <Invitations setSteps={setSteps} ligue_id={ligue} />}
            {step === 3 && <Code code={code} />}
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})

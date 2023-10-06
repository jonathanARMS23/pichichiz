import React, { useState, useEffect } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

interface IProps {
    rate: number
}

const defaultWidth = 50
const defaultHeight = 25

const LeftStars = () => (
    <View style={Style.leftStars}>
        <Image
            source={require('../../assets/images/left_stars_1.png')}
            style={{ marginLeft: 5 }}
        />
        <Image source={require('../../assets/images/left_stars_2.png')} />
        <Image
            source={require('../../assets/images/left_stars_3.png')}
            style={{ marginLeft: 2 }}
        />
    </View>
)

const RightStars = () => (
    <View style={Style.rightStars}>
        <Image source={require('../../assets/images/right_stars_1.png')} />
        <Image
            source={require('../../assets/images/right_stars_2.png')}
            style={{ marginRight: 4 }}
        />
    </View>
)

/**
 * if rate >= 8 then color => #31CCC0
 * if rate <= 6 then color => #CC317C
 * if rate == 10 then color => #CC317C + stars
 * width : 47
 * height : 30
 */
export default ({ rate }: IProps) => {
    const [color, setColor] = useState('')
    const [stars, setStars] = useState(false)
    const [completed, setCompleted] = useState(0)
    const [rest, setRest] = useState(defaultWidth)

    useEffect(() => {
        if (rate === 10) {
            setStars(true)
            setColor('')
        }
    }, [])

    /** color configuration */

    useEffect(() => {
        if (rate === 10) setStars(true)
        else setStars(false)
        if (rate >= 8) setColor('#31CCC0')
        if (rate < 8) setColor('#CC317C')
    }, [rate])

    useEffect(() => {
        // calculate the completed bar width
        const loaded = (rate * defaultWidth) / 10
        const waiting = defaultWidth - loaded
        setCompleted(loaded)
        setRest(waiting)
    }, [])

    return (
        <View style={Style.container}>
            <View style={Style.bar}>
                <View
                    style={{
                        ...Style.loadingBar,
                        minWidth: completed,
                        maxWidth: completed,
                        backgroundColor: color,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: rate === 10 ? 10 : 0,
                        borderBottomRightRadius: rate === 10 ? 10 : 0,
                    }}
                ></View>
                <View
                    style={{
                        ...Style.loadingBar,
                        minWidth: rest,
                        maxWidth: rest,
                        backgroundColor: '#EBECF0',
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderTopLeftRadius: rate === 0 ? 10 : 0,
                        borderBottomLeftRadius: rate === 0 ? 10 : 0,
                    }}
                ></View>
            </View>
            <View style={Style.content}>
                {stars ? <LeftStars /> : null}
                <Text
                    style={{
                        ...Style.rate,
                        minWidth:
                            rate === 10 ? defaultWidth - 20 : defaultWidth,
                        maxWidth:
                            rate === 10 ? defaultWidth - 20 : defaultWidth,
                    }}
                >{`${rate}/10`}</Text>
                {stars ? <RightStars /> : null}
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: defaultHeight,
        maxHeight: defaultHeight,
        minWidth: defaultWidth,
        maxWidth: defaultWidth,
        borderRadius: 10,
        position: 'relative',
        alignSelf: 'flex-end',
    },
    leftStars: {
        flex: 1,
        justifyContent: 'space-between',
        minHeight: 30,
        maxHeight: 30,
        minWidth: 10,
        maxWidth: 10,
    },
    rightStars: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        minHeight: defaultHeight,
        maxHeight: defaultHeight,
        minWidth: 10,
        maxWidth: 10,
    },
    bar: {
        flex: 1,
        flexDirection: 'row',
        minHeight: defaultHeight,
        maxHeight: defaultHeight,
        minWidth: defaultWidth,
        maxWidth: defaultWidth,
        borderRadius: 10,
    },
    loadingBar: {
        flex: 1,
        minHeight: defaultHeight,
        maxHeight: defaultHeight,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: defaultHeight,
        maxHeight: defaultHeight,
        minWidth: defaultWidth,
        maxWidth: defaultWidth,
        borderRadius: 10,
        position: 'absolute',
    },
    rate: {
        fontSize: 9,
        textAlign: 'center',
    },
})

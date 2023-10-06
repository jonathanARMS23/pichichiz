import React from 'react'
import {
    View,
    ScrollView,
    FlatList,
    useWindowDimensions,
    StyleSheet,
} from 'react-native'
import Level from './Level'

interface IProps {
    data: Array<any>
}

export default ({ data }: IProps) => {
    const { width } = useWindowDimensions()

    return (
        <View
            style={{
                ...Style.container,
                minWidth: width,
            }}
        >
            <ScrollView style={{ minWidth: width }} horizontal>
                <FlatList
                    data={data}
                    numColumns={4}
                    keyExtractor={(item, index) => `level${index}`}
                    renderItem={({ item }) => (
                        <Level
                            level={item.level}
                            rate={item.score}
                            locked={item.locked}
                        />
                    )}
                    style={{ minWidth: width - 10, maxWidth: width - 10 }}
                />
            </ScrollView>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})

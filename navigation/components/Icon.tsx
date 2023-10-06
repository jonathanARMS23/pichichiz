import React, { useEffect } from 'react'
import { Image } from 'react-native'

interface IProps {
    type: any
    size: number
    focused: boolean
}

const images = {
    main: require('../../assets/images/widget.png'),
    mainFocused: require('../../assets/images/widget2.png'),
    profil: require('../../assets/images/profil.png'),
    profilFocused: require('../../assets/images/profil2.png'),
    store: require('../../assets/images/bag.png'),
    friend: require('../../assets/images/friend.png'),
    friendFocused: require('../../assets/images/friend2.png'),
    reward: require('../../assets/images/reward.png'),
    rewardFocused: require('../../assets/images/reward2.png'),
}

export default ({ type, size, focused }: IProps) => {
    useEffect(() => {
        console.log(type, focused)
    }, [])

    switch (type) {
        case 'main':
            return (
                <Image
                    source={focused ? images.mainFocused : images.main}
                    style={{ height: size, width: size }}
                />
            )
        case 'profil':
            return (
                <Image
                    source={focused ? images.profilFocused : images.profil}
                    style={{ height: size, width: size }}
                />
            )
        case 'store':
            return (
                <Image
                    source={focused ? images.store : images.store}
                    style={{ height: size, width: size }}
                />
            )
        case 'friends':
            return (
                <Image
                    source={focused ? images.friendFocused : images.friend}
                    style={{ height: size, width: size }}
                />
            )
        case 'reward':
            return (
                <Image
                    source={focused ? images.rewardFocused : images.reward}
                    style={{ height: size, width: size }}
                />
            )
        default:
            return (
                <Image
                    source={focused ? images.mainFocused : images.main}
                    style={{ height: size, width: size }}
                />
            )
    }
}

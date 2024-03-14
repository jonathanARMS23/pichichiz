import { NavigatorScreenParams } from '@react-navigation/native'

export type FriendStackParams = {
    manage: {
        option: number
    }
    add: undefined
    scan: undefined
    share: undefined
}

export type StoreStackParams = {
    storemain: undefined
    order: {
        id_order: number | string
    }
}

export type OnlineStackParams = {
    online: undefined
    root: undefined
}

export type MainTabParams = {
    main: NavigatorScreenParams<OnlineStackParams>
    reward: undefined
    profil: undefined
    store: NavigatorScreenParams<StoreStackParams>
    friends: NavigatorScreenParams<FriendStackParams>
}

export type RootStackParams = {
    room: NavigatorScreenParams<MainTabParams>
    home: undefined
    launch: undefined
    signin: undefined
    signup: undefined
    confirmation: undefined
    noaccess: undefined
    solo: undefined
    duel: undefined
    ligue: undefined
    liguedetails: {
        code: string
    }
    manageligue: undefined
    notification: undefined
    duelfinished: undefined
    bilan: undefined
    duelgame: {
        id_duel: number | string
        id_serie: number | string
    }
    sologame: {
        level: number
    }
    results: {
        id_duel: number | string
        id_serie: number | string
    }
}

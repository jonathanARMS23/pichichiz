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

export type MainStackParams = {
    online: undefined
    root: undefined
}

export type MainTabParams = {
    main: NavigatorScreenParams<MainStackParams>
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
        name: string
    }
    liguegame: {
        data?: object
    }
    invitationrejoindre: undefined
    confirmrejoindre: {
        data?: object
        code?: string
    }
    liguesettings: undefined
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

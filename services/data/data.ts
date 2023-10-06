import USER from './user.json'
import FRIENDS from './friends.json'
import PLAYERS from './fakeplayer.json'
import SOLO from './solo.json'
import BONUS from './bonus.json'
import PALIER from './palier.json'

interface IUserAuth {
    email: string
    password: string
}

export const getUser = () => USER

export const fakeAuth = (data: IUserAuth) =>
    data.email === USER.email && data.password === USER.password

export const getFriends = () => FRIENDS.friends

export const getAsks = () => FRIENDS.asks

export const getPlayers = () => PLAYERS.players

export const getRoadmap = () => SOLO.roadmap

export const getBonusData = () => BONUS.bonus

export const getPalier = () => PALIER.list

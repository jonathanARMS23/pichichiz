import { getPlayers } from '../data/data'

const compareFirstChart = (letter: string, text: string) => {
    if (
        text.length > 0 &&
        text[0].toLocaleLowerCase() === letter.toLocaleLowerCase()
    )
        return true

    return false
}

export const formatFriendsList = (data: Array<any>) => {
    const actifs = data.filter((el: any) => el.actif)
    const idles = data.filter((el: any) => !el.actif)
    const alphabet = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ]
    let result = []
    result.push({
        title: 'AMIS CONNECTES',
        data: actifs,
    })
    const formated = alphabet.map((item: string) => ({
        title: item,
        data: idles.filter((el: any) => compareFirstChart(item, el.pseudo)),
    }))

    const filtered = formated.filter((el: any) => el.data.length !== 0)

    result = [...result, ...filtered]

    return result
}

export const reformatFriendsList = (data: Array<any>) => {
    const alphabet = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ]
    const formated = alphabet.map((item: string) => ({
        title: item,
        data: data.filter((el: any) => compareFirstChart(item, el.pseudo)),
    }))

    const filtered = formated.filter((el: any) => el.data.length !== 0)

    return filtered
}

export const reformatFriendsListForDuel = (
    data: Array<any>,
    duel: Array<any>
) => {
    const alphabet = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ]
    const notInDuel = data.filter(
        (el: any) => !duel.find((item: any) => item.pseudo_vs === el.pseudo)
    )

    const formated = alphabet.map((item: string) => ({
        title: item,
        data: notInDuel.filter((el: any) => compareFirstChart(item, el.pseudo)),
    }))

    const filtered = formated.filter((el: any) => el.data.length !== 0)

    return filtered
}

export const formatAsksList = (data: Array<any>) => {
    const sended = data.filter((el: any) => el.send)
    const received = data.filter((el: any) => !el.send)
    const result = [
        {
            title: `ILS M'ONT AJOUTES`,
            data: received,
        },
        {
            title: `J'AI ENVOYE UNE DEMANDE D'AJOUT`,
            data: sended,
        },
    ]

    return result
}

export const getFacebookFriends = () => {
    const players = getPlayers()
    return players.filter((el) => el.facebook)
}

export const getByCode = (code: string) => {
    const players = getPlayers()
    return players.find((el) => el.code === code)
}

export const searchByPseudo = (text: string) => {
    const players = getPlayers()
    return players.filter((el) => el.pseudo.indexOf(text) !== -1)
}

export const searchByEmail = (email: string) => {
    const players = getPlayers()
    return players.find((el) => el.email === email)
}

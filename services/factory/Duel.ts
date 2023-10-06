/* eslint-disable prefer-destructuring */
import moment from 'moment'
import 'moment/locale/fr'

moment.locale('fr')

export const formatSerieResult = (series: Array<any>) => {
    const list: Array<any> = []
    for (let i = 0; i < 5; i + 1) {
        if (
            series[i] &&
            series[i].score_player2 !== null &&
            series[i].score_player1 !== null
        ) {
            if (
                parseInt(`${series[i].score_player1}`, 10) >
                parseInt(`${series[i].score_player2}`, 10)
            )
                list.push({
                    serie: i,
                    winner: 1,
                })
            else if (
                parseInt(`${series[i].score_player1}`, 10) ===
                parseInt(`${series[i].score_player2}`, 10)
            )
                list.push({
                    serie: i,
                    winner: 3,
                })
            else
                list.push({
                    serie: i,
                    winner: 2,
                })
        } else
            list.push({
                serie: i,
                winner: null,
            })
    }

    return list
}

export const getRandomNumberBetween = (x: number, y: number) => {
    if (y <= x) {
        throw new Error('La valeur de y doit être supérieure à x.')
    }

    // Calculer la plage entre x et y (inclus)
    const range = y - x + 1

    // Générer un nombre aléatoire entre 0 et la plage
    const randomOffset = Math.floor(Math.random() * range)

    // Ajouter l'offset au minimum (x) pour obtenir un nombre aléatoire dans la plage spécifiée
    const randomNumber = x + randomOffset

    return randomNumber
}

export const extractStadiumQuestion = (data: any) => {
    if (!data || !data.quizz_description) return null
    const description = data.quizz_description.data ?? data.quizz_description
    if (!description) return null
    let club1: string | null = null
    let club2: string | null = null
    let stadium: string | null = null
    let country: string | null = null
    let round: string | null = null
    let date: string | null = null
    if (Array.isArray(description.club) && description.club.length > 1) {
        club1 = description.club[0]
        club2 = description.club[1]
    }

    if (description.stadium && description.stadium.stadium_name)
        stadium = description.stadium.stadium_name

    if (description.stadium && description.stadium.country_name)
        country = description.stadium.country_name

    if (description.game && description.game.round)
        round = description.game.round

    if (description.game && description.game.date)
        date = moment(description.game.date).format('DD MMMM YYYY')

    if (!stadium || !round || !date) return null

    if (!club2)
        return `Combien il y avait-il de spectateurs au stade ${stadium} lors de la ${round.toLowerCase()} du ${date} en ${country} ?`

    return `Combien il y avait-il de spectateurs au stade ${stadium} lors de la ${round.toLowerCase()} du ${date} en ${country}, opposant ${club1} à ${club2} ?`
}

export const extractGoalsQueston = (data: any) => {
    if (!data || !data.quizz_description) return null
    const description = data.quizz_description.data ?? data.quizz_description
    if (!description) return null
    const woman = parseInt(`${description.woman}`, 10) === 1
    if (woman)
        return `Combien de buts ${description.first_name} ${description.last_name} a-t elle marqué ?`

    return `Combien de buts ${description.first_name} ${description.last_name} a-t il marqué ?`
}

export const extractRightResponse = (data: any) => {
    if (!data || !data.quizz_response) return null
    return data.quizz_response
}

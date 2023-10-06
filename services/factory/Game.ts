/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { verify, castArray } from './factory'
import { ICareer } from '../models/User'

const shuffleArray = (array: Array<any>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
    }
    return array
}

export const extractQuestionData = (data: any) => {
    const description = data.quizz_description
    if (data && Array.isArray(description)) return description
    if (data && description && verify(description.data))
        if (Array.isArray(description.data)) return description.data
        else return description.data
    if (data && verify(description)) return description
    return null
}

export const extractResponseData = (data: any) => {
    const choice = data.quizz_response_choice
    if (data && verify(choice)) {
        const responses = castArray(choice)
        const formated = shuffleArray(responses)
        return formated
    }
    return null
}

export const rightResponse = (data: any) => {
    const right = data.quizz_response
    if (data && verify(right)) return right
    return null
}

export const extractQuestion = (data: any) => {
    const question = data.Title
    if (data && verify(question)) return question
    return null
}

export const extractFormation = (data: Array<any>) => {
    const initFormation = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ]
    for (const el of data) {
        initFormation[el.tactical_position - 1] = el
    }
    initFormation.reverse()
    return initFormation
}

export const InitSologameRoadmap = (career: Array<ICareer>) => {
    const roadmap = []
    const passed = career.length
    for (let i = 0; i < 400; i++) {
        if (i < passed) {
            roadmap.push({
                level: i + 1,
                locked: false,
                score: career[i].score,
            })
        } else {
            roadmap.push({
                level: i + 1,
                locked: true,
                score: 0,
            })
        }
    }
    return roadmap
}

export const formatDateInPalmares = (date: string) => {
    if (date.includes('maintenant')) {
        const splits = date.split('-')
        const end = 'maintenant'
        const startSplits = splits[0].split('/')
        const start = startSplits[2]
        return `${start} - ${end}`
    }
    const splits = date.split(' - ')
    const startSplits = splits[0].split('/')
    const start = startSplits[2]
    const endSplits = splits[1].split('-')
    const end = endSplits[2]
    return `${start} - ${end}`
}

export const extractClubTypeSeason = (data: string) => {
    const list = extractQuestionData(data)
    if (list) {
        const { season } = list[0]
        return `Quel est ce club qui avait cette équipe type lors de la saison ${season} ?`
    }

    return 'Quel est ce club ?'
}

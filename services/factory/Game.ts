/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import moment from 'moment'
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

export const IsNationalTeam = (data: any) => {
    const description = data.quizz_description
    if (!data || !description || !description.national_team) return false
    if (`${description.national_team}` === '1') return true
    return false
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

export const extractClubTypeSeason = (data: any) => {
    const list = extractQuestionData(data)
    if (Array.isArray(list) && list.length > 0) {
        const { season } = list[0]
        if (!season) return `Quel est ce club qui avait cette équipe type ?`
        return `Quel est ce club qui avait cette équipe type lors de la saison ${season} ?`
    }

    return 'Quel est ce club ?'
}

export const extractClubTransfertQuestion = (data: any) => {
    const info = extractQuestionData(data)
    if (info.id) {
        if (info.transfert && info.transfert.arrival_date)
            return `Dans quel club a été transféré ${info.text} le ${moment(
                info.transfert.arrival_date
            ).format('DD MMMM YYYY')} ?`
        return `Dans quel club a été transféré ${info.text} ?`
    }

    return 'Dans quel club ce joueur a été transféré ?'
}

export const extractPlayerByRecordQuestion = (data: any) => {
    const info = extractQuestionData(data)
    if (info.record && info.record.record_title) {
        const { record } = info
        if (record.competition) {
            const { competition } = record
            if (record.date)
                return `Qui a battu le record du ${record.record_title} en ${competition.competition_name} pendant l'année ${record.date} ?`
            return `Qui a battu le record du ${record.record_title} en ${competition.competition_name} ?`
        }
        if (record.date)
            return `Qui a battu le record du ${record.record_title} pendant l'année ${record.date} ?`
        return `Qui a battu le record du ${record.record_title} ?`
    }

    return ''
}

const pays = [
    "de l'Afghanistan",
    "de l'Afrique du Sud",
    "de l'Albanie",
    "de l'Algérie",
    "de l'Allemagne",
    "de l'Andorre",
    "de l'Angola",
    "d'Antigua-et-Barbuda",
    "de l'Arabie saoudite",
    "de l'Argentine",
    "de l'Arménie",
    "de l'Australie",
    "de l'Autriche",
    "de l'Azerbaïdjan",
    'des Bahamas',
    'du Bahreïn',
    'du Bangladesh',
    'de la Barbade',
    'de la Belgique',
    'du Belize',
    'du Bénin',
    'du Bhoutan',
    'de la Biélorussie',
    'de la Birmanie',
    'de la Bolivie',
    'de la Bosnie-Herzégovine',
    'du Botswana',
    'du Brésil',
    'du Brunei',
    'de la Bulgarie',
    'du Burkina Faso',
    'du Burundi',
    'du Cabo Verde',
    'du Cambodge',
    'du Cameroun',
    'du Canada',
    'de la Centrafrique',
    'du Chili',
    'de la Chine',
    'de Chypre',
    'de la Colombie',
    'des Comores',
    'du Congo',
    'de la Corée du Nord',
    'de la Corée du Sud',
    'du Costa Rica',
    "de la Côte d'Ivoire",
    'de la Croatie',
    'de Cuba',
    'du Danemark',
    'de Djibouti',
    'de la Dominique',
    "de l'Égypte",
    'des Émirats arabes unis',
    "de l'Équateur",
    "de l'Érythrée",
    "de l'Espagne",
    "de l'Estonie",
    'des États-Unis',
    "de l'Éthiopie",
    'des Fidji',
    'de la Finlande',
    'de la France',
    'du Gabon',
    'de la Gambie',
    'de la Géorgie',
    'du Ghana',
    'de la Grèce',
    'de la Grenade',
    'du Guatemala',
    'de la Guinée',
    'de la Guinée-Bissau',
    'de la Guinée équatoriale',
    'du Guyana',
    "d'Haïti",
    'du Honduras',
    'de la Hongrie',
    'des Îles Marshall',
    'des Îles Salomon',
    "de l'Inde",
    "de l'Indonésie",
    "de l'Irak",
    "de l'Iran",
    "de l'Irlande",
    "de l'Islande",
    "d'Israël",
    "de l'Italie",
    'de la Jamaïque',
    'du Japon',
    'de la Jordanie',
    'du Kazakhstan',
    'du Kenya',
    'du Kirghizistan',
    'de Kiribati',
    'du Koweït',
    'du Laos',
    'du Lesotho',
    'de la Lettonie',
    'du Liban',
    'du Libéria',
    'de la Libye',
    'du Liechtenstein',
    'de la Lituanie',
    'du Luxembourg',
    'de la Macédoine du Nord',
    'de Madagascar',
    'de la Malaisie',
    'du Malawi',
    'des Maldives',
    'du Mali',
    'de Malte',
    'du Maroc',
    "de l'île Maurice",
    'de la Mauritanie',
    'du Mexique',
    'des États fédérés de Micronésie',
    'de la Moldavie',
    'de Monaco',
    'de la Mongolie',
    'du Monténégro',
    'du Mozambique',
    'de la Namibie',
    'de Nauru',
    'du Népal',
    'du Nicaragua',
    'du Niger',
    'du Nigeria',
    'de la Norvège',
    'de la Nouvelle-Zélande',
    "d'Oman",
    "d'Ouganda",
    "d'Ouzbékistan",
    'du Pakistan',
    'des Palaos',
    'de la Palestine',
    'du Panama',
    'de la Papouasie-Nouvelle-Guinée',
    'du Paraguay',
    'des Pays-Bas',
    'du Pérou',
    'des Philippines',
    'de la Pologne',
    'du Portugal',
    'du Qatar',
    'de la République centrafricaine',
    'de la République dominicaine',
    'de la République du Congo',
    'de la République tchèque',
    'de la Roumanie',
    'du Royaume-Uni',
    'de la Russie',
    'du Rwanda',
    'de Saint-Christophe-et-Niévès',
    'de Saint-Marin',
    'de Saint-Vincent-et-les-Grenadines',
    'de Sainte-Lucie',
    'du Salvador',
    'des îles Samoa',
    'de Sao Tomé-et-Principe',
    'du Sénégal',
    'de la Serbie',
    'des Seychelles',
    'de la Sierra Leone',
    'de Singapour',
    'de la Slovaquie',
    'de la Slovénie',
    'de la Somalie',
    'du Soudan',
    'du Soudan du Sud',
    'du Sri Lanka',
    'de la Suède',
    'de la Suisse',
    'du Suriname',
    'du Swaziland',
    'de la Syrie',
    'du Tadjikistan',
    'de la Tanzanie',
    'du Tchad',
    'de la Thaïlande',
    'du Timor oriental',
    'du Togo',
    'des Tonga',
    'de Trinité-et-Tobago',
    'de la Tunisie',
    'du Turkménistan',
    'de la Turquie',
    'de Tuvalu',
    "de l'Ukraine",
    "de l'Uruguay",
    'du Vanuatu',
    'du Vatican',
    'du Venezuela',
    'du Viêt Nam',
    'du Yémen',
    'de la Zambie',
    'du Zimbabwe',
]

export const manageIndice = (data: any) => {
    const description = data.quizz_description
    if (data && description && description.indices) {
        const { indices } = description
        const playersType = [
            'who_is_this_player',
            'who_is_this_player_by_nationality',
            'who_is_this_player_by_photos',
            'who_is_this_player_by_palmares',
            'who_is_this_player_by_teammate',
            'who_is_this_player_by_records',
        ]
        const club = [
            'who_is_this_club_type',
            'who_is_this_club',
            'who_is_this_club_by_logo',
            'who_is_this_club_by_palmares',
        ]
        // const logo = ['who_is_this_club_by_logo']
        const type = data.quizz_question
        if (playersType.find((el) => el === type)) {
            if (indices.current_club === 'Retraité')
                return `INDICE: C'est un joueur retraité, venant ${
                    pays.find((el) => el.includes(indices.nationality)) ??
                    `de ${indices.nationality}`
                }`

            return `INDICE: C'est un joueur du club ${
                indices.current_club
            }, venant ${
                pays.find((el) => el.includes(indices.nationality)) ??
                `de ${indices.nationality}`
            }`
        }

        if (club.find((el) => el === type)) {
            if (!indices) return null
            if (Array.isArray(indices.players) && indices.players.length > 0) {
                const players = indices.players.map(
                    (item: any) => `${item.first_name} ${item.last_name}`
                )
                return `Ce club a été fondé en ${
                    indices.fundation_date
                }. Et ces joueurs en font partie: ${players.join(', ')}`
            }
            return `Ce club a été fondé en ${indices.fundation_date}.`
        }

        return null
    }

    return null
}

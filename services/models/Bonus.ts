export interface IBonusList {
    id: number | string | null
    nom: string
    count: number
    description: string
    introduced: boolean
}

export interface IBonus {
    list: Array<IBonusList>
}

export interface CreateBonus {
    nom: string
    description: string
}

export interface AttributeBonus {
    user_id: number
    nom: string // nom du bonus
    quantity?: number
}

export interface IReward {
    type: 'bonus' | 'hp'
    name?: '50/50' | 'LETTRES' | 'TEMPS' | 'DOUBLE CHANCE' | 'INDICE' | 'PASSER'
    quantity: number
    level: number
}

export interface IRewards {
    list: Array<IReward>
}

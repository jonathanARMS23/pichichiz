export interface CreateSolo {
    level: number
    score: number
    user_id: number
}

export interface UpdateSolo {
    level: number
    user_id: number
    score?: number
}

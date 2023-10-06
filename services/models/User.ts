export interface ICareer {
    level: number
    score: number
}

export default interface IUser {
    id: string | number
    nom: string
    prenom: string
    pseudo: string
    email: string
    phone: string
    hp: number
    score: string | number
    career: Array<ICareer>
}

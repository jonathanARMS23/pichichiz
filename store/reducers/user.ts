/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import IUser from '../../services/models/User'

const initialState: IUser = {
    id: 0,
    nom: '',
    prenom: '',
    pseudo: '',
    email: '',
    phone: '',
    hp: 0,
    score: 0,
    career: [{ level: 1, score: 0 }],
}

const UserSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUserNom: (state, action) => {
            state.nom = action.payload
        },
        setUserId: (state, action) => {
            state.id = action.payload
        },
        setUserPrenom: (state, action) => {
            state.prenom = action.payload
        },
        setUserPseudo: (state, action) => {
            state.pseudo = action.payload
        },
        setUserEmail: (state, action) => {
            state.email = action.payload
        },
        setUserPhone: (state, action) => {
            state.phone = action.payload
        },
        setCareer: (state, action) => {
            state.career = action.payload
        },
        setUser: (state, action) => {
            state.id = action.payload.id
            state.nom = action.payload.nom ?? 'Player'
            state.prenom = action.payload.prenom ?? 'Player'
            state.pseudo = action.payload.pseudo
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.hp = action.payload.hp ?? 0
            state.score = action.payload.score ?? 0
            state.career = action.payload.career ?? [{ level: 1, score: 0 }]
            console.log('OAuth initialized')
        },
        setScore: (state, action) => {
            state.score = action.payload as number
        },
        setHP: (state, action) => {
            state.hp = action.payload as number
        },
        validateLevel: (state, action) => {
            const { career } = state
            let data = state.career
            const index = career.findIndex(
                (el: any) => el.level === action.payload.level
            )
            if (index !== -1) {
                const score =
                    parseInt(`${career[index].score}`, 10) <=
                    parseInt(`${action.payload.score}`, 10)
                        ? parseInt(`${action.payload.score}`, 10)
                        : parseInt(`${career[index].score}`, 10)
                career[index] = {
                    ...career[index],
                    score,
                }

                data =
                    career.length < action.payload.unlocked
                        ? [
                              ...career,
                              { level: action.payload.unlocked, score: 0 },
                          ]
                        : career
            }
            state.career = data
        },
        setScoreOfLevel: (state, action) => {
            const { career } = state
            const index = career.findIndex(
                (el: any) => el.level === action.payload.level
            )
            if (index !== -1) {
                career[index] = {
                    ...career[index],
                    score: action.payload.score,
                }
            }
            state.career = career
        },
        logout: (state) => {
            // eslint-disable-next-line no-unused-vars
            state = initialState
        },
        Initialize: (state, action) => {
            state.id = 0
            state.nom = 'Player'
            state.prenom = 'Player'
            state.pseudo = 'Player'
            state.email = ''
            state.phone = ''
            state.hp = action.payload.hp ?? 0
            state.score = action.payload.score ?? 0
            state.career = action.payload.career ?? [{ level: 1, score: 0 }]
            console.log('default Initialisation Done')
        },
    },
})

export const {
    setUserNom,
    setUserPrenom,
    setUserEmail,
    setUserPhone,
    setUserPseudo,
    setUser,
    setScore,
    setHP,
    logout,
    Initialize,
    validateLevel,
    setCareer,
    setScoreOfLevel,
} = UserSlice.actions
export default UserSlice.reducer

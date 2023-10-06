import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/user'
import GameReducer from './reducers/game'
import BonusReducer from './reducers/bonus'
import DuelReducer from './reducers/duel'
import RewardReducer from './reducers/reward'
import SettingReducer from './reducers/setting'
import ModeReducer from './reducers/mode'
import DailyBonus from './reducers/dailyBonus'

const store = configureStore({
    reducer: {
        user: UserReducer,
        game: GameReducer,
        bonus: BonusReducer,
        duel: DuelReducer,
        reward: RewardReducer,
        setting: SettingReducer,
        mode: ModeReducer,
        dailybonus: DailyBonus,
    },
})

export type IState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

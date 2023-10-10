import axios from 'axios'

/**
 * all question type:
 * w_cup_player_teammate
 * w_cup_club_match
 * w_cup_club_type
 * w_cup_club_palmares
 * w_cup_player_photos
 * w_cup_player_palmares
 * w_cup_player
 */

/** export const models = [
    'who_is_this_club',
    'who_is_this_player',
    'who_is_this_player_by_photos',
    'who_is_this_player_by_teammate',
    'who_is_this_club_type',
    'who_is_this_club_by_palmares',
] */

export const models = [
    'w_cup_player_teammate',
    'w_cup_club_match',
    'w_cup_club_type',
    'w_cup_club_palmares',
    'w_cup_player_photos',
    'w_cup_player_palmares',
    'w_cup_player',
]

export default class Quiz {
    private log = 'morytest'

    private pass = 'nd23ND9ZXdnZ'

    private source = axios.CancelToken.source()

    protected types = models

    protected url = `https://www.footballdatabase.eu/quizz/quizz.php?log=${this.log}&pass=${this.pass}`

    // méthode pour récupérer les questions
    public getQuestions = async (model: string, level: number) => {
        try {
            const exist = this.types.find((el) => el === model)
            console.log(
                `request: ${this.url}&model=${model}&difficulty=${level}`
            )
            if (exist) {
                const response = (
                    await axios.get(
                        `${this.url}&model=${model}&difficulty=${level}`,
                        {
                            cancelToken: this.source.token,
                        }
                    )
                ).data

                console.log('response:')
                console.log(response)

                return response
            }
            return { canceled: true }
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public getQuestionsPerLevel = async (level: number) => {
        try {
            const data = await Promise.all(
                this.types.map(
                    async (el: string) => await this.getQuestions(el, level)
                )
            )

            return data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public getQuestionByStep = async (step: number, level: number) => {
        try {
            const data = await this.getQuestions(this.types[step], level)

            return data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    /** public getQuestionById = async () => {
        try {

        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    } */

    public GetQuestionByIds = async (questions: Array<string | number>) => {
        try {
            const ids = questions.join(',')
            const response = (
                await axios.get(
                    `${this.url}&model=get_records_by_ids&ids=${ids}`,
                    {
                        cancelToken: this.source.token,
                    }
                )
            ).data

            if (Array.isArray(response)) {
                const formated = questions.map((el) =>
                    response.find((item: any) => `${item.quizz_id}` === `${el}`)
                )

                return formated
            }
            return []
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public GetQuestionsByLevel = async (level: number) => {
        try {
            const response = (
                await axios.get(`${this.url}&model=_get&difficulty=${level}`, {
                    cancelToken: this.source.token,
                })
            ).data

            if (!response || !response.quizz_question) return { canceled: true }

            return response
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public GetAllQuestionsByLevel = async (level: number, limit: number) => {
        try {
            const response = (
                await axios.get(
                    `${this.url}&model=_get_all&lvl=${limit}&difficulty=${level}`,
                    {
                        cancelToken: this.source.token,
                    }
                )
            ).data

            if (response && Array.isArray(response)) return response

            return { canceled: true }
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public Cancel = () => {
        this.source.cancel()
    }
}

import axios from 'axios'

export const models = ['player_goals', 'stadium_attendance']

export default class Penalty {
    private source = axios.CancelToken.source()

    protected types = models

    protected url = `https://www.footballdatabase.eu/quizz/quizz.php?`

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

    public getQuestionByStep = async (step: number, level: number) => {
        try {
            const data = await this.getQuestions(this.types[step], level)

            return data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

    public getRandomPenaltyQuestion = async (level: number) => {
        try {
            const data = await this.getQuestions(
                this.randomiseArray(this.types),
                level
            )

            return data
        } catch (error) {
            if (axios.isCancel(error)) return { canceled: true }
            throw error
        }
    }

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

    // eslint-disable-next-line class-methods-use-this
    public randomiseArray = (array: Array<any>) => {
        if (array.length === 0) {
            throw new Error('Array is empty')
        }

        const randomIndex = Math.floor(Math.random() * array.length)
        return array[randomIndex]
    }

    public Cancel = () => {
        this.source.cancel()
    }
}

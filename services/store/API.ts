import axios from 'axios'

export default class API {
    protected log = 'morytest'

    protected pass = 'nd23ND9ZXdnZ'

    protected source = axios.CancelToken.source()

    public Cancel = () => {
        this.source.cancel()
    }
}

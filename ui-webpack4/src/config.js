
import devConf from '../static/config.dev'
import prodConf from '../static/config.prod'

let config = process.env.Node_ENV === 'production' ? prodConf : devConf

export default config  

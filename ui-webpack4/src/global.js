
import devenv from './global.dev'
import prodenv from './global.prod'
let env = process.env.Node_ENV === 'production' ? prodenv : devenv

export default env

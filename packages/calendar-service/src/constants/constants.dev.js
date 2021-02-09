const path = require('path')
const fs = require('fs')

module.exports = {
  logs: 'dev',
  googleSecrets: JSON.parse(fs.readFileSync(path.resolve('./src/constants/credentials.json'))).installed,
  token: fs.readFileSync(path.resolve('./src/constants/token.json'))
}

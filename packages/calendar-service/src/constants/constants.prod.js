const path = require('path')
const fs = require('fs')

module.exports = {
  logs: 'production',
  googleSecrets: JSON.parse(
    fs.readFileSync(path.resolve('./src/constants/credentials.json'))
  ).installed,
  token: JSON.parse(
    fs.readFileSync(path.resolve('./src/constants/token.json'))
  )
}

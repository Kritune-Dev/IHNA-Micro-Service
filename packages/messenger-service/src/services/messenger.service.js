const { verifyToken, facebookAccesToken } = require('../constants')
const fetch = require('node-fetch')

exports.verifyWebhook = (req) => {
  return new Promise((resolve, reject) => {
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode && token === verifyToken) {
      resolve(challenge)
    } else {
      reject(
        new Error(
          'An error occured when verify the token ' +
            token +
            ', err: Token not matching'
        )
      )
    }
  })
}

exports.processMessage = (event) => {
  const userId = event.sender.id
  let message = ''

  switch (event.message.text.toLowerCase()) {
    case 'ping':
      message = 'Pong 🏓'
      break
    case 'getid':
      message = event.sender.id
      break
    default:
      message =
        'Les commandes disponibles sont : \n' +
        ' - Ping\n' +
        ' - GetId [Debug]\n'
      break
  }

  this.sendTextMessage(userId, message)
}

exports.sendTextMessage = (userId, text) => {
  return fetch(
    `https://graph.facebook.com/v2.6/me/messages?access_token=${facebookAccesToken}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        messaging_type: 'RESPONSE',
        recipient: {
          id: userId
        },
        message: {
          text
        }
      })
    }
  )
}

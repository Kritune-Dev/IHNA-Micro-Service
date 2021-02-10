/**
 * Common constants across all the environments (dev, staging, prod)
 */
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  verifyToken: process.env.VERIFY_TOKEN,
  facebookAccesToken: process.env.FACEBOOK_ACCESS_TOKEN,
  botId: process.env.BOT_ID
}

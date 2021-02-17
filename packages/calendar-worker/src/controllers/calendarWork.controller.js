const httpStatus = require('http-status')
const InformationService = require('../services/information.service')

exports.getStatus = (req, res, next) => {
  try {
    const response = InformationService.packageParseInformation(req)
    res.status(httpStatus.OK).json(response)
  } catch (e) {
    next(e)
  }
}

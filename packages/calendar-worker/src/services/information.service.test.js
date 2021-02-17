const informationService = require('../services/information.service')
const httpMocks = require('node-mocks-http')

informationService.getGitCommit = jest.fn()
informationService.getUptime = jest.fn()

let req

beforeEach(() => {
  req = httpMocks.createRequest()
})

describe('Information Service', () => {
  it('Should have a packageParseInformation function', () => {
    expect(typeof informationService.packageParseInformation).toBe('function')
  })

  it('Should call getGitCommit() and getUptime()', () => {
    informationService.packageParseInformation(req)

    expect(informationService.getGitCommit).toHaveBeenCalled()
    expect(informationService.getUptime).toHaveBeenCalled()
  })
})

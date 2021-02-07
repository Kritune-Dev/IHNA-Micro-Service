import {PlatformTest} from '@tsed/common'
import {HelloWorldController} from './HelloWorldController'

describe('helloWorldController', () => {
  beforeEach(PlatformTest.create)
  afterEach(PlatformTest.reset)

  it('should do something', () => {
    const instance = PlatformTest.get<HelloWorldController>(HelloWorldController)
    // const instance = PlatformTest.invoke<HelloWorldController>(HelloWorldController); // get fresh instance

    expect(instance).toBeInstanceOf(HelloWorldController)
  })
})
import Test from '../model/test'

class TestController {
  async getAll(ctx) {
    ctx.body = await Test.find({})
  }
  async add(ctx) {
    const { query } = ctx.request
    let test = new Test({
      name: query.name,
      age: query.age
    });
    test = await test.save();
    ctx.body = test;
  }
}

export default TestController

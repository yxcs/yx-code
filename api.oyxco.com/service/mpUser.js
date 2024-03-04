import MpUser from '../model/mpUser'

class MpUserService {

  async findByOpenId(params) {
    const data = await MpUser.findOne(params)
    if (data) {
      return data
    }
    return false
  }

  async create (params) {
    const data = await MpUser.create(params)
    if (data && data._id) {
      return data
    }
    return false
  }
}

export default new MpUserService()
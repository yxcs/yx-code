import UploadModal from '../model/uploadList'

class UploadService {

  async find (query) {
    return await UploadModal.find(query)
  }

  async findById (cid) {
    const data = await UploadModal.findById(cid)
    if (data && data._id) {
      return data
    }
    return false
  }

  async findByIdAndRemove (cid) {
    const data = await UploadModal.findByIdAndRemove(cid)
    if (data && data._id) {
      return data
    }
    return false
  }

  async create (params) {
    const data = await UploadModal.create(params)
    if (data && data._id) {
      return data
    }
    return false
  }

  async getFileByPage(params, page) {
    try {
      const skip = (page.pageNum - 1) * page.pageSize
      const sort = { updateAt: -1 }
      const list = await UploadModal.find(params).sort(sort).skip(skip).limit(page.pageSize)
      const count = await UploadModal.find(params).count(true)
      return {
        list,
        total: count,
        pageNum: page.pageNum,
        pageSize: page.pageSize
      }
    } catch(err) {
      return false
    }
  }

  async updateFileById(id, params = {}) {
    const data = await UploadModal.updateOne({_id: id}, params)
    if (data && data.ok) {
      return true
    }
    return false
  }
}

export default new UploadService()

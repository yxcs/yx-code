import mongoose from '../db'
const Schema = mongoose.Schema

const UploadListSchema = new Schema({
  originalName: {
    type: String,
    require: true
  },
  standardName: {
    type: String,
    require: true
  },
  uri: {
    type: String,
    require: true
  },
  env: {
    type: String, // dev：本地，prod：服务器
    default: 'env'
  },
  mimeType: {
    type: String,
    default: ''
  },
  filePath: {
    type: String,
    require: true
  }
})

UploadListSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }
  next()
})

export default mongoose.model('upload_list', UploadListSchema)
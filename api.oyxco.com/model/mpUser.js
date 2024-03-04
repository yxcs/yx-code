import mongoose from '../db'
const Schema = mongoose.Schema

const MpUserSchema = new Schema({
  openId: {
    type: String,
    require: true
  },
  userName: {
    type: String,
    default: '微信用户'
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: 'zh_CN'
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  password: {
    type: String,
    require: true
  },
  mobile: {
    type: Number
  },
  loginPassword: {
    type: String
  },
  loginAccount: {
    type: String
  }
})

MpUserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }
  next()
})

export default mongoose.model('mp_user', MpUserSchema)
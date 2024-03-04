import mongoose from '../db'
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  codeType: {
    type: String,
    default: 'markdown'
  },
  cover: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  updateAt: {
    type: Number,
    default: Date.now()
  },
  createAt: {
    type: Number,
    default: Date.now()
  },
  showType: {
    type: Number,
    default: 0
  },
  articleType: {
    type: Number,
    default: 1
  },
  originUrl: {
    type: String,
    require: false
  },
  technologyType: {
    type: Number,
    require: true
  },
  technologySubType: {
    type: Number,
    require: true
  },
  readNum: {
    type: Number,
    default: 0
  },
  upNum: {
    type: Number,
    default: 0
  },
  likeNum: {
    type: Number,
    default: 0
  },
  collectionNum: {
    type: Number,
    default: 0
  },
  shareNum: {
    type: Number,
    default: 0
  },
  commentNum: {
    type: Number,
    default: 0
  },
  commentId: {
    type: String,
    require: false
  },
  prevId: {
    type: String,
    require: false
  },
  nextId: {
    type: String,
    require: false
  },
  level: {
    type: Number,
    default: 4
  },
  isTop: {
    type: Number,
    default: 0
  },
  isHot: {
    type: Number,
    default: 0
  },
  isNewest: {
    type: Number,
    default: 0
  },
  tag: {
    type: Array,
    default: []
  },
})

PostSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }
  next()
})

export default mongoose.model('blog_list', PostSchema)

/**
# codeType：html、markdown
# showType 0：草稿，1：预发，2：展示，3：隐藏，5：删除
# articleType 0：其他，1：原创，2：转载，3：译文，4：迁移
# originUrl：原始链接，articleType为2、3、4的时候必填
# technologyType：
#     100：js
#     200：css
#     300：node
#     400：python
#     500：java
#     600：database
#     700：server
#     800：article
# technologySubType：
#     100：js
#     200：css
#     300：node
#     400：python
#     500：java
#     600：database
#     700：server
#     800：article
# level: 0-9
# tag：标签，以英文分好分割
 */
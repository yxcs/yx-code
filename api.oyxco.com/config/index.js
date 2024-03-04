const options = {
  db_user: "admin",
  db_pwd: "ZzzzZ00",
  db_host: "47.104.141.127",
  db_port: 27017,
  db_name: "blogArticle",
  useNewUrlParser: true
};
export const DB_URL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name + "?authSource=admin";


console.log(DB_URL)

export const defaultSchemaExtend = {
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
};

export const defaultSchemaOptions = {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
};

export const jwtConfig = {
  secret: 'serve'
};

export const server = {
  port: 4100
}

export const mp = {
  appId: 'wx14f9e0fdf55d8eaa',
  secret: '6307fb7e00651b0011465fcb8ef01b37'
}
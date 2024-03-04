db.createUser(
  {
    user: "yxcs",
    pwd: "123456",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)

db.createUser({
   user : 'manager' ,
   pwd : '123456' ,
   roles : [ 'readWrite' ]
})
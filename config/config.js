module.exports = {
    dev: {
      port: process.env.port || 3000,
      db  : process.env.DB_LINK || "mongodb://127.0.0.1:27017/mean-app",
      secret: process.env.SECRET_KEY || "mysecretisntyours"
    },
    prod: {
      //TODO !
    }
}
  
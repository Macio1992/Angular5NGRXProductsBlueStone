module.exports = {
    dev: {
        port: process.env.port || 3000,
        db: process.env.DB_LINK || "mongodb://mongouser:mongopassword@ds041992.mongolab.com:41992/appdb"
    },
    prod: {}
}
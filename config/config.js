module.exports = {
    development: {
        port: process.env.PORT || 9000,
        dbPath: 'mongodb://localhost:27017/Messenger'
    },
    production: {}
};
const bcryptjs = require('bcryptjs')
const ITERATION = 8

module.exports = {
    async hash(password) {
        return await bcryptjs.hash(password, ITERATION)
    },

    async compare(password, hashPassword) {
        return await bcryptjs.compare(password, hashPassword)
    }
}
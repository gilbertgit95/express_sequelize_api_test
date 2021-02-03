const bcryptjs = require('bcryptjs')
const ITERATION = 8

module.exports = {
    async generate(password) {
        return await bcryptjs.hash(password, ITERATION)
    },

    async verify(password, hashPassword) {
        return await bcryptjs.compare(password, hashPassword)
    }
}
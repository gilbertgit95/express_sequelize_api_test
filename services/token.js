const jwt = require('jsonwebtoken');

const EXPIRE = 24 // hours
const TEST_SECRET = 'secret-key-101'

module.exports ={
    generate(data) {
        return jwt.sign(data, TEST_SECRET,{expiresIn: EXPIRE * 3600})
    },

    async verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, TEST_SECRET, function(err, decoded){
                if(!err){
                    resolve(decoded)
                } else {
                    reject(err)
                }
            })
        })
    }
}
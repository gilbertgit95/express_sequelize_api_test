/**
 * module that handles the generation and validation of jwt
 * 
 * @module services/token
 */

/**
 * jsonwebtoken library is used for this module
 * @const
 */
const jwt = require('jsonwebtoken');

/**
 * expire hours, default to 24 hours
 * @const
 */
const EXPIRE = 24 // hours

/**
 * secret key, is the random text use to sign the token,
 * this should be secured.
 * @const
 */
const TEST_SECRET = 'secret-key-101'

module.exports ={
    /**
     * function that generate jwt
     * 
     * @param {object} data - object tobe the content of jwt
     * @returns {string} jwt text
     */
    generate(data) {
        return jwt.sign(data, TEST_SECRET,{expiresIn: EXPIRE * 3600})
    },

    /**
     * funtion that verify a token
     * 
     * @async
     * @param {string} token - jwt text
     * @returns {Promise<object>} object content of the jwt
     */
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
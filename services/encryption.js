/**
 * module that handles password hashing and validation
 * 
 * @module services/encryption
 */

 /**
  * bcryptjs library is use by this module to process password
  * @const
  */
const bcryptjs = require('bcryptjs')

/**
 * iteration use for generating password hash, default to 8
 * @const
 */
const ITERATION = 8

module.exports = {
    /**
     * function that generate hash password froma plaint text password
     * 
     * @async
     * @param {string} password - plain text
     * @returns {Promise<string>} a hash string
     */
    async generate(password) {
        return await bcryptjs.hash(password, ITERATION)
    },

    /**
     * function that verify the password if it matches to the hash string
     * 
     * @async
     * @param {string} password - plaint text password
     * @param {string} hashPassword - hash password
     * @returns {Promise<boolean>} true if the plain text matches to the hash string
     */
    async verify(password, hashPassword) {
        return await bcryptjs.compare(password, hashPassword)
    }
}
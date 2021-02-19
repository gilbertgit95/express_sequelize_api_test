
module.exports = async (req, res, next) => {
    const jwt = req.headers.authorization? req.headers.authorization.replace('Bearer ', ''): null

    try {
        // if no jwt inside header throw error
        if (!jwt) throw(ERROR)

        next()

    } catch (err) {
        return res.status(401).json(err)
    }
}
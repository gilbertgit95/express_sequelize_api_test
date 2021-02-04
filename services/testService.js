module.exports = {
    delay(seconds) {
        let time = seconds * 1e3
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(true) }, time)
        })
    }
}
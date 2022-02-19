const fs = require('fs')
const dbPath = '../database'

module.exports = {
    /**
     * Set session to database
     * 
     * @param {Number} userId 
     * @returns
     */
    setSession: (userId) => {
        try {
            const data = fs.readFileSync(`${dbPath}/session.json`)
            const storedSession = JSON.parse(data)
            if (storedSession.map(e => { return e.userId }).indexOf(userId) === -1) {
                let sessionId = require('crypto').randomBytes(24).toString('hex')
                if (storedSession.map(e => { return e.sessionId }).indexOf(sessionId) !== -1) {
                    sessionId = require('crypto').randomBytes(24).toString('hex')
                }
                storedSession.push({
                    userId: userId,
                    sessionId: sessionId
                })
                fs.writeFileSync(`${dbPath}/session.json`, JSON.stringify(storedSession))
                return sessionId
            } else {
                return false
            }
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * Delete session to database
     * 
     * @param {Number} userId 
     */
    deleteSession: (userId) => {
        const data = fs.readFileSync(`${dbPath}/session.json`)
        const storedSession = JSON.parse(data)
        storedSession.splice(storedSession.indexOf(userId), 1)
        fs.writeFileSync(`${dbPath}/session.json`, JSON.stringify(storedSession))
    }
}
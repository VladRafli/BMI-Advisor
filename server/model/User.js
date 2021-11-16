const fs = require('fs')
const dbPath = '../database'

module.exports = {
    getUser: () => {
        try {
            const data = fs.readFileSync(`${dbPath}/users.json`)
            const users = JSON.parse(data)
            return users
        } catch (err) {
            throw new Error(err)
        }
    },
    addUser: (user) => {
        try {
            const data = fs.readFileSync(`${dbPath}/users.json`)
            const users = JSON.parse(data)
            users.push(user)
            fs.writeFileSync(`${dbPath}/users.json`, JSON.stringify(users))
        } catch (err) {
            throw new Error(err)
        }
    }
}
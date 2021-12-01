const fs = require('fs')
const dbPath = '../database'

module.exports = {
    /**
     * Get all users
     */
    getUser: () => {
        try {
            const data = fs.readFileSync(`${dbPath}/users.json`)
            const users = JSON.parse(data)
            return users
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * Get user by Id
     * 
     * @param {Number} id 
     */
    getUserById: (id) => {
        try {
            let users = this.getUser()
            users.forEach(user => {
                if (user.userId === id) {
                    return user
                }
            })
            throw new Error('No User found with specified ID')
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * Add new user
     * 
     * @param {Object} user 
     */
    addUser: (user) => {
        try {
            let users = this.getUser()
            users.push(user)
            fs.writeFileSync(`${dbPath}/users.json`, JSON.stringify(users))
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * Set user object by Id
     * @param {Number} id 
     * @param {Object} newUser 
     */
    setUser: (id, newUser) => {
        try {
            let users = this.getUser()
            users.forEach(user => {
                if (user.userId === id) {
                    user = newUser
                    fs.writeFileSync(`${dbPath}/users.json`, JSON.stringify(users))
                    return
                }
            })
            throw new Error('No User found with specified ID')
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * Add new User Advice
     * 
     * @param {Number} id 
     * @param {String | String[]} newAdvice
     */
    addUserAdvice: (id, newAdvice) => {
        try {
            let users = this.getUser()
            users.forEach(user => {
                if (user.userId === id) {
                    if (typeof newAdvice === 'string'){
                        user.advice.push(newAdvice)
                        fs.writeFileSync(`${dbPath}/users.json`, JSON.stringify(users))
                        return
                    }
                    else if (Array.isArray(newAdvice)){
                        newAdvice.forEach(advice => {
                            user.advice.push(advice)
                        })
                        fs.writeFileSync(`${dbPath}/users.json`, JSON.stringify(users))
                        return
                    }
                }
            })
            throw new Error('No User found with specified ID')
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * Set new Array of User Advice
     * 
     * @param {Number} id 
     * @param {Array} advice 
     */
    setUserAdvice: (id, advice) => {
        try {
            let users = this.getUser()
            users.forEach(user => {
                if (user.userId === id) {
                    user.advice = advice
                    fs.writeFileSync(`${dbPath}/users.json`, JSON.stringify(users))
                    return
                }
            })
            throw new Error('No User found with specified ID')
        } catch (err) {
            throw new Error(err)
        }
    },
    /**
     * Set User BMI Status
     * 
     * @param {Number} id 
     * @param {String} newStatus 
     */
    setUserBMIStatus: (id, newStatus) => {
        try {
            let users = this.getUser()
            users.forEach(user => {
                if (user.userId === id) {
                    user.status = newStatus
                    fs.writeFileSync(`${dbPath}/users.json`, JSON.stringify(users))
                    return
                }
            })
        } catch (err) {
            throw new Error(err)
        }
    }
}
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

//exporting all the functions
module.exports = {
    //function to see if user is authenticated
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
        
        // if statement telling to send  an error if theres no header token
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        //declaring a token variable
        let token

        try {
            token = jwt.verify(headerToken, SECRET)

        //if theres an error in the try the catch will send the error
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        //if the user doesn't have a token it will send an error of not authenticated
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}
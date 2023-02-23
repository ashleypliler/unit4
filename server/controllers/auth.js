require("dotenv").config();
import {SECRET} from process.env;
import {user} from "../models/user"
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = (username, userId) => {

    return jwt.sign({
        username,
        id
    },
    SECRET,
    {
        expiresIn: '2 days'
    })
}




module.exports = {
    login: async() => {
        try {
            const {username, password} = req.body;
            const foundUser = await user.findOne({where: {username}});

            if(foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)

                if(isAuthenticated) {
                    const token = createToken(newUser.dataValues.username, newUser.dataValues.id);
                    const exp = Date.now() + 1000 * 60 * 60 * 48;
                    
                    res.status(200).send({
                        username: newUser.dataValues.username, 
                        userId: newUser.dataValues.id,
                        token: token, 
                        exp: exp});
                } else {
                    console.log('cannont log in')
                }

            } else {
                console.log('cannont log in')
            }
        } catch (error) {
            console.log(error)
        }
    },

    register: async() => {
        try {
            const {username, password} = req.body;
            const foundUser = await user.findOne({where: {username: username}});

            if(foundUser) {
                res.status(400).send('cannot create user')
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                
                const newUser = await user.create({
                 username: username,
                 hashedPass: hash
                 })

                const token = createToken(newUser.dataValues.username, newUser.dataValues.id);

                const exp = Date.now() + 1000 * 60 * 60 * 48;

                res.status(200).send({
                    username: newUser.dataValues.username, 
                    userId: newUser.dataValues.id,
                    token: token, 
                    exp: exp});
            }


        } catch (error) {
            console.log(error)
        }
    }
}
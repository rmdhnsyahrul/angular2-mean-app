// import { request } from 'https';

const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const User = require('../models/user');
    
// Register
router.post('/register', (req, res, next) => {
    // res.send('Register');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            let error = err;
            var pathError = error.errmsg;
            var message = pathError.substring(pathError.lastIndexOf("index:")+7,pathError.lastIndexOf("_1"));
            var errorMsg;
            if(message === "username") {
                errorMsg = "Username already exist!";
            } else if(message === "email"){
                errorMsg = "E-mail address already in used!"
            } else {
                errorMsg = "Something went wrong!"
            }
            res.json({success: false, msg: errorMsg});
        } else {
            res.json({success: true, msg: "User registered", user: user});
        }
    });
});

// Authenticate
router.post('/authenticate', function(req, res, next) {
    // res.send('Authenticate')
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'}); 
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.dev.secret, {
                    expiresIn: 604800 // a week
                })

                res.json({
                    success: true,
                    msg: 'You are now logged in',
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        })
    })
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    // res.send('Profile')
    res.json({user: req.user});
});

// Set user isActive to "true" after authenticate / log in
router.post('/isActive', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    const username = req.body.username;

    User.setActive(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        res.json(user)
    })
});

// Get all Logged in user
router.get('/isActive', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    User.getAllActiveUser((err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        res.json(user)
    })
});

// Set user isActive to "false" after logout
router.post('/inActive', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    const username = req.body.username;

    User.setInactive(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        res.json({success: true, msg: "Logout success"});
    })
});

// Update user's profile image
router.put('/image/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    User.setUserImage(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        User.findById(req.params.id, (err, result)=>{
            if(err) return next(err);
            if(!result) return res.json({success: false, msg: 'User id: '+ req.params.id +', not found'});
            res.json(result);
        })
    })
    // res.send({id: req.params.id, data: req.body});
})

// Update user record
router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    res.send({message: 'Success', data: req.body});
})
module.exports = router;
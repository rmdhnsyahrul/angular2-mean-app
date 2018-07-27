const router = require('express').Router();

// Dependencies for protect the API with jwt authentication method
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Book = require('../models/book');

/* GET All BOOKS */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    // res.send('Express REST API');
    Book.getAllBooks((err, books) => {
        if (err) return next(err);
        if(!books) return res.json({success: false, msg: 'Book not found'});
        res.json(books);
    });
});

/* GET BOOK BY ID */
router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Book.findBookById(req.params.id, (err, book) => {
        if (err) return next(err);
        if(!book) return res.json({success: false, msg: 'Book '+ req.params.id +' not found'});
        res.json(book);
    });
});

/* SAVE BOOK */
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Book.addNewBook(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE BOOK */
router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Book.updateBook(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        Book.findById(req.params.id, (err, result)=>{
            if(err) return next(err);
            if(!result) return res.json({success: false, msg: 'Book '+ req.params.id +' not found'});
            res.json(result);
        })
    });
});

/* DELETE BOOK */
router.delete('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Book.deleteBook(req.params.id, function(err, post){
        if (err) return next(err);
        res.json({success: true, book: post});
    });
});

module.exports = router;
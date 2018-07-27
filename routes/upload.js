'use strict';

const router = require('express').Router();
// const config = require('../config/config');
const mongoose = require("mongoose");
const fs = require('fs');

let Grid = require("gridfs-stream");
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db);
    router.get('/', (req, res) => {
    //   res.send('Hello Housem !');
        gfs.collection('ctFiles'); // set collection name to lookup into
        // let imgname = req.params.imgname;
        gfs.files.find({}).toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).send({
                    message: 'File not found'
                });
            }
            /** create read stream */
            var readstream = gfs.createReadStream({
                filename: files[0].filename
            });
            /** set the proper content type */
            res.set('Content-Type', files[0].contentType)
            /** return response */
            return readstream.pipe(res);
        });
    });
    router.get('/img/:imgname', (req, res) => {
        gfs.collection('ctFiles'); // set collection name to lookup into
        let imgname = req.params.imgname;
        // gfs.files.find({_id: imgname}).toArray((err, files) => {
        //     if (!files || files.length === 0) {
        //         return res.status(404).send({
        //             message: 'File not found'
        //         });
        //     }
        //     /** create read stream */
        //     var readstream = gfs.createReadStream({
        //         filename: files[0].filename
        //     });
        //     /** set the proper content type */
        //     res.set('Content-Type', files[0].contentType)
        //     /** return response */
        //     return readstream.pipe(res);
        // });
        gfs.findOne({_id: req.params.imgname}, (err, file) => {
            if(!file){
                return res.status(404).send({
                    message: 'File not found'
                });
            }
            /** create read stream from callback */
            var readstream = gfs.createReadStream({
                filename: file.filename
            });
            /** set proper content type */
            res.set('Content-Type', file.contentType)
            /** return response */
            return readstream.pipe(res);
        });
    });
    router.post('/img', (req, res) => {
        let part = req.files.file;
        // console.log(req.body.userId);
        if(!part){
            return res.json({message: 'Error', error: 'No file(s) found'});
        }
        let writeStream = gfs.createWriteStream({
            filename: "files_" + Date.now() + "." + part.name.split('.')[part.name.split('.').length -1],
            mode: 'w',
            content_type: part.mimetype,
            root: "ctFiles" // set collection name to store file,
            // metadata: { "userId" : req.body.userId }
        });

        writeStream.on('close', (file) => {
          // checking for file
          if(!file) {
            res.status(400).send('No file received');
          }
            return res.status(200).send(file._id);
        });
        // using callbacks is important !
        // writeStream should end the operation once all data is written to the DB 
        writeStream.write(part.data, () => {
          writeStream.end();
        });  
    });
});


module.exports = router;
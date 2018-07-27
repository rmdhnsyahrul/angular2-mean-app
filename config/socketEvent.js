const user = [],
      customers = [];

exports = module.exports = function(io){
    // will be update to verify the token before handle request from client
    // using passport.socketio, see: https://github.com/jfromaniello/passport.socketio
    // passport.socketio require sessionStore, see: https://github.com/senchalabs/connect/wiki#session-stores
    
    // example verify with jsonwebtoken
    // io.use(function(socket, next){
    //     if (socket.handshake.query && socket.handshake.query.token){
    //       jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function(err, decoded) {
    //         if(err) return next(new Error('Authentication error'));
    //         socket.decoded = decoded;
    //         next();
    //       });
    //     }
    //     next(new Error('Authentication error'));
    // });
    io.on('connection', function(socket){
        socket.emit('send-roomID', {roomID: socket.id});
        console.log('User connected');
        socket.on('disconnect', function(){
            console.log('User disconnected');
        });
        
        socket.on('client list', function(data){
            console.log('-- get clients --');
            updateUser();
        })

        socket.on('new user', function(data){
            // data.roomID = uuidv4();
            // check nickname contain 'admin' phrase
            if(data.person.indexOf('admin') >= 0) {
                // add user to user model
                user.push(data);
                io.emit('welcome-admin', {users: customers});
            } else {
                // add user to customers model
                customers.push(data);
                if(user.length === 0){
                    // post notifikasi selamat datang
                    io.emit('welcome-user', {roomID: data.roomID, person: data.person, message: 'Mohon maaf <h3>' + data.person + '</h3>,<br/>Saat ini kami sedang offline, silahkan kunjungi kami kembali nanti'});
                } else {
                    io.emit('welcome-user', {roomID: data.roomID, person: data.person, message: 'welcome <h3>' + data.person + '</h3>,<br/>ada yang bisa kami bantu??'});
                }
                updateUser();
            }
            
        });
        function updateUser(){
            io.emit('welcome-admin', {users: customers});
        };
        socket.on('save-message', function(data){
            console.log(data);
            io.emit('new-message', {message: data});
        });
        socket.on('user-left', function(data){
            console.log(data);
            if(data.person.indexOf('admin')>= 0){
                user = user.filter(function(el){
                    return el.person !== data.person
                });
                // console.log(customers);
            } else {
                for(var i=0; i<customers.length; i++){
                    if(customers[i].roomID === data.roomID){
                        customers.splice(i, 1);
                    }
                }
                updateUser();
            }
        });
    });
}
const PRIVATE_ROOM = 'private';

export default class IOController {

    #io;
    #clients;
    #maxClients;

    constructor(io) {
        this.#io = io;
        this.#clients = new Map();
        this.#maxClients = 2;

    }

    //fonction d'écoute exécutée à la connexion d'un nouveau socket
    connectionListener(socket) {
        if (this.#clients.size >= this.#maxClients) {
            socket.emit('LimitReached');
            this.disconnectionWhenTooMany(socket);
        }
        else {
            console.log(`Connection established with ${socket.id}.`);
            this.setupListeners(socket);
        }
	    
    }

    setupListeners(socket) {
        socket.on('joinPrivate', () => this.joinPrivate(socket) );
        socket.on('disconnect', () => this.leave(socket) );
        socket.on('bye bye', () => this.leavingTheGame(socket) );

    }

    leave(socket) {
        console.log(`${socket.id} has been disconnected.`);
        this.#clients.delete(socket.id);
    }

    disconnectionWhenTooMany(socket) {
        socket.disconnect(true);
        console.log(`Server is already full : ${socket.id} has been disconnected.`);

    }

    
    joinPrivate(socket) {
        if (this.#clients.size < this.#maxClients) {
            // arrivée dans le jeu
            this.#clients.set(socket.id, socket);
            console.log(`${socket.id} has joined the game`);
            socket.join(PRIVATE_ROOM);
            socket.emit('welcome', this.#clients.size);
            this.#io.to(PRIVATE_ROOM).emit('newConnection', `User ${this.#clients.size} has just joined the game.`, 'server');
            console.log('nb clients = ', this.#clients.size);
            socket.on('want to start', () => this.startTheGame() );
            // evements du clavier
            socket.on('up', () => this.paddleMovedUp(socket));
            socket.on('down', () => this.paddleMovedDown(socket));
            socket.on('updown', () => this.paddleStopped(socket));
            // collision avec le mur
            socket.on('collision with left wall', () => this.leftCollision(socket));
            socket.on('collision with right wall', () => this.rightCollision(socket));

            // envoi de la balle
            socket.on('move the ball', () => this.firstMove(socket));

        }

    }

    /** whenever a paddle moved up */
    paddleMovedUp(socket) {
        console.log('The paddle moved up');
        socket.broadcast.emit('paddle moved up');
    }

    /** whenever the paddle moved down */
    paddleMovedDown(socket) {
        console.log('The paddle moved down');
        socket.broadcast.emit('paddle moved down');
    }

    /** broadcasts to all the connected users that their opponent paddle stopped */
    paddleStopped(socket) {
        console.log('The paddle stop');
        socket.broadcast.emit('paddle stopped');
    }

    leftCollision(socket) {
        console.log('The ball touched the left wall');
        this.#io.to(PRIVATE_ROOM).emit('adleft wall touched');
    }

    rightCollision(socket) {
        console.log('The ball touched the right wall');
        this.#io.to(PRIVATE_ROOM).emit('right wall touched');
    }

    firstMove(socket) {
        console.log('The 1st player has started the game');
        this.#io.to(PRIVATE_ROOM).emit('game has started');
    }

    
    startTheGame() {
        if (this.#clients.size == this.#maxClients) {
            this.#io.to(PRIVATE_ROOM).emit('start game');
        }
    }

    leavingTheGame(socket) {
        console.log(`${socket.id} has left the game.`);
        socket.to(PRIVATE_ROOM).emit('newDisconnection', 'A user has just left the game.', 'server');
        this.#io.to(PRIVATE_ROOM).emit('stop game');
        socket.leave(PRIVATE_ROOM);
        this.disconnectAll();

    }

    disconnectAll() {
        this.#clients.forEach((value) => {
            this.leave(value);
        });
    }




}

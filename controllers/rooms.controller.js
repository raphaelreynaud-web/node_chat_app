// CRUD for creating rooms

const Room = require('../models/room.model');

// Create and Save a new Room

exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Room name can not be empty"
        });
    }

    // Create a Room
    const room = new Room({
        name: req.body.name
    });

    // Save Room in the database
    room.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Retrieve and return all rooms from the database.

exports.findAll = (req, res) => {
    Room.find()
    .then(rooms => {
        res.send(rooms);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Find a single room with a roomId
exports.findOne = (req, res) => {
    Room.findById(req.params.roomId)
    .then(room => {
        if(!room) {
            return res.status(404).send({
                message: "Room not found with id " + req.params.roomId
            });            
        }
        res.send(room);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Room not found with id " + req.params.roomId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving room with id " + req.params.roomId
        });
    });
};

// Update a room identified by the roomId in the request
exports.update = (req, res) => {
    // Update room
    Room.findByIdAndUpdate(req.params.roomId, {
        name: req.body.name
    }, {new: true})
}

// Delete a room with the specified roomId in the request
exports.delete = (req, res) => {
    Room.findByIdAndRemove(req.params.roomId)
    .then(room => {
        if(!room) {
            return res.status(404).send({
                message: "Room not found with id " + req.params.roomId
            });
        }
        res.send({message: "Room deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Room not found with id " + req.params.roomId
            });                
        }
        return res.status(500).send({
            message: "Could not delete room with id " + req.params.roomId
        });
    });
};
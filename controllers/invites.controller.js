// create controller for invites table with create,read and delete methods

const Invites = require('../models/invites.model.js');
const crypto = require('crypto');
// Create and Save a new Invite
exports.create = (req, res) => {
    // Validate request
    if(!req.body.roomId) {
        return res.status(400).send({
            message: "Invite roomId can not be empty"
        });
    }

    // Create a Invite
    const invite = new Invites({
        roomId: req.body.roomId,
        inviteid: crypto.randomUUID(),
    });

    // Save Invite in the database
    invite.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while creating the Invite."
        });
    });
};

// read an invite with the param inviteid

exports.findOne = (req, res) => {
    Invites.findOne({inviteid: req.params.inviteid})
    .then(invite => {
        if(!invite) {
            return res.status(404).send({
                message: "Invite not found with id " + req.params.inviteid
            });            
        }
        res.send(invite);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Invite not found with id " + req.params.inviteid
            });                
        }
        return res.status(500).send({
            message: "Error retrieving invite with id " + req.params.inviteid
        });
    });
}

// delete an invite with the param inviteid

exports.delete = (req, res) => {
    Invites.findOneAndDelete({inviteid: req.params.inviteid})
    .then(invite => {
        if(!invite) {
            return res.status(404).send({
                message: "Invite not found with id " + req.params.inviteid
            });
        }
        res.send({message: "Invite deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Invite not found with id " + req.params.inviteid
            });                
        }
        return res.status(500).send({
            message: "Could not delete invite with id " + req.params.inviteid
        });
    });
};
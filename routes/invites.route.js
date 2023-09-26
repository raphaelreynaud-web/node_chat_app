const inviteController = require('../controllers/invites.controller');

const express = require('express');
const router = express.Router();
const jwtMiddleware = require("../middleware/jwt.middleware.js");

// Create a new Invite
router.post('/', jwtMiddleware ,inviteController.create);

// Retrieve a single Invite with inviteid
router.get('/:inviteid', jwtMiddleware, inviteController.findOne);

// Delete a Invite with inviteid
router.delete('/:inviteid', jwtMiddleware, inviteController.delete);

module.exports = router;
// create mongoose model for invites table

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitesSchema = new Schema({
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    inviteid : { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now, expires: 3600 }
})

module.exports = mongoose.model('Invites', invitesSchema);


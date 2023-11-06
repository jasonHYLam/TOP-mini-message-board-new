const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { DateTime }= require('luxon');

const MessageSchema = new Schema({
    message: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200,
    },
    author: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200,
    },
    timeAdded: {
        type: Date
    }
})

MessageSchema.virtual('time_added_formatted').get(function() {
    return DateTime.fromJSDate(this.timeAdded).toLocaleString(DateTime.DATETIME_SHORT)
})

module.exports = mongoose.model("Message", MessageSchema)
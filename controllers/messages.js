const Message = require('../models/message');
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const he = require('he');

exports.messages_get = asyncHandler(async(req, res, next) => {
    const all_messages = await Message.find({}).exec();
    console.log(all_messages)

    res.render('index', {
        messages: all_messages
    })
    
})

exports.form_get = asyncHandler( async (req, res, next) => {
   res.render("form") 
})

exports.form_post = [

    // Validate and sanitize the name field.

    body("message", "Write a message")
    .isLength({min: 1})
    .escape(),

    body("author", "Provide author name")
    .isLength({min: 1})
    .escape(),

    // Process request after validation and sanitization.
    asyncHandler( async (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a message object.
        const newMessage = new Message({
            message: he.decode(req.body.message),
            author: he.decode(req.body.author),
            timeAdded: new Date()
        })

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with previous values/error messages.
            res.render("form", {
                message: newMessage,
                errors: errors.array(),
            })
            return
        }
        else {
            // Data from form is valid. Save new message.
            await newMessage.save();
            // Redirect to all messages.
            res.redirect('/')
        }
})
]
const mongoose = require('mongoose');

const shippingAddress = mongoose.Schema({
    UserID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    EmailId: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    address_body: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address_type: {
        type: String,
        required: true
    }

})

const saveAddress = mongoose.model('SaveAddress', shippingAddress)

module.exports = saveAddress;
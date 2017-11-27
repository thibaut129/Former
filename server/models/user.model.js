var mongoose = require('mongoose')
validator = require('validator'),
mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;


// /**
//  * A Validation function for local strategy properties
//  */
// var validateLocalStrategyProperty = function (property) {
//     return ((this.provider !== 'local' && !this.updated) || property.length);
// };
//
/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};

var UserSchema = new Schema({
    // firstname: String,
    // lastname: String,
    // email: String,
    date: Date,
    // department: String,
    // option: String
    firstname: {
        type: String,
        trim: true,
        // default: '',
        // validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastname: {
        type: String,
        trim: true,
        // default: '',
        // validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    department: {
        type: String,
        trim: true
    },
    option: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: '',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    // username: {
    //     type: String,
    //     unique: 'Username already exists',
    //     required: 'Please fill in a username',
    //     lowercase: true,
    //     trim: true
    // },
    // profileImageURL: {
    //     type: String,
    //     default: 'modules/users/client/img/profile/default.png'
    // },
    // updated: {
    //     type: Date
    // },
    // provider: {
    //     type: String,
    //     required: 'Provider is required'
    // },
    // providerData: {},
    // additionalProvidersData: {},
    // created: {
    //     type: Date,
    //     default: Date.now
    // }
});


UserSchema.plugin(mongoosePaginate)
const Users = mongoose.model('User', UserSchema)

module.exports = Users;
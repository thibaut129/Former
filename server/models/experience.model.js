var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

var ExperienceSchema = new Schema({
    type: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    year: {
        type: Number,
        trim: true
    },
    coords: {
        longitude:{
            type: Number,
            default: 0

        },
        latitude:{
            type: Number,
            default: 0
        }
    },
    companyID: {
        type: Schema.ObjectId,
        ref: 'Company'
    },
    userID: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

ExperienceSchema.plugin(mongoosePaginate)
const Experiences = mongoose.model('Experience', ExperienceSchema)

module.exports = Experiences;
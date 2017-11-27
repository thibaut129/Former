var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

var ExperienceSchema = new Schema({
    company: {
        type: Schema.ObjectId,
        ref: 'Company'
    },
    location: {
        type: String,
        trim: true
    },
    user: {
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
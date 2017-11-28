var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        trim: true,
    },
    experienceID: {
        type: Schema.ObjectId,
        ref: 'Experience'
    },
    icon:{
        type: String,
        default: './assets/former-logo.jpg'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

CompanySchema.plugin(mongoosePaginate)
const Companies = mongoose.model('Company', CompanySchema)

module.exports = Companies;
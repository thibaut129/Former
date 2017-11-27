var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    icone:{
        type: String,
        default: './images/default-marker.jpg'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

CompanySchema.plugin(mongoosePaginate)
const Companies = mongoose.model('Company', CompanySchema)

module.exports = Companies;
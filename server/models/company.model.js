var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: {
        type: String,
        required: 'Veuillez préciser le nom de l\'entreprise',
        trim: true,
        unique: true
    },
    type: {
        type: String,
        trim: true,
    },
    experiencesID: {
        type: [Schema.ObjectId],
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
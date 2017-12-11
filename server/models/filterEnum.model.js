var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

var FilterEnumSchema = new Schema({
    name: {
        type: String,
        required: 'Veuillez préciser le nom du tag',
        trim: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

FilterEnumSchema.plugin(mongoosePaginate)
const FiltersEnum = mongoose.model('FilterEnum', FilterEnumSchema)

module.exports = FiltersEnum;
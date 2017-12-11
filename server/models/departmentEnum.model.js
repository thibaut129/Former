var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

var DepartmentEnumSchema = new Schema({
    name: {
        type: String,
        required: 'Veuillez préciser le nom du tag',
        trim: true,
        unique: true
    },
    option: {
        type: [String],
    },
    created: {
        type: Date,
        default: Date.now
    }
});

DepartmentEnumSchema.plugin(mongoosePaginate)
const DepartmentsEnum = mongoose.model('DepartmentEnum', DepartmentEnumSchema)

module.exports = DepartmentsEnum;
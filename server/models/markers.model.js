var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

var MarkerSchema = new Schema({
    coords: {
        longitude:{
            type: Number,
            default: 0,
            required: 'Please fill longitude'
        },
        latitude:{
            type: Number,
            default: 0,
            required: 'Please fill latitude'
        }
    },
    experiences: {
        type: [Schema.ObjectId],
        ref: 'Experience'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

MarkerSchema.plugin(mongoosePaginate)
const Markers = mongoose.model('Marker', MarkerSchema)

module.exports = Markers;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let City = new Schema(
    {
        __id: Schema.Types.ObjectId,
        name: String,
        hotels: [{type: Schema.Types.ObjectId, ref: 'Hotel'}]
    }
);

/**
 *
 * @type {Model}
 */
module.exports = mongoose.model('City', City);

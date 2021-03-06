const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Process = new Schema(
    {
        __id: Schema.Types.ObjectId,
        name: String,
        percent: Number,
        max: Number,
        current: Number,
        chunk: Number,
        perChunk: Number,
        eta: Number,
        index: Number,
        offsets: Array,
        running: Boolean,
        setOffset: String,
        status: Number,
        data: String,
        notPushed: Number,
        checkin: String,
        from: String,
        to: String,
        country: {type: Schema.Types.ObjectId, ref: 'Country'},
        freq: Array,
        city: { type: Schema.Types.ObjectId, ref: 'City'},
        createdAt: Date,
        updatedAt: Date
    }
);

/**
 *
 * @type {Model}
 */
module.exports = mongoose.model('Process', Process);

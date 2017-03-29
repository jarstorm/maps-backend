import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    // media: { type: Schema.Types.ObjectId, ref: 'Media' },
    // likes : [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    // comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // flags : [{ type: Schema.Types.ObjectId, ref: 'Flag' }]
    //_user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});

const MapModel = mongoose.model('Map', MapSchema);

export default MapModel;

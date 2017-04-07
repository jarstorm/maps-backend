import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const MapSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
     geo: {
       type: [Number],
       index: '2d',
       required: true
     },
    // media: { type: Schema.Types.ObjectId, ref: 'Media' },
    // likes : [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    // comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // flags : [{ type: Schema.Types.ObjectId, ref: 'Flag' }]
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
});

const MapModel = mongoose.model('Map', MapSchema);

export default MapModel;

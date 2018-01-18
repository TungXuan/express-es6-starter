import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  path: String,
  url: String,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('File', fileSchema);

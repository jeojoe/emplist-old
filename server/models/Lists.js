import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const listSchema = new Schema({
  is_temp_password: { type: Boolean, default: false, select: false },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  company_id: { type: String, default: '' },
  company_image: { type: String, default: '' },
  company_name: { type: String, required: true },
  company_email: { type: String, required: true },
  company_location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    detail: { type: String, required: true },
  },
  password: { type: String, required: true, select: false },
  allow_remote: { type: Boolean, default: false, required: true },
  skills: { type: [String], default: [] },
  title: { type: String, required: true },
  has_intern: { type: Boolean, default: false },
  has_equity: { type: Boolean, default: false },
  salary: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 9999999 },
  },
  details: { type: String, required: true },
  how_to_apply: { type: String, required: true },
});

// select: false -> exclude those fields on using find().
// If you really want to include it (e.g. to compare password and return user), read below:
// http://www.curtismlarson.com/blog/2016/05/11/mongoose-mongodb-exclude-select-fields/
//
// Alright, you're lazy, to force include do this:
//
// User.findOne({_id: userId}).select("+password")
export default mongoose.model('Lists', listSchema);

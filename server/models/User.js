import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  picturePath: {
    type: String,
    default: '',
  },
  friends: {
    type: Array,
    default: [],
  },
  coordinates: {
    type: Map,
    of: Number,
  },
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
}, { timestamps: true });

userSchema.index({ email: 1 }, {
  collation: {
    locale: 'en',
    strength: 2
  },
  unique: true
});

const User = mongoose.model('User', userSchema);
export default User;
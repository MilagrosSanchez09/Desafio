import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'usuario' 
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'carts',
  }
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  }catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema);

export { User };
import User from "../models/User";
import bcrypt from 'bcrypt';

export async function register(
  firstName,
  lastName,
  email,
  password,
  picturePath,
  friends,
  location,
  occupation
) {
  const existing = await User.findOne({ email })
    .collation({ locale: 'en', strength: 2 });

  if (existing) {
    throw new Error('Email is taken');
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: passwordHash,
    picturePath,
    friends,
    location,
    occupation
  });
  delete user.password;

  return createToken(user);
}

export async function login(email, password) {
  const user = await User.findOne({ email })
    .collation({ locale: 'en', strength: 2 });

  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect email or password');
  }

  return createToken(user);
}

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email
  };

  return {
    user,
    token: jwt.sign(payload, process.env.JWT_SECRET)
  };
}
import { login, register } from "../services/authService.js";

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      coordinates,
      occupation,
      linkedin
    } = req.body;

    const token = await register(
      firstName,
      lastName,
      email,
      password,
      picturePath,
      JSON.parse(coordinates),
      occupation,
      linkedin,
      Math.floor(Math.random() * 10000),
      Math.floor(Math.random() * 10000),
    );
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const token = await login(req.body.email, req.body.password);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.render("signup", {
      error: "Email is already registered. Please log in.",
    });
  }

  // Create a new user
  await User.create({
    name,
    email,
    password,
  });

  // Redirect to login after signup
  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  
  // Find user with matching email and password
  const user = await User.findOne({ email, password });

  if (!user) {
    // Render login page with error message
    return res.render("login", {
      error: "Invalid Email or Password",
    });
  }

  // Generate session ID and set user in session
  const sessionId = uuidv4();
  setUser(sessionId, user);

  // Set session ID in cookies
  res.cookie("uid", sessionId);

  // Redirect to homepage after successful login
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};

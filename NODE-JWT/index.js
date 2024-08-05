const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const port = 5000;
const secretkey = "nilu@2002";

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the server",
  });
});

// Login route
app.post("/login", (req, res) => {
    const user = {
      id: 1,
      username: "nilu",
      email: "nilu@gmail.com",
    };
  
    // Sign JWT token
    jwt.sign(
      { user },
      secretkey,
      {
        expiresIn: "30s",
      },
      (err, token) => {
        if (err) {
          // Handle error
          return res.status(500).json({
            error: "Error generating token",
          });
        }
  
        // Return token with Bearer prefix
        res.json({
          token: `Bearer ${token}`, // Add Bearer prefix here
        });
      }
    );
  });
  

// Profile route with token verification
app.post("/profile", verifyToken, (req, res) => {
  // After verifying the token, the profile can be accessed
  res.json({
    message: "Welcome to the profile page!",
    userData: req.user, // req.user is set in the verifyToken middleware
  });
});

// Token verification middleware
function verifyToken(req, res, next) {
  
  const bearerHeader = req.headers["authorization"];
  
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;

    // Verify token
    jwt.verify(req.token, secretkey, (err, authData) => {
      if (err) {
        res.status(403).json({
          error: "Token is not valid",
        });
      } else {
        // Add the decoded user to the request object
        req.user = authData.user;
        // Next middleware
        next();
      }
    });
  } else {
    // Forbidden
    res.status(403).json({
      error: "Token is not provided",
    });
  }
}

// Start the server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

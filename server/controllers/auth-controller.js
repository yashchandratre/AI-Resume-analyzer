// Home Controller
const User = require('../model/user_model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function getAuthPayload(req) {
  return req.body?.data || req.body || {};
}

function validateRegistration(payload) {
  const fname = String(payload.fname || "").trim();
  const email = String(payload.email || "").trim().toLowerCase();
  const password = String(payload.password || "");
  const password2 = payload.password2 === undefined ? password : String(payload.password2 || "");

  if (fname.length < 2 || fname.length > 80) {
    return { error: "Full name must be between 2 and 80 characters" };
  }

  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address" };
  }

  if (!passwordRegex.test(password)) {
    return {
      error: "Password must be at least 8 characters and include uppercase, lowercase, and a number",
    };
  }

  if (password !== password2) {
    return { error: "Passwords do not match" };
  }

  return { value: { fname, email, password } };
}

function validateLogin(payload) {
  const email = String(payload.email || "").trim().toLowerCase();
  const password = String(payload.password || "");

  if (!emailRegex.test(email) || !password) {
    return { error: "Please enter a valid email and password" };
  }

  return { value: { email, password } };
}

const home = async(req,res) =>{
    try {
        res.status(200).send("Auth Router")        
    } catch (error) {
        res.status(400).send({msg:"Page not found"})
    }
}

// Register Controller
const register = async(req,res)=>{
    try {
        const validation = validateRegistration(getAuthPayload(req));

        if (validation.error) {
          return res.status(400).json({ msg: validation.error });
        }

        const {fname,email,password} = validation.value;

        const isExist = await User.findOne({email});
        
        if (isExist){
            return res.status(409).json({msg:"User already exists"})
        }
        else{
          const hashedPassword = await bcrypt.hash(password,10);
          
          await User.create({
            fname,
            email,
            password:hashedPassword,
          })
          return res.status(201).json({msg:"User registered successfully"})
        }
        
    } catch (error) {
        res.status(500).send({msg:"Unable to register user"})
    }
}

// Login Controller

const login = async (req, res) => {
  try {
    const validation = validateLogin(getAuthPayload(req));

    if (validation.error) {
      return res.status(400).json({ msg: validation.error });
    }

    const { email, password } = validation.value;

    const userData = await User.findOne({ email });
    if (!userData) return res.status(401).json({ msg: "Invalid credentials" });
    
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: "Authentication is not configured" });
    }
    
    // JWT contains only the minimum identity/role data. The middleware still
    // re-loads the user from MongoDB so changed admin permissions take effect.
    const token = jwt.sign(
      { id: userData._id, email: userData.email, isAdmin: userData.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    );

    res.cookie("token",token,{
      httpOnly:true,
      sameSite:"lax",
      secure: process.env.NODE_ENV === "production",
      maxAge:60 * 60 * 1000
    });

    return res.json({
      msg: "Login successful",
      token,
      user: {
        id: userData._id,
        fname: userData.fname,
        email: userData.email,
        isAdmin: userData.isAdmin,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: "Error logging in", error: err });
  }
}


async function authMiddleware(req, res, next) {
  // Accept tokens from either the Authorization header or the httpOnly cookie.
  // Frontend axios sends "Bearer <token>"; browser cookies work as fallback.
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader || req.cookies?.token;

  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) return res.status(401).json({ msg: "User not found" });

    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
}

function adminMiddleware(req, res, next) {
  // Every /api/admin route passes through this check. A signed-in normal user
  // can use store routes, but cannot access admin data unless isAdmin is true.
  if (!req.user?.isAdmin) {
    return res.status(403).json({ msg: "Admin access required" });
  }

  next();
}

const me = async (req, res) => {
  return res.json({ user: req.user });
};



module.exports = {home,register,login,authMiddleware,adminMiddleware,me};

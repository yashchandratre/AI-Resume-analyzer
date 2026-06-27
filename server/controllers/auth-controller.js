// Home Controller
const User = require('../model/user_model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        const {fname,email,password} = req.body.data;

        const isExist = await User.findOne({email});
        
        if (isExist){
            res.status(400).json({msg:"User already Exist"})
        }
        else{
          const hashedPassword = await bcrypt.hash(password,10);
          
          await User.create({
            fname,
            email,
            password:hashedPassword,
          })
          return res.status(200).json({msg:"User Registerd Sucessfully"})
        }
        console.log(req.body);
        
    } catch (error) {
        res.status(400).send({msg:"page not found"})
    }
}

// Login Controller

const login = async (req, res) => {
  try {
    const { email, password } = req.body.data;

    const userData = await User.findOne({ email });
    if (!userData) return res.status(400).json({ msg: "User not found" });
    console.log(userData);
    
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    
    // JWT contains only the minimum identity/role data. The middleware still
    // re-loads the user from MongoDB so changed admin permissions take effect.
    const token = jwt.sign(
      { id: userData._id, email: userData.email, isAdmin: userData.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(token);
    res.cookie("token",token,{
      httpOnly:true,
      sameSite:"lax",
      secure:false,
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

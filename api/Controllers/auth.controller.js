import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../Library/prisma.js";

// Register
export const register = async (req, res) => {
  // console.log("register");
  const { username, email, password } = req.body;
  
  try {
    // HASH PASSWORD (Encrypted)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DATABASE
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

// Login
export const login = async (req, res) => {
  // console.log("login");
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });


    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")  // Generate cookie Token and send 
    const age = 1000 * 60 * 60 * 24 * 7;   // 1 week
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );
    
    const { password: userPassword, ...userInfo } = user;
    
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,  // because using localhost
        maxAge: age,    // for preventing session (1 week)
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};


// Logout
export const logout = (req, res) => {
  // console.log("logout");
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
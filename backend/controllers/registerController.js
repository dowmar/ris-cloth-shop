import {
  registerUser,
  checkDuplicateUser,
  createUserRole,
} from "../services/registerService.js";

import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { user, pwd, email, login_type } = req.body;
  // if (login_type && login_type === "email_auth") {
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  // }
  const duplicate = await checkDuplicateUser(email);
  console.log("dup len", duplicate.length);
  if (duplicate.length >= 1)
    return res.status(409).json({ error: "duplicate" });
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const results = await registerUser(user, hashedPwd, email, login_type);
    const role = "user";
    const insertRole = await createUserRole(email, role);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

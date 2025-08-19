import bcrypt from "bcrypt";

export const encodePassword = async (password) => {
  let salt = await bcrypt.genSalt(parseInt(process.env.SALT) || 10);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const decodePassword = async (userPassword, storedPassword) => {
  const result = await bcrypt.compare(userPassword, storedPassword);
  return result;
};

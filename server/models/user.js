const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  cat: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cat",
    },
  ],
  image: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
module.exports = User;

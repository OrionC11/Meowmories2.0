const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const catSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  image: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

const Cat = model("Cat", catSchema);
module.exports = Cat
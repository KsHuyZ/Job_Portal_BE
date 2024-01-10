const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "first name is required"],
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "last name is required"],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "e-mail is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      minlength: [6, "password must have at least (6) caracters"],
    },

    role: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: false,
    },
    company: {
      type: ObjectId,
      ref: "Company",
      required: false,
    },
  },
  { timestamps: true }
);

//encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// return a JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, "Dangloan");
};

module.exports = mongoose.model("User", userSchema);

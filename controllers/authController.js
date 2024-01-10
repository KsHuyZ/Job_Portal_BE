const companyModel = require("../models/companyModel");
const jobHistoryModel = require("../models/jobHistoryModel");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const { sendMail } = require("../utils/sendMail");

exports.signup = async (req, res, next) => {
  const { email, firstName, company, role } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("E-mail already registred", 400));
  }
  try {
    let user;
    if (role === 0) {
      user = await User.create({ ...req.body, company: null });
    } else {
      const companyExist = await companyModel.findOne({ company });
      if (companyExist) {
        user = await User.create({ ...req.body, company: companyExist });
      } else {
        const newCompany = await companyModel.create({ company });
        user = await User.create({ ...req.body, company: newCompany });
      }
    }

    const welcomeText = `Welcome ${firstName} to Job Portal`;
    const fullUrl = req.protocol + "://" + req.get("host");
    const htmlForm = `<div>
    <h1>Welcome to Job Portal!</h1>
	<p>Thank you for joining our website. We are excited to have you on board!</p>
  <a href="${fullUrl}/api/user/active/${user._id}">Active account</a>
    </div>`;
    sendMail(email, welcomeText, htmlForm);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email) {
      return next(new ErrorResponse("please add an email", 403));
    }
    if (!password) {
      return next(new ErrorResponse("please add a password", 403));
    }

    //check user email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("invalid credentials", 400));
    }
    if (!user.active) {
      return next(new ErrorResponse("Please active account in email!", 400));
    }
    //check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("invalid credentials", 400));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res.status(codeStatus).json({
    success: true,
    role: user.role,
    token,
    user,
  });
};

// log out
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

// user profile
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  const jobHistory = await jobHistoryModel.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    user,
    jobHistory,
  });
};

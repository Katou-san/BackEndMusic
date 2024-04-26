const HandleErrors = {
  isEmail: (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  },
  CheckLenght: (value) => {
    return value.trim().length > 4;
  },
  isNotEqual: (value1, value2) => {
    return value1 === value2;
  },
};

const Validate_Login = (email, pass) => {
  const Error = {};
  let status = false;
  if (!HandleErrors.isEmail(email)) {
    Error["email"] = "Is not a valid email";
    status = true;
  }
  if (pass !== "none") {
    if (!HandleErrors.CheckLenght(pass)) {
      Error["pass"] = "Please enter password";
      status = true;
    }
  }
  return { status, Error };
};

const Validate_SignUp = (email, name, pass, confirmPass) => {
  const Error = {};
  let status = false;
  if (!HandleErrors.isEmail(email)) {
    Error["email"] = "Is not a valid email";
    status = true;
  }
  if (!HandleErrors.CheckLenght(name)) {
    Error["name"] = "name need more than 4 characters";
    status = true;
  }

  if (!HandleErrors.CheckLenght(pass)) {
    Error["pass"] = "Please enter password";
    status = true;
  }

  if (!HandleErrors.isNotEqual(pass, confirmPass)) {
    Error["ConfirmPass"] = "Confirm password not match";
    status = true;
  }

  return { status, Error };
};

const Validate_Employess = (email, name, pass) => {
  const Error = {};
  let status = false;
  if (!HandleErrors.isEmail(email)) {
    Error["email"] = "Is not a valid email";
    status = true;
  }
  if (!HandleErrors.CheckLenght(name)) {
    Error["name"] = "name need more than 4 characters";
    status = true;
  }

  if (!HandleErrors.CheckLenght(pass)) {
    Error["pass"] = "Please enter password";
    status = true;
  }

  return { status, Error };
};

module.exports = { Validate_Login, Validate_SignUp, Validate_Employess };

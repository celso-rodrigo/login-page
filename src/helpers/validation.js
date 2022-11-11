import * as e from "../helpers/problemList";

export const validateUsername = (username) => {
  const pattern = /^[a-z0-9_-]{3,15}$/;
  if(username.length <= 2) return e.SHORT_NAME;
  if(username.length > 15) return e.LONG_NAME;
  if(!pattern.test(username)) return e.INVALID_NAME;
  return "";
};

export const validateEmail = (email) => {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if(!pattern.test(email)) return e.INVALID_EMAIL;
  return "";
};

export const validatePassword = (password) => {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,15}$/;
  if(password.length <= 7) return e.SHORT_PASSWORD;
  if(password.length > 15) return e.LONG_PASSWORD;
  if(password.search(/[0-9]/) === -1) return e.NO_NUMBER_PASSWORD;
  if(password.search(/[A-Z]/) === -1) return e.NO_UPPERCASE_PASSWORD;
  if(password.search(/[a-z]/) === -1) return e.NO_LOWERCASE_PASSWORD;
  if(!pattern.test(password)) return e.INVALID_PASSWORD;
  return "";
};

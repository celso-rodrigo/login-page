export const validateUsername = (username) => {
  const pattern = /^[a-z0-9_-]{3,15}$/;
  return username.match(pattern) !== null;
};

export const validateEmail = (email) => {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return email.match(pattern) !== null;
};

export const validatePassword = (password) => {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,15}$/;
  return password.match(pattern) !== null;
};
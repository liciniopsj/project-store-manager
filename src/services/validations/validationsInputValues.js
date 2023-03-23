const { nameSchema } = require('./schemas');

const validateName = (name) => {
  const { error } = nameSchema.validate(name);

  if (error) {
    return {
      type: 'INVALID_NAME_LENGTH',
      message: '"name" length must be at least 5 characters long',
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateName,
};

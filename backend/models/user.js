const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(str) {
        return /^(https?:\/\/)(www.)?[^\s]+(#?)$/i.test(str);
      },
      message: () => 'url is not valid',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(str) {
        return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/i.test(str);
      },
      message: () => 'email is not valid',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);

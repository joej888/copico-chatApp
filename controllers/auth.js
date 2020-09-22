const jwt = require('jsonwebtoken');
const io = require('../socket');
const User = require('../models/user');

////****** Functionality for loging into the application is done here 
////****** and token is send back to client
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      io.getIO().emit('noUser');
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user.dataValues;
    if (password !== user.password) {
      io.getIO().emit('passwordError');
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        name: loadedUser.name,
        id: loadedUser.id
      },
      process.env.SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: loadedUser.id });
    var username = loadedUser.name
    var userId = loadedUser.id
    io.getIO().emit('setToken', (token));
    io.getIO().emit('loggedIn', { username, userId });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
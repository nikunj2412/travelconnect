const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const config = require('./config');
const User = require('../models/user');

const jwtOptions = {
  secretOrKey: 'QDw^d2+qu/!2?~Uf',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};

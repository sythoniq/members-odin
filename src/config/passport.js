const bcrypt = require('bcryptjs')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/query')

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await db.getUser(username);
    const result = await bcrypt.compare(password, user.hash);

    if (!user) {
      return done(null, false, {message: "User not found"})
    } 
    if (!result) {
      return done(null, false, {message: "Invalid Password"})
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id); 

    done(null, user);
  } catch(err) {
    done(err);
  }
});

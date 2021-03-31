const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

//the first argument is whatever is returned from the User.findOne callback
//existingUser or new user
passport.serializeUser((user, done) => {
  //the second argument here is the id assigned to the user object by mongoDB.
  done(null, user.id);
});

//turn an id into a mongoose model instance
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//creates a new instance of the google passport strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //we already have a record with the given profile id
        //first argument is any error, the second is the user we found
        done(null, existingUser);
      }

      //we don't have a user record with this ID, make a new record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

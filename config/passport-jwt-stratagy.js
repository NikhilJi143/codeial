const passport = require('passport');
const JWTStratagy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeial'
}

passport.use(new JWTStratagy (opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log('Error in finding user from JWT');
        }else if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
}));

module.exports = passport;
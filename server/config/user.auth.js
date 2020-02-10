const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Report = require("../models/reportDetails");
const secret = require("./config").SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = secret;

module.exports = passports => {
  passports.use(
    "admin",
    new JwtStrategy(opts, (jwt_payload, done) => {
      Report.findById(jwt_payload.id)
        .then(team => {
          if (team) {
            return done(null, team);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    })
  );
};

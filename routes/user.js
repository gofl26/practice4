const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const mykey = fs.readFileSync(path.resolve(__dirname, '../key.txt')).toString();


router.get('/kakao', passport.authenticate('kakao'));

const kakaoCallback = (req, res, next) => {
  passport.authenticate(
    "kakao",
    { failureRedirect: "/" },
    (err, user, info) => {
      if (err) return next(err);
      console.log("콜백~~~")
      const { email, nickname } = user;
      const token = jwt.sign({ email, nickname }, mykey);
     
      result = {
        token,
        email: email,
        nickname: nickname,
      };
      console.log(result)
      res.send({ user: result });
    }
  )(req, res, next);
};
router.get("/callback/kakao", kakaoCallback);
module.exports = router;
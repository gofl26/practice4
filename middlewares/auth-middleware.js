const jwt = require('jsonwebtoken');
const { User } = require('../schemas');
const fs = require('fs');
const path = require('path');
const mykey = fs.readFileSync(path.resolve(__dirname, '../key.txt')).toString();

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({
            errorMEssage: '로그인 후 사용하세요',
        });
        return;
    }
    const [tokenType, tokenValue] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요!',
        });
        return;
    }

    //jwt검증//
    try {
        const { email } = jwt.verify(tokenValue, mykey);
        //검증 성공시 locals에 인증 정보 넣어주기//
        console.log(email);
        User.findOne({ email }) //mongodb면 findOne을 사용 exec() 추가해야함
            .exec()
            .then((user) => {
                res.locals.user = user;
                next();
            });
    } catch (error) {
        res.status(401).send({
            errorMEssage: '로그인 하시고 사용하세요',
        });
        return;
    }
};

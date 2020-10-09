/**
 * UserController
 */
const db = require('../../config/dbConfig');

class userController {

    async goLogin(req, res, next) {
        try {
            const USER_ID = req.body.USER_ID;
            const USER_PW = req.body.USER_PW;

            let userData = await db("SELECT * FROM USERS WHERE USER_ID = ? AND USER_PW = ? ", [USER_ID, USER_PW]);

            req.session.USER_ID = userData[0].USER_ID;
            req.session.USER_NAME = userData[0].USER_NAME;
            next();

        } catch (error) {
            console.log(error)
            res.send(
                `<script type="text/javascript">
                alert("정보를 똑바로 입력하세요"); 
                location.href='/users/login';
                </script>`
            );

        }


    }

    async goSign(req, res, next) {

        try {

            const USER_ID = req.body.USER_ID;
            const USER_PW = req.body.USER_PW;
            const USER_NAME = req.body.USER_NAME;

            if (req.body.USER_ID == '' || req.body.USER_PW == '' || req.body.USER_NAME == '') {
                res.send(
                    `<script type="text/javascript">
                    alert("정보를 똑바로 입력하세요"); 
                    location.href='./sign';
                    </script>`
                );
            } else {
                let signData = await db("INSERT INTO USERS SET ?", {
                    USER_ID: USER_ID,
                    USER_PW: USER_PW,
                    USER_NAME: USER_NAME
                });

                if (signData.errno == 1062) {
                    res.send(`<script type="text/javascript">
                alert("이미 사용중인 아이디 입니다."); 
                location.href='./signup';
                </script>`);
                } else {
                    next()
                }
            }

        } catch (error) {
            console.log(error)
        }


    }


    async goLogout(req, res, next) {
        req.session.destroy();
        res.clearCookie('USER_ID');
        next();
    }

}

module.exports = userController;
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
            console.log(USER_ID)
            next();

        } catch(error) {
            console.log(error)
           
        }
    
        
    }

    async goSign(req, res, next) {
        var { USER_ID, USER_PW, USER_NAME} = req.body;

        console.log(req.body);

        pool.getConnection((err, conn) => {

            var sql = `INSERT INTO USERS VALUES("${USER_ID}", "${USER_PW}", "${USER_NAME}")`;

            conn.query(sql, function(err, row) {
                if(err) console.log('query is not excuted. insert fail...\n' + err);
                else {
                    next();
                }
            });
        });
    
        
    }
    
    async account(req, res, next) {
        next();
    }
    
    async goLogout(req, res, next) {
        req.session.destroy();
        res.clearCookie('USER_ID');
        next();
    }
  
}

module.exports = userController;

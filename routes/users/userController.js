/**
 * UserController
 */
const pool = require('../../config/dbConfig');

class userController {

    async goLogin(req, res, next) {
        var { USER_ID, USER_PW} = req.body;

        pool.getConnection((err, conn) => {
            var sql = `SELECT * FROM USERS WHERE USER_ID = "${USER_ID}" AND USER_PW = "${USER_PW}"`;
    
            conn.query(sql, function(err, row) {
                if(err) console.log('query is not excuted. insert fail...\n' + err);
                else {
                    req.session.USER_ID = row[0].USER_ID;
                    next();
                }

                
            });
        });
    
        
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
    
    async goLogout(req, res, next) {
        req.session.destroy();
        res.clearCookie('USER_ID');
        next();
    }
  
}

module.exports = userController;

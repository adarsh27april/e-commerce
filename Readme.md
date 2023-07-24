## Structure of config.env

```bash
PORT = 9876
DB_URI='mongodb://localhost:27017/ecommerce'

JWT_SECRET=thisIsMySceretKey_Adarsh
JWT_EXPIRE=5d # this denotes 5 days, in format defined by the jwt.sign() ,method .

COOKIE_EXPIRE=5 
# set the number of days after which cookie will expire it has to be converted to ms though.

SMTP_SERVICE="gmail or outlook or tuanota"
SMPT_MAIL="temp_mail_for_e-comm_6pp@gmail.com" # the email id from which the email will be sent
SMTP_PASSWORD="password_for_smtp_mail" # password of the above email id.
```



Backend User & Password Authentication
 * User Registration
 * Encrypting Password bcryptjs
 * User Login
 * JWT token generation
 * User Authentication using JWT before providing access to specific routes.
 
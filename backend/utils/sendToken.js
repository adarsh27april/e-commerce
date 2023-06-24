// creating token & saving it in cookie.

const sendToken = (user, statusCode, message, res) => {
   const token = user.get_JWT_Token();

   // options for cookie.
   const options = {
      expires: new Date(
         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000// in millissec
      ),
      httpOnly: true,
   }
   res.status(statusCode)
      .cookie('token', token, options)
      .json({
         success: true,
         message,
         user,
         token
      })
}


module.exports = sendToken;

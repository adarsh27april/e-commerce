
module.exports = (catchAsyncError) => (req, res, next) => {
   Promise
      .resolve(catchAsyncError(req, res, next))
      .catch((e) => {
         console.log("error inside catchAsyncErrors");
         next(e) // ⚠ e was mising from here because of my below experiments and it wasted my 2 hours
         /**
          * Wisdom 🤔 📓:
          * when calling next() : middleware is passed 3 parameters => req, res, next
          * when calling next(e) : middleware is passed 4 parameters => e, req, res, next
          * in ExpressJS `next` is just a name of whichever function is to be called after current function.
          * 
          * ∵ errorMiddleware in error.js has 4 args (err,req,res,next) ∴ ExpressJS calls it.
          */
      });
   /**
    * Note that the above catch statement is similar to
    * catch(next)
    */
}

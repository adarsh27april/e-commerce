class API_Features {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
      console.log("inside apiFeatures.js");
   }

   search() {
      const keyword = this.queryStr.keyword ? {
         name: {
            $regex: this.queryStr.keyword,// regex will match for keyword in the value of key `name`. ex 'samosa' in `samosamosa` is `true` & `samosa` in `samosa` is `true`
            $options: "i",// case insensitive. by default it is case senstitve.
         }
      } : {}// keyword nahi hai to it will be empty and hence find function will return everything ∵ find() is same as find({}) in mongodb
      // console.log("from search(), keyword: ", keyword);
      this.query = this.query.find({ ...keyword })
      // at the end query me array of objects hai jo find() ka o/p hai.
      return this;
   }

   filter() {
      const queryCopy = { ...this.queryStr }; // ∵ in JS normaly object is passed as reference and not entire object is copied hence we are doing a deep copy.
      // Removing some field for category.
      const removeFields = ["keyword", "page", "limit"];
      // keywords hm search me pehle hi le rhe hai
      // page kaun se page pe hai
      // console.log("from filter(), queryCopy: ", queryCopy);
      removeFields.forEach(key => delete queryCopy[key])

      // Filter for price & rating

      // console.log(queryCopy);
      //initial : { category: 'laptop', price: { gt: '2000', lt: '1000' } }

      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
      /**gt:greater than, lt : less than, gte: greater than equal, lte: less than equal
       * 1st Arg : It's a regular expression " /\b(gt|gte|lt|lte)\b/g " everything present in () is to be replaced with the 2nd arg.
       * 2nd Arg : replace " key " with " $key " ,i.e., " gt " with " $gt " and so on.
      */

      queryStr = JSON.parse(queryStr)
      //finally : { category: 'laptop', price: { '$gt': '2000', '$lt': '1000' } }

      this.query = this.query.find(queryStr);
      return this;
   }

   pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;// queryStr is the object we receive as quuery string from api call

      const skip = resultPerPage * (currentPage - 1);
      // number of prod to skip, ex: 50 total prod, 5 prod per page => 3rd page => show from 11th prod => skip 10 prods.
      // curr page=2, res per page=5, skip = 5*(2-1)=5 skip 5 prods & show from 6th prod.

      this.query =
         this.query
            .limit(resultPerPage)
            .skip(skip)

      return this;
   }
}

module.exports = API_Features;

# Setup

Start a new Vite React Frontend server
install following packages, usage will be discussed later.

 * @reduxjs/toolkit
 * react-redux
 * axios
 * @smastrom/react-rating
 * react-helmet
 * overlay-navbar
 * react-icons
 * react-router-dom
 * webfontloader : to load web fonts from google and other sites


# React Router setup
ref : https://blog.logrocket.com/react-router-v6-guide/

# Redux Setup

https://youtu.be/60ELggkwLHc?si=RnKbCQI85JcVKpkb

https://www.traversymedia.com/blog/mern-crash-course-part-2

https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics

Create a folder `redux` in the src of Frontend.

Create `store.js` and configure it.
ref : https://redux.js.org/introduction/why-rtk-is-redux-today#what-does-redux-toolkit-do

Create folder `slices`
ref : https://www.traversymedia.com/blog/mern-crash-course-part-2
 - Create `apiSlice.js` & `productApiSlice.js`
 - inside endpoints in `productApiSlice.js` create the builder query(for GET req) or mutation(for POST, PUT, DELETE reqs.) functions.
 - For everyEndpoint we will have access to a hook by name of  say useGetAllProductsQuery for endpoint say getAllProducts. this hook will be used in `Home.jsx` component and will provide access to the states like : 
   > `data`, `isLoading`, `isError`, `isFetching`, `isSuccess` using them we can display daat on the components

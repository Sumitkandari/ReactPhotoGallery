import { configureStore } from "@reduxjs/toolkit";
import ActivityContext from "./Context.js"
const store=configureStore({
    reducer:{
        root:ActivityContext
    }
})
export default store;
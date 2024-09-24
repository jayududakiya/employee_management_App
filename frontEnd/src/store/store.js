import { configureStore } from "@reduxjs/toolkit";

import userInfoSlice from "../features/userInfo.Slice";
import employeesInfoSlice from "../features/employeesInfoSlice";

export const store = configureStore({
    reducer : {
        userInfo : userInfoSlice,
        employeesInfo :employeesInfoSlice
    }
});
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./views/GeneralView/components/SignIn";
import SignUp from "./views/GeneralView/components/SignUp";
import TravelRecommender from "./views/GeneralView/TravelRecommender";
import LogForm from "./views/GeneralView/LogForm";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TravelRecommender> <LogForm isOpen={false}><SignIn /></LogForm > </TravelRecommender>} />
            <Route path="/signin" element={<TravelRecommender> <LogForm isOpen={true}><SignIn /></LogForm ></TravelRecommender> } />
            <Route path="/signup" element={<TravelRecommender> <LogForm isOpen={true}><SignUp /></LogForm ></TravelRecommender> } />
        </Routes>
    );
};

export default AppRoutes;
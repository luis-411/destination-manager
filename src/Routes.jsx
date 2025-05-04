import React from "react";
import { Routes, Route } from "react-router-dom";
import TravelRecommender from "./views/GeneralView/TravelRecommender";
import AuthForm, {AuthPaths} from "./views/GeneralView/AuthForm";
const AppRoutes = () => {
    return (
      <>
        <AuthForm />
        <Routes>
          <Route path="/" element={<TravelRecommender />} />
          <Route path={AuthPaths.SIGN_IN} element={<TravelRecommender />} />
          <Route path={AuthPaths.SIGN_UP} element={<TravelRecommender />} />
          <Route path="/public-list/:link" element={<TravelRecommender />} />
        </Routes>
      </>
    );
};

export default AppRoutes;
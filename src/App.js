import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoadCountriesTask from "./tasks/LoadCountriesTask";
import Loading from "./views/GeneralView/Loading";
import useTravelRecommenderStore from "./store/travelRecommenderStore";
import AppRoutes from "./Routes";
import {useFavourites} from "./components/FavouriteTag";
import {useAuthContext} from "./context/AuthContext";
const App = () => {
  const [fileRetrieved, setFileRetrieved] = useState([]);
  const { countries, setCountries, setResults, userData } = useTravelRecommenderStore();
  
  const load = () => {
    const loadCountriesTask = new LoadCountriesTask();
    loadCountriesTask.load(setFileRetrieved);
  };
  const calculateScores = () => {
    if (fileRetrieved.length > 0) {
      const loadCountriesTask = new LoadCountriesTask();
      loadCountriesTask.processCountries(
        fileRetrieved,
        userData,
        setCountries,
        setResults
      );
    }
  };
  useEffect(load, []);
  useEffect(calculateScores, [userData, fileRetrieved, setCountries, setResults]);
  const auth = useAuthContext();
  const { fetch } = useFavourites();


  useEffect(() => {
    if (auth.user?.id) {
      // console.log(auth.user);
      fetch(auth.user.id);
    }
  }, [auth.user]);

  return (
    <div style={{ height: "100vh" }}>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <AppRoutes/>
      )}
    </div>
  );
};

export default App;

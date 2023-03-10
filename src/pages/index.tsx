import {
    Routes,
    Route
  } from "react-router-dom";
import ModelPage from "./model";
import MonitorPage from "./monitor";

  export default function RouterNavigator() {
    // Manage the routing of the pages
    return (
      <Routes>
            <Route  path="/" element={
                <ModelPage />
            }/>
            <Route  path="/model" element={
                <ModelPage />
            }/>
            <Route  path="/monitor" element={
                <MonitorPage/>
            }/>
      </Routes>
    );
  }

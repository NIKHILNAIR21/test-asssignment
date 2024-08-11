import { useEffect, useState, useMemo } from "react";
import CelebrityList from "./components/CelebrityList";
import SearchBar from "./components/SearchBar";
import "./App.css";
import { CelebrityProvider } from "./context/CelebrityContext";

function App() {
  return (
    <CelebrityProvider>
      <div className="container mx-auto p-4">
        <SearchBar />
        <CelebrityList />
      </div>
    </CelebrityProvider>
  );
}

export default App;

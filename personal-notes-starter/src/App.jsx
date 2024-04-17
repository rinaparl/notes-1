import React from "react";
import { Link, Route, Routes } from 'react-router-dom';
import NavBar from "./components/layout/NavBar";
import NavAdd from "./components/layout/NavAdd";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import ArchivPageWrapper from "./pages/ArchivPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to="/">Aplikasi Catatan</Link>
        </h1>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archives" element={<ArchivPageWrapper />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

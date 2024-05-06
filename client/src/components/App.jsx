import MessageForm from "./MessageForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Forum from "./Forum";
import Footer from "./Footer";
import "./CSS/app.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/message" element={<MessageForm />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

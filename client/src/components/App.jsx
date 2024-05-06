import MessageForm from "./MessageForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Forum from "./Forum"

export default function App() {
  return (
    <>
      <BrowserRouter>
      {/* <UserProvider>

      </UserProvider> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/message" element={<MessageForm />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

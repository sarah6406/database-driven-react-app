import { Link } from "react-router-dom";
import "./CSS/nav.css";
export default function Nav() {
  return (
    <>
      <Link to="/" className="nav">
        Home
      </Link>{" "}
      |{" "}
      <Link to="/message" className="nav">
        Messages
      </Link>{" "}
      |{" "}
      <Link to="/forum" className="nav">
        Forum
      </Link>
    </>
  );
}

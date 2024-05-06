import { useState, useEffect } from "react";
import Nav from "./Nav";
import "./CSS/forum.css";
import Options from "./Options";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Forum() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    getMessagesFromDB();
  }, []);

  function filterMessages(value) {
    const filter = value == 0 ? "" : value;
    getMessagesFromDB(filter);
  }

  async function getMessagesFromDB(filter = "") {
    const res = await fetch(`${VITE_API_URL}/forum/${filter}`);
    const data = await res.json();
    setMessage(data.reverse());
  }

  return (
    <div>
      <h1>Forum</h1>
      <Nav />
      <Options filter={filterMessages} />
      {message.map((message) => {
        return (
          
            <div key={message.id} className="post">
              <h2>
                {message.name} is {message.age}, and says...
              </h2>
              <ul>
                <li>{message.message}</li>
              </ul>
              <div className="italic">
                Category:
                {message.favethings.map((favething) => (
                  <p key={favething}>{favething}</p>
                ))}
              </div>
            </div>
            
          
        );
      })}
    
    </div>
  );
}

import { useState, useEffect } from "react";
import Nav from "./Nav";
import "./CSS/forum.css";
import Options from "./Options";

export default function Forum() {
  // const [messageForm, setMessageForm] = useState({
  //     name: "",
  //     // age: "",
  //     message: "",
  //     // category: "",
  //   });

  const [message, setMessage] = useState([]);
  useEffect(() => {
    getMessagesFromDB();
  }, []);

  function filterMessages(value) {
    const filter = value == 0 ? "" : value;
    getMessagesFromDB(filter);
  }

  async function getMessagesFromDB(filter = "") {
    const res = await fetch(`http://localhost:8080/forum/${filter}`);
    const data = await res.json();
    setMessage(data.reverse());
  }

 

  //   function deleteMessage(e) {
  //     e.preventDefault();
  //     fetch("http://localhost:8080/forum", {
  //       method: "DELETE",
  //       body: JSON.stringify(messageForm),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   }

  //   function handleChange(e) {
  //     setMessageForm({ ...messageForm, [e.target.name]: e.target.value });
  //   }

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
              Related to:
              {message.favethings.map((favething) => (
                <p key={favething}>{favething}</p>
              ))}
              {/* <button onSubmit={deleteMessage} >Delete post</button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

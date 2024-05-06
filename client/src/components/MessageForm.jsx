import { useState, useRef } from "react";
import "./CSS/messageform.css";
import Nav from "./Nav";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function MessageForm() {
  const [messageForm, setMessageForm] = useState({
    name: "",
    age: "",
    message: "",
    favethings: "",
  });

  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${VITE_API_URL}/forum`, {
      method: "POST",
      body: JSON.stringify(messageForm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessageForm({ name: "", age: "", message: "", favethings: "" });
    formRef.current.reset();

    console.log(await response.json());
  }

  function handleChange(e) {
    setMessageForm({ ...messageForm, [e.target.name]: e.target.value });
  }

  return (
    <>
      <h1>Messages</h1>
      <Nav />
      <form ref={formRef} className="form" onSubmit={handleSubmit}>
        <p>Tell me about your favourite thing!</p>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name..."
          onChange={handleChange}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          placeholder="Age..."
          onChange={handleChange}
        />
        <label htmlFor="message">Message:</label>
        <textarea
          type="text"
          name="message"
          id="message"
          placeholder="Message..."
          onChange={handleChange}
        />
        <label htmlFor="category">What is this message related to?</label>
        <select name="favethings" id="category" onChange={handleChange}>
          <option value="1" name="category" id="option">
            Food
          </option>
          <option value="2" name="category" id="option">
            Nature
          </option>
          <option value="3" name="category" id="option">
            Music
          </option>
          <option value="4" name="category" id="option">
            Sports
          </option>
          <option value="5" name="category" id="option">
            Tech
          </option>
          <option value="6" name="category" id="option">
            Animals
          </option>
        </select>
        <button id="button">Submit message!</button>
        
      </form>
      <p>Go to the Form page and check out other posts!</p>
    
    </>
  );
}

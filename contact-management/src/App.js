import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h1>Contact Management</h1>
      <ContactForm fetchContacts={fetchContacts} />
      <ContactTable contacts={contacts} fetchContacts={fetchContacts} />
    </div>
  );
}

export default App;

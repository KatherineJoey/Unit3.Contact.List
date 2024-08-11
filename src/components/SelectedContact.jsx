import React, { useState, useEffect } from "react";

export default function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
        if (selectedContactId) {
            try {
                const response = await fetch(
                    `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
                );
                const result = await response.json();
                setContact(result);
                console.log("Fetched Contact:", result);
            } catch (error) {
                console.error("Failed to fetch contact:", error);
            }
        }
    }

    fetchContact();
}, [selectedContactId]);

return (
    <div>
    {contact ? (
      <>
        <h2>{contact.name}</h2>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Address:</p>
        <ul id="no-bullets">
            <li>Street: {contact.address.street}</li>
            {contact.address.suite && <li>Suite: {contact.address.suite}</li>}
            <li>City: {contact.address.city}</li>
            <li>Zipcode: {contact.address.zipcode}</li>        
            </ul>
        <p>Company:</p>
        <ul id="no-bullets">
        <li>Name: {contact.company.name}</li>
            {contact.company.catchPhrase && <li>Catchphrase: {contact.company.catchPhrase}</li>}
            {contact.company.bs && <li>Business: {contact.company.bs}</li>}             </ul>
        <button onClick={() => setSelectedContactId(null)}>Back to List</button>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
}
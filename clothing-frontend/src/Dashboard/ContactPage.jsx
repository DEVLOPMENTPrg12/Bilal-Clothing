import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get("/contact"); // endpoint dyal backend
        if (res.data.success) {
          setContacts(res.data.contacts);
        } else {
          alert("Failed to fetch contacts.");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching contacts.");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading contacts...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Messages des utilisateurs</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-500">Aucun message pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{contact.name}</td>
                  <td className="px-4 py-2 border">{contact.email}</td>
                  <td className="px-4 py-2 border">{contact.message}</td>
                  <td className="px-4 py-2 border">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

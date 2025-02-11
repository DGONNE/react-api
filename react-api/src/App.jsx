import { useState, useEffect } from "react";
import axios from "axios";

const initialData = {
  name: "",
  email: "",
  age: 10,
  city: "",
};

export default function App() {
  const [formData, setFormData] = useState(initialData);
  const [users, setUsers] = useState([]);

  /**
   * Lettura di tutte le risorse
   */
  const fetchUsers = () => {
    axios.get("http://localhost:3001/users").then(function (response) {
      setUsers(response.data);
    });
  };

  /**
   * Creo una nuova risorsa
   * @param {*} event
   */
  const handleSubmitForm = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/users", formData).then((response) => {
      setUsers((currentUsers) => [...currentUsers, response.data]);
      setFormData(initialData);
    });
  };

  /**
   * Cancello una risorsa
   * @param {int} userId
   */
  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:3001/users/${userId}`).then(() => {
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userId)
      );
    });
  };

  /**
   * Funzione che manipola lo stato formData
   * @param {string} fieldName il nome del campo da modificare
   * @param {*} value il nuovo valore del campo
   */
  const handleFormData = (fieldName, value) => {
    setFormData((currentFormData) => {
      return { ...currentFormData, [fieldName]: value };
    });
  };

  useEffect(fetchUsers, []);

  return (
    <>
      <h1>Lista Utenti</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleDeleteUser(user.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      <hr />
      <h3>Insersci nuovo utente</h3>
      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="name">Nome*</label>
          <input
            id="name"
            type="text"
            placeholder="Insersci il nome"
            value={formData.name}
            onChange={(event) => handleFormData("name", event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            placeholder="Inserisci l'email"
            value={formData.email}
            onChange={(event) => handleFormData("email", event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">Città*</label>
          <input
            id="city"
            type="text"
            placeholder="Inserisci la città"
            value={formData.city}
            onChange={(event) => handleFormData("city", event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Età*</label>
          <input
            id="age"
            type="number"
            min={1}
            max={100}
            value={formData.age}
            onChange={(event) => handleFormData("age", event.target.value)}
            required
          />
        </div>
        <button type="submit">Salva</button>
      </form>
    </>
  );
}

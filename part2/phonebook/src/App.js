import React, { useState, useEffect } from "react";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import services from "./Components/Services";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  const handleNameChanged = (event) => setNewName(event.target.value);

  const handleNumberChanged = (event) => setNewNumber(event.target.value);

  const handleFilterChanged = (event) => setFilter(event.target.value);

  useEffect(() => {
    services.getAll().then((personsResponse) => setPersons(personsResponse));
  }, []);

  const setNotification = (message, messageType) => {
    // sets message and type
    setNotificationMessage(message);
    setNotificationType(messageType);

    // clears them after 5s
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    let exists = persons.some((person) => person.name === newName);

    //got so complicated that if - else looks a tiny bit cleaner
    if (exists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want replace the old number with the new one`
        )
      ) {
        updatePerson(newName);
      } else return;
    } else {
      services.create({ name: newName, number: newNumber }).then((person) => {
        setPersons(persons.concat(person));
        setNotification(
          `succesfully added ${person.name} to the phonebook`,
          "success"
        );
      });
    }
  };

  const deletePerson = (id) => {
    let nameOfPerson = persons.find((p) => p.id === id).name;
    if (window.confirm("Do you want to delete " + nameOfPerson)) {
      services.deleteById(id).then(() => {
        setNotification(`successfully deleted ${nameOfPerson}`, "success");
      });
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  // I don't like this at all but it works so ¯\_(ツ)_/¯
  const updatePerson = (name) => {
    let existingPerson = persons.find((p) => p.name === name);
    let updatedPerson = { ...existingPerson, number: newNumber };
    services
      .updateObject(updatedPerson.id, updatedPerson)
      .then((editedPerson) => {
        setPersons(
          persons.map((person) =>
            editedPerson.id !== person.id ? person : editedPerson
          )
        );
        setNotification(
          `succesfully changed the phone number of ${editedPerson.name}`,
          "success"
        );
      })
      .catch((error) => {
        setNotification(
          `Information of ${name} has already been removed from the server`,
          "error"
        );
      });
  };

  const visiblePersons =
    filter !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notificationMessage}
        messageType={notificationType}
      />
      <Filter inputHandler={handleFilterChanged} />
      <PersonForm
        numberHandler={handleNumberChanged}
        nameHandler={handleNameChanged}
        personAdder={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={visiblePersons} deleteHandler={deletePerson} />
    </div>
  );
};

export default App;

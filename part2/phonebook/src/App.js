import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Listing from './components/Listing'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'


const App = () => {
  
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    personService.getAll().then(res => 
      setPersons(res.data))
  }, [])

  const notify = (msg, error = false) => {
    if(!error) {
      setNotification(msg)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    } else {
      setError(msg)
      setTimeout(() => {
        setError(null)
      }, 4000)
    }
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const name = persons.filter(p => p.id === id)[0].name
    if(window.confirm(`Delete ${name}?`)){
      notify(`${name} was deleted`)
      setPersons(persons.filter(p => p.id !== id))
      personService.remove(id)
    }
  }

  const updatePerson = (id, newObj) => {
    personService.update(id, newObj)
      .then(response => {
        setPersons(persons.map(p => p.id !== id ? p : response.data))
        notify(`${newObj.name}'s number was updated`)
        clearForm()
      })
      .catch(error => notify(`${newObj.name} has already been removed from the server`, true))
  }

  const addPerson = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }



    const existingPerson = persons.filter(p => p.name === newName)[0]

    if(existingPerson){
      if(newNumber === existingPerson.number){
        alert(`${newName} is already added to the phonebook`)
      } else {
        if(window.confirm(`${newName} is already added to the phonebook, do you want to replace their old number?`)){
          updatePerson(existingPerson.id, newPerson)
        }
      }
    } else {
      personService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          notify(`${newPerson.name} was added`)
          clearForm()
        })
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event =>{
    setNewFilter(event.target.value.toLowerCase())
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter 
        persons={persons}
        handleFilterChange={handleFilterChange}
      />

      <PersonForm 
        newName = {newName} 
        newNumber = {newNumber} 
        addPerson = { addPerson} 
        handleNameChange = {handleNameChange} 
        handleNumberChange = {handleNumberChange}
      />

      <Error message={error} />
      <Notification message={notification} />

      <Listing 
        persons={persons}
        newFilter={newFilter}
        deletePerson = {deletePerson}
      />

    </div>
  )
}



  

export default App
import React from 'react'

const Listing = ({persons, newFilter, deletePerson}) => {
    const formattedOutput = person => (
      <p key={person.id}>
        {person.name} {person.number} 
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </p>
    )
    return (
      <div>
        <h2>Numbers</h2>
        {
        (!newFilter.length)
          ? persons.map(person => formattedOutput(person))
          : persons
            .filter(person => person.name.toLowerCase().includes(newFilter))
            .map(person => formattedOutput(person))
        }
      </div>
    )
  }

export default Listing
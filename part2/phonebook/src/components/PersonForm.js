import React from 'react'

const PersonForm = ({newName, newNumber, addPerson, handleNameChange, handleNumberChange}) => (
    <div>
      <h2>Add new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div> 
  )

export default PersonForm
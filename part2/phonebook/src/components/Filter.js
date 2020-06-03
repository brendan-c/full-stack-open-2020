import React from 'react'

const Filter = ({handleFilterChange}) => {
    return (
      <div>
        filter shown: <input onChange={handleFilterChange}/>
      </div>
    )
  }

export default Filter
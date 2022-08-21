import React from 'react'

import CharacterTable from './CharacterTable'

export default function App() {
  // function handleClick(e) {
  //   e.preventDefault()
  // }

  return (
    <>
      <h1>Marvel Everyday</h1>
      {/* <button onClick={handleClick}>Fetch data</button> */}
      <CharacterTable />
    </>
  )
}

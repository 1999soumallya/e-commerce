import React from 'react'
import { Dna } from 'react-loader-spinner'

const DnaLoader = () => {
  return (
    <div className='loader'>
      <Dna visible={true} height="100" width="100" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper" />
    </div>
  )
}

export default DnaLoader
import React from 'react'
import Header from './Header'

const PaymentSuccess = () => {
  return (
    <div>
      <Header />
     
      <div className='flex justify-center flex-col items-center mt-20'>
         <h1 className='text-center font-bold text-5xl mt-'>Payment <span className='text-green-500'>Successful</span></h1>
        <img src="https://www.cntraveller.in/wp-content/themes/cntraveller/images/check-circle.gif" alt="" className='mt-3'/>
      </div>
    </div>
  )
}

export default PaymentSuccess

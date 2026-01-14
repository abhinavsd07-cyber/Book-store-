import React from 'react'
import Header from './Header'

const PaymentFailure = () => {
  return (
   <div>
      <Header />
     
      <div className='flex justify-center flex-col items-center mt-20'>
         <h1 className='text-center font-bold text-5xl mt-'>Payment Failure <span className='text-green-500'>Failed</span></h1>
        <img src="https://cdn.dribbble.com/userupload/21024910/file/original-3ca5f5eff5a23f6046ea8fd33a344b22.gif" alt="" className='mt-3'/>
      </div>
    </div>
  )
}

export default PaymentFailure

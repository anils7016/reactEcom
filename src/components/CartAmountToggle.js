import React from 'react'
import {FaMinus, FaPlus} from "react-icons/fa";

const CartAmountToggle = ( {amount, setDecrease, setIncrease} ) => {
    console.log('amount',amount)
  return (
    <div className='cart-button'>
        <div className='amount-toggle'>
            <button onClick={ () => setDecrease() }> 
                <FaMinus />
            </button>
            <div className='amount-stye'> {amount} </div>
            <button onClick={ () => setIncrease() }> 
                <FaPlus />
            </button>
        </div>
    </div>
  )
}

export default CartAmountToggle
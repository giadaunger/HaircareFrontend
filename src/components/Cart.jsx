import React from 'react'
import { X } from 'styled-icons/boxicons-regular'
import useStore from '../stores/store'

function Cart() {
  const { shoppingCart, removeFromCart, setIsCartOpen } = useStore();
  const totalPrice = shoppingCart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="absolute right-0 top-full mt-4 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button onClick={() => setIsCartOpen(false)}>
            <X className="w-6 h-6 hover:text-gray-600" />
          </button>
        </div>

        {shoppingCart.length > 0 ? (
          <>
            <div className="space-y-4">
              {shoppingCart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src="/productPic.png" 
                      alt={item.product_name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-gray-600">{item.company}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">{totalPrice} kr</span>
              </div>
              <button className="w-full bg-[#E2A3B7] text-white py-2 rounded-lg hover:bg-[#d889a1] transition-colors duration-300">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
import React, { useState } from 'react'
import { Navicon } from 'styled-icons/fa-solid'
import { Heart } from 'styled-icons/boxicons-regular'
import { User } from 'styled-icons/boxicons-regular'
import { ShoppingBag } from 'styled-icons/boxicons-regular'
import { X } from 'styled-icons/boxicons-regular'
import useStore from '../stores/store'

function Navbar() {
  const { shoppingCart, removeFromCart, isCartOpen, setIsCartOpen } = useStore();

  const totalPrice = shoppingCart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="flex justify-center w-full mx-auto p-10 shadow-md relative">
      <div className="justify-between flex w-2/3">
        <div className="flex space-x-5">
          <Navicon className="w-10 h-10 transform transition duration-300 hover:scale-110"/>
          <p className="transform transition duration-300 hover:scale-110 text-4xl items-center">Logo</p>
        </div>
        <div className="space-x-5 flex items-center">
          <Heart className="w-10 h-10 transform transition duration-300 hover:scale-110"/>
          <User className="w-10 h-10 transform transition duration-300 hover:scale-110"/>
          <div className="relative">
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative transform transition duration-300 hover:scale-110"
            >
              <ShoppingBag className="w-10 h-10"/>
              {shoppingCart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E2A3B7] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {shoppingCart.length}
                </span>
              )}
            </button>

            {/* Cart Modal */}
            {isCartOpen && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
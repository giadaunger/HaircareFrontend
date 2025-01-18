import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navicon } from 'styled-icons/fa-solid'
import { Heart } from 'styled-icons/boxicons-regular'
import { User } from 'styled-icons/boxicons-regular'
import { ShoppingBag } from 'styled-icons/boxicons-regular'

function Navbar() {
  return (
    <div className="flex justify-center w-full mx-auto p-10 shadow-md">
      <div className="justify-between flex w-2/3">
        <div className="flex space-x-5">
          <Navicon className="w-10 h-10 transform transition duration-300 hover:scale-110"/>
          <p className="transform transition duration-300 hover:scale-110 text-4xl items-center">Logo</p>
        </div>
        <div className="space-x-5">
          <Heart className="w-10 h-10 transform transition duration-300 hover:scale-110"/>
          <User className="w-10 h-10 transform transition duration-300 hover:scale-110"/>
          <NavLink to="/shoppingCart transform transition duration-300 hover:scale-110">
            <ShoppingBag className="w-10 h-10 transform transition duration-300 hover:scale-110"/>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
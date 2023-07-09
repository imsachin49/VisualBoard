import React from 'react'
import './Login.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/apiCalls';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(dispatch,{email, password},navigate)
    navigate("/");
    console.log(email,password)
  }
  
  return (
    <>
      <div className='w-full sticky top-0 p-2 shadow-sh1 flex items-center'>
        <img src='https://img.icons8.com/bubbles/1x/shopping-cart.png' alt='no-images' className='w-[45px] h-[45px]' />
        <p className='text-2xl font-bold text-center logoName'>PublicMart</p>
      </div>
      <div className="flex flex-col items-center justify-center m-8 bg-[#fcfcfc]">
          <div className="flex flex-col items-center justify-center md:px-12 xs:px-4 border border-gray-200 pt-4 pb-12 shadow-md rounded-md">
            <h1 className="text-[#1f1c2c] font-bold text-center text-[2rem] font-candara">
              Login as Admin
            </h1>
            <form
              className="flex flex-col items-center justify-center space-y-2 w-full mt-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col lg:w-[30vw] md:w-[40vw] sm:w-[50vw] xs:w-[90vw]">
                <label className="text-md font-mono mb-1">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border border-gray-400 rounded-sm p-2 outline-none focus:border-blue-500 font-candara"
                  type="email"
                  required
                  placeholder="Your Email"
                />
              </div>
              <div className="flex flex-col lg:w-[30vw] md:w-[40vw] sm:w-[50vw] xs:w-[90vw]">
                <label className="text-md font-mono mb-1">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="border border-gray-400 rounded-sm p-2 outline-none focus:border-blue-500 font-candara"
                  type="password"
                  required
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col lg:w-[30vw] md:w-[40vw] sm:w-[50vw] xs:w-[90vw] pt-2">
                <button
                  type="submit"
                  className="font-bold border border-gray-400 rounded-md p-2 outline-none bg-[#1f1c2c] hover:bg-[#1f1c1c] text-white"
                >
                  Continue
                </button>
              </div>
            </form>
            <div className="flex flex-col items-center space-y-2 w-full mt-5">
              <div className="text-[.85rem] flex-col font-candara mb-0 flex lg:w-[30vw] md:w-[40vw] sm:w-[50vw] xs:w-[90vw] text-center border-[1px] py-1 border-t-gray-300 border-x-white border-b-white">
                By signing in or creating an account, you agree with our Terms &
                Conditions and Privacy Statement
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default Login

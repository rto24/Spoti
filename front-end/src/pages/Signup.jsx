import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../components/template/catalyst/button'
import { Heading, Subheading } from '../components/template/catalyst/heading'

import * as authService from '../services/authService'


const Signup = (props) => {
   const navigate = useNavigate();
   const [message, setMessage] = useState(['']);
   const [formData, setFormData] = useState({
      username: '',
      password: '',
      passwordConf: '',
   });

   const updateMessage = (msg) => {
      setMessage(msg);
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData)
      try {
         const newUserResponse = await authService.signup(formData);
         console.log(newUserResponse)
         // props.setUser(newUserResponse.user);
         navigate('/home');
      } catch (err) {
         updateMessage(err.message);
      }
   };

   const { username, password, passwordConf } = formData;

   const isFormInvalid = () => {
      return !(password && password === passwordConf);
   };


   return (
     <> 
         <div className="bg-signin-bg bg-cover bg-center bg-no-repeat h-screen w-full">
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <img
               alt="Spoti Logo"
               src="./src/assets/logo_spoti_white.png"
               className="mx-auto h-16 w-auto"
               />
               <h2 className=" text-center text-xl font-bold leading-9 tracking-wide text-white">
               Peer to Peer Parking Rentals
               </h2>
            </div>
   
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
               <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div> 
                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                     Email address
                     </label>
                     <div className="mt-2">
                     <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                     />
                     </div>
                  </div>

                  <div> 
                     <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                     Username
                     </label>
                     <div className="mt-2">
                        <input
                           id="username"
                           name="username"
                           type="username"
                           required
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           onChange={handleChange}
                        />
                     </div>

                  </div>

                  <div> 
                     <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                     Your Address
                     </label>
                     <div className="mt-2">
                        <input
                           id="address"
                           name="address"
                           type="address"
                           required
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           onChange={handleChange}
                        />
                     </div>
                  </div>
   
                  <div>
                     <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                     Password
                     </label>
                     <div className="mt-2">
                     <input
                        id="password"
                        name="password"
                        type="password"
                        required
                     //   autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                     />
                     </div>
                  </div>

                  <div>
                     <label htmlFor="passwordConf" className="block text-sm font-medium leading-6 text-gray-900">
                     Confirm Password
                     </label>
                     <div className="mt-2">
                     <input
                        id="passwordConf"
                        name="passwordConf"
                        type="password"
                        required
                     //   autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleChange}
                     />
                     </div>
                  </div>
                  <div>
                     <Button
                           type="submit"
                           className="w-full"
                           color="sky"
                           disabled={isFormInvalid()}
                     >
                           Create Account
                     </Button>   
                     {message}                
                  </div>
               </form>
               </div>
   
               <p className="mt-10 text-center text-sm text-white">
               Already a member?{' '}
               <a href="/" className="underline leading-6 text-white hover:text-gray-200">
                  Login
               </a>
               </p>
            </div>
         </div>
        </div>
    </>
   )
}

export default Signup;
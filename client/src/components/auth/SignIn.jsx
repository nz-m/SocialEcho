import React from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {FcGoogle} from 'react-icons/fc'
import SignUp from './SignUp';
const SignIn = () => {
    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
      
      }
    
      function openModal() {
        setIsOpen(true);
       
      }
  return (
    <div>
    <section className="w-96">
<div className="flex flex-col items-center justify-center px-2 py-3 mx-auto  lg:py-0">
 
  <div className="w-full ">
      <div className="p-6 space-y-4 ">
        
          <form className="space-y-4 md:space-y-6" action="#">
              <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""/>
              </div>
              <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""/>
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                      </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-primary hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
              <h1 className=" flex items-center justify-center cursor-pointer gap-4 text-lg border border-gray-400 rounded-full hover:bg-primary hover:text-white px-4 py-2">
             <FcGoogle/> Continue in with Google
          </h1>
              <button onClick={openModal} className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="#" className="font-medium text-primary hover:underline dark:text-primary">Sign up</a>
              </button>
          </form>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md flex justify-center items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                     <SignUp/>
                   
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
      </div>
  </div>
</div>
</section>
</div>
  )
}

export default SignIn
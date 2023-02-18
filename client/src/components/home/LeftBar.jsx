import React from 'react'
import {FaHatWizard} from 'react-icons/fa'
import {BiHomeCircle} from 'react-icons/bi'
import {CgCommunity} from 'react-icons/cg'
import {CgProfile} from 'react-icons/cg'
import {HiHashtag} from 'react-icons/hi'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import SignIn from '../auth/SignIn'
import { HiOutlineHome,HiOutlineCube,HiOutlineUserCircle,HiOutlineBookmark } from "react-icons/hi2";
import rownok from '../../assets/rownok.png'
import PostCreate from '../auth/PostCreate'

const Leftbar = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isSignUp, setSignUp] = useState(false);
  function closeSign() {
    setSignUp(false);
  
  }

  function openSign() {
    setSignUp(true);
   
  }
  function closeModal() {
      setIsOpen(false);
    
    }
  
    function openModal() {
      setIsOpen(true);
     
    }
  return (
    <div className='relative'>
    <div className='sticky left-0 top-0 md:h-[95vh] bg-white shadow-xl px-8 mt-5 mb-5 rounded-xl py-2'>
    <div className='flex flex-col justify-start  my-5 items-start gap-6'>
       <FaHatWizard className='text-3xl'/>
       <Link to='/' className="flex items-center gap-2 cursor-pointer group hover:bg-primary w-full px-4 py-2 rounded-full transition duration-300">
           <HiOutlineHome className='text-3xl font-normal group-hover:text-white'/>
           <p className='text-xl font-medium group-hover:text-white'>Home</p>
       </Link>
       <Link to='/community' className="flex items-center gap-2 cursor-pointer group hover:bg-primary w-full px-4 py-2 rounded-full transition duration-300">
           <HiOutlineCube className='text-3xl font-normal group-hover:text-white'/>
           <p className='text-xl font-medium group-hover:text-white'>community</p>
       </Link>
       <Link to='/community' className="flex items-center gap-2 cursor-pointer group hover:bg-primary w-full px-4 py-2 rounded-full transition duration-300">
           <HiOutlineBookmark className='text-3xl font-normal group-hover:text-white'/>
           <p className='text-xl font-medium group-hover:text-white'>Saved</p>
       </Link>
       <Link to='/profile' className="flex items-center gap-2 cursor-pointer group hover:bg-primary w-full px-4 py-2 rounded-full transition duration-300">
           <HiOutlineUserCircle className='text-3xl font-normal group-hover:text-white'/>
           <p className='text-xl font-medium group-hover:text-white'>Profile</p>
       </Link>
     
      
      
   
         <button  className="flex justify-between items-center absolute bottom-5 cursor-pointer" onClick={openSign}>
           <div className="flex gap-1">
              <img className='w-12' src={rownok} alt="" />
              <div className="flex flex-col">
               <p className='text-lg font-semibold capitalize'>rownok</p>
               <p className='text-xs text-gray-500'>@rownok</p>
              </div>
           </div>
       </button>
       <Transition appear show={isSignUp} as={Fragment}>
           <Dialog as="div" className="relative z-10" onClose={closeSign}>
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
                   <Dialog.Panel className="w-full max-w-md flex justify-center items-center transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                   <SignIn/>
                  
                   </Dialog.Panel>
                 </Transition.Child>
               </div>
             </div>
           </Dialog>
         </Transition>
         
       
   </div>
   </div>
    </div>
    
  
  );
};

export default Leftbar;

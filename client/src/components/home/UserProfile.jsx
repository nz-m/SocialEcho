import React from 'react'
import { HiCamera, HiOutlinePencilSquare } from 'react-icons/hi2'
import rownok1 from '../../assets/rownok.png'
const UserProfile = () => {
  return (
    <div className='mx-auto'>
        <div className="relative rounded-xl w-full shadow-lg">
        <img className="w-[1200px] object-cover rounded-xl h-48"
          src={
            "https://a-static.besthdwallpaper.com/alone-in-unknown-world-wallpaper-1600x900-33874_47.jpg"
          }
          alt={`Nz's avatar`}
         

          // add slow loading image
        />
        <button className='btn btn-sm rounded-full shadow-2xl capitalize btn-primary absolute top-3 right-3 flex items-center gap-1'>
            <HiCamera className='text-xl'/>
             Edit Cover Photo</button>
        </div>
        <div className="flex justify-between mx-5 items-center">
            <div className="flex gap-4">
            <img className='w-32 shadow-lg rounded-full border-2 border-white -mt-10 z-20' src={rownok1} alt="rownok" />
          <div className="flex flex-col mt-2">
            <p className='text-3xl font-semibold'>Mehbubur Rahman (Rownok)</p>
            <p className='text-lg'>3.k Follower</p>
          </div>
            </div>
            <button className='btn rounded-full  btn-primary flex gap-2 items-center capitalize'>
                <HiOutlinePencilSquare className='text-xl'/>
                Edit Profile</button>
         
        </div>
    </div>
  )
}

export default UserProfile
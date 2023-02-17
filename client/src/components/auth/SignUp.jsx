import React from 'react'
import {FcGoogle} from 'react-icons/fc'
const SignUp = () => {
  return (
    <div>
        <section className="w-96">
  <div className="flex flex-col items-center justify-center px-2 py-2 mx-auto  lg:py-0">
     
      <div className="w-full ">
          <div className="p-6 space-y-4 ">
            
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
                      <input type="name" name="email" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="rownok mahbub" required=""/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Profile Picture</label>
                      <input type="file" name="file" id="file" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""/>
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
                  <button type="submit" className="w-full text-white bg-primary hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign Up</button>
                  <h1 className=" flex items-center justify-center cursor-pointer gap-4 text-lg border border-gray-400 rounded-full hover:bg-primary-200 hover:text-white px-4 py-2">
                 <FcGoogle/> Continue in with Google
              </h1>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account ? <a href="#" className="font-medium text-primary hover:underline dark:text-primary">Sign In</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default SignUp
import Logo from '../../assets/SocialEcho.svg'
import notification from '../../assets/notification.svg'
const Navbar = () => {
  return (
    <div className="lg:px-40 mx-auto sticky top-0 left-0">
    <div className="flex justify-between items-center bg-white rounded-md px-10">
      <img className="w-24 " src={Logo} alt="logo" />
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <input type="text" className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md  focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Search" />
      </div>
      <img src={notification} alt="" />
      </div>
    </div>
  )
}

export default Navbar
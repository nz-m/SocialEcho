import { createContext, useContext, useState } from "react";

export const Nightcontext =createContext()

export const Nightprovider = ({children})=>{
 const [Night,setNight] = useState(false)
   const handlenightmode = ()=>{
     setNight((prev)=>!prev)
   }


    return(
        <Nightcontext.Provider value={{Night,handlenightmode}}>
            {children}
        </Nightcontext.Provider>
    )
}
export const useNightMode =()=>{
  return useContext(Nightcontext)
}
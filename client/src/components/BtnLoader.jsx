import React from 'react'
import { BiLoaderCircle } from "react-icons/bi";


const BtnLoader = ({size=24}) => {
  return (
    <BiLoaderCircle size={size} className="animate-spin mx-auto" />

  )
}

export default BtnLoader
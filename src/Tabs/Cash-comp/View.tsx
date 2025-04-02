import React, { useState } from 'react'
import { Product } from '../../Type/Types'
import cashStyle from "./Cash.module.scss"
import { useData } from '../../Provider/DataProvider'
const View = () => {

const {ScanProduct}=  useData()
  return (
    <div className='flex w-[160vh]'>
      <div className={cashStyle["flex-view"]}>
      {ScanProduct.map((product) => (
        <div className={cashStyle["flex-div"]} key={product.id}>
          <img  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s"} alt={product.name} />
          <span>{product.name}</span>
        </div>
      ))}
      
      </div>
    </div>
  )
}

export default View

import React, { useState } from 'react'
import { Product } from '../../Type/Types'
import cashStyle from "./Cash.module.scss"
const View = () => {

  const [ViewProduct, setViewProduct] = useState<Product[]>([
    {
    id: 1,
    name: 'test1',
    vendor: 'test',
    price: 100,
    barcode: 'test',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
    }, {
      id: 2,
      name: 'test2',
      vendor: 'test',
      price: 100,
      barcode: 'test',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
      },
      {
        id: 3,
        name: 'test3',
        vendor: 'test',
        price: 100,
        barcode: 'test',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
        },
        {
          id: 4,
          name: 'test3',
          vendor: 'test',
          price: 100,
          barcode: 'test',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
          },
          {
            id: 5,
            name: 'test3',
            vendor: 'test',
            price: 100,
            barcode: 'test',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
            },
            {
              id: 6,
              name: 'test3',
              vendor: 'test',
              price: 100,
              barcode: 'test',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
              },
              {
                id: 7,
                name: 'test3',
                vendor: 'test',
                price: 100,
                barcode: 'test',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
                },
                {
                  id: 7,
                  name: 'test3',
                  vendor: 'test',
                  price: 100,
                  barcode: 'test',
                  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
                  },
                  {
                    id: 7,
                    name: 'test3',
                    vendor: 'test',
                    price: 100,
                    barcode: 'test',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
                    },
                    {
                      id: 7,
                      name: 'test3',
                      vendor: 'test',
                      price: 100,
                      barcode: 'test',
                      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
                      },
                      {
                        id: 7,
                        name: 'test3',
                        vendor: 'test',
                        price: 100,
                        barcode: 'test',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s',
                        },
          
    
  ])
  return (
    <div className='flex w-[160vh]'>
      <div className={cashStyle["flex-view"]}>
      {ViewProduct.map((product) => (
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

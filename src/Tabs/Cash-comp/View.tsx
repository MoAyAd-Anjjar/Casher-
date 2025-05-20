import React from 'react';
import { Product } from '../../Type/Types';
import cashStyle from "./Cash.module.scss";
import { useData } from '../../Provider/DataProvider';
import defaultImage from '../../assets/default-product.png'; // Import a default image

const View = () => {
  const { ScanProduct } = useData();

  return (
    <div className='flex w-[160vh]'>
      <div className={cashStyle["flex-view"]}>
        {ScanProduct.map((product: Product) => {
          return (
            <div className={cashStyle["flex-div"]} key={product.id}>
              <img 
                src={JSON.parse(product.image)} 
                alt={product.name} 
                 />
              <span>{product.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default View;
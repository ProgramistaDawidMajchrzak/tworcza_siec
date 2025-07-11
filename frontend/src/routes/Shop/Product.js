import React from 'react';
import * as S from './style';
import ProductImg from '../../assets/product-bg.png';
import { Button } from '../Elements/Inputs';
import { NavLink } from 'react-router-dom';
import { getLowestPriceText } from '../utils';

function Product({product}) {

  return (
    <S.Product className={`${product.special ? "special-product product" : "product"}`}>
      <div className="product-type">
        <p>{product.type}</p>
      </div>
      <div>
        <div className="product-container">
          <div className="left-box">
            <div className="left-content">
              <h4>{product.title}</h4>
              <div className="list">
                <h6>Funkcjonalności:</h6>
                <ul>
                  {product.features.map(f => 
                    <li key={f}>{f}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="right-box">
            <div className="right-content">
              <p className='descc'>{product.description}</p>
              <img src={`https://tworczasiec.pl${product.previewImage}`} alt="product-image" />
              {/* <img src={ProductImg} alt="product-image" /> */}
              
              <div className="button-container">
              <p className='price'>
                {getLowestPriceText(product.financing)}
                {/* od 100 zł */}
              </p>
                <NavLink to={`/sklep/${product.productCode}`}>
                  <Button 
                    value="Zobacz"
                    />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </S.Product>
  )
}

export default Product;
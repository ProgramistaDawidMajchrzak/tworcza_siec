import React, {useState, useEffect} from 'react';
import {Hero} from '../HomePage/style';
import ShopImage from '../../assets/shop-3.png';
import * as S from './style';
import { Spacer, Title } from '../Elements/TwoColumns';
import Product from './Product';
import { getVisibleProducts } from '../../services/products.service';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRef, useCallback } from 'react';
import { Button } from '../Elements/Inputs';
import { filterSamples } from '../utils';
import Filter from "../../assets/icons/filter.svg";


function Shop() {

  const [activeType, setActiveType] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const observerRef = useRef();

  const sentinelRef = useCallback(node => {
    if (loadingProducts) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if(page && (page !== lastPage)){
          setPage(prev => prev + 1);
        }
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loadingProducts]);

  const handleType = (type) => {
    if(activeType === type){
      setActiveType("");
    } else {
      setActiveType(type)
    }
  }

  useEffect(() => {
    const fetchMoreProducts = async () => {
      // setProducts([]);
      setLoadingProducts(true);
      try {
        const data = await getVisibleProducts(page, activeType);
        if (data.data.length > 0) {
          console.log(data)
          setProducts(prev => page === 1 ? data.data : [...prev, ...data.data]);
          setLastPage(data.totalPages);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoadingProducts(false);
    };
  
    fetchMoreProducts();
  }, [page, activeType]);

  const handleSampleFilterText = () => {
    return filterSamples[Math.floor(Math.random()*filterSamples.length)]
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilters = () => {
    setIsFilterOpen(prev => !prev);
  };


  return (
    <>
    <div className="content">
      <div className="responsive-box">
        <Hero>
          <div className="hero-text">
            <h3 className='blue-text'>Zainwestuj w profesjonalne, gotowe rozwiązania IT</h3>
            <h3>Wybierz produkt, który najlepiej pasuje<br />do Twojej wizji</h3>
          </div>
          <img className="hero-img-shop" src={ShopImage} alt="hero-image" />
        </Hero>
        <Spacer/>
        <S.ShopContainer>
            <div className="filters open-close">
              <button onClick={toggleFilters}>
                <img src={Filter} alt="filter-icon" />
                <h4>Filtry</h4>
              </button>
            </div>
          <div className={`filter-box ${isFilterOpen ? "open" : ""}`}>
            <Title 
              style={{color: "var(--blue)"}}  
              title="Filtry"
            />
            <div className="filters">
              <h4>Filtry</h4>
              <input 
                onClick={() => handleType("Strona Internetowa")}
                className={`${activeType === "Strona Internetowa" ? "active filter-btn" : "filter-btn"}`} 
                type="button" 
                value="Strona Internetowa"
              />
              <input 
                onClick={() => handleType("Landing Page")}
                className={`${activeType === "Landing Page" ? "active filter-btn" : "filter-btn"}`} 
                type="button" 
                value="Landing Page"
              />
              <input 
                onClick={() => handleType("Sklep Internetowy")}
                className={`${activeType === "Sklep Internetowy" ? "active filter-btn" : "filter-btn"}`}  
                type="button" 
                value="Sklep Internetowy"
              />
            </div>
            <Title 
              style={{color: "var(--blue)", marginTop: "2rem"}}  
              title="Szukaj"
            />
            <div className='search'>
              <h4 style={{marginTop: "1rem"}}>Szukaj</h4>
              <textarea className='filter-area' cols={22} placeholder={`Np: ${handleSampleFilterText()}`}/>
            </div>
            <div className="search-container">
              <Button 
                value="Zastosuj"
                // onClick={applyFilters}
              />
            </div>
          </div>
          <div className="shop-box">
          {(products && products.length !== 0) &&
                    products.map(p =>
                      <Product 
                        key={p.id}
                        product={p}
                      /> 
                    )}
                {/* {(products && products.length === 0) &&
                    <p style={{color: 'white'}}>Brak produktów</p>
                }              */}

                {(loadingProducts || products.length === 0) && Array.from({ length: 5 }).map((_, idx) => (
                  <BoardSkeleton key={idx}/>
                ))}

                {/* To uruchamia lazy load */}
                <div ref={sentinelRef} style={{ height: 1 }} />     
          </div>
          </S.ShopContainer>
        </div>
      </div>
    </>
  )
}

export default Shop;

export function BoardSkeleton() {
  const highlightColors = {baseColor:"var(--product-bg)", highlightColor:"var(--skeleton-dark)"};
  return (
      <S.Product>
      <div>
        <div className="product-container">
          <div className="left-box">
            <div className="left-content">
              <h4>{<Skeleton {...highlightColors}/>} </h4>
              <div className="list">
                <h6>{<Skeleton {...highlightColors}/>}</h6>
                <ul>
                  {<Skeleton {...highlightColors} count={10}/>}
                </ul>
              </div>
            </div>
          </div>
          <div className="right-box">
            <div className="right-content">
              <p>{<Skeleton {...highlightColors} count={2}/>}</p>
              {/* <img src={product.previewImage} alt="product-image" /> */}
              {<Skeleton {...highlightColors} height={240}/>}
              
              <div className="button-container">
              <p className='price'>
                {/* {handlePrice(product)} */}
                {<Skeleton {...highlightColors}/>}
              </p>
                {<Skeleton {...highlightColors}/>}
                {/* <NavLink to={`/sklep/${product.productCode}`}>
                  <Button 
                    value="Zobacz"
                    />
                </NavLink> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </S.Product>
  )
}
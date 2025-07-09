import React, {useState, useEffect} from 'react';
import * as S from './style';
import HeroImg from '../../assets/hero-bg.png';
import { getHomepageProducts } from '../../services/products.service';
import { Spacer } from '../Elements/TwoColumns';
import { HomepageProducts, WhyUsSection, FaqSection, AdVideoSection} from './Elements';

function Home() {

  const [products, setProducts] = useState();
  const [loadingProducts, setLoadingProducts] = useState(true);

  // const fetchHomepageProducts = async () => {
  //     try {
  //         const data = await getHomepageProducts();
  //         setProducts(data);
  //         setLoadingProducts(false);
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  //   };
    

  //   useEffect(() => {
  //     fetchHomepageProducts();
  //   }, []);
  return (
   <>
    <div className="content">
      <div className="responsive-box">
        <S.Hero>
          <div className="hero-text">
            <h3 className='blue-text'>Witaj w Twórczej Sieciii,</h3>
            <h3>Twój dedykowany partner od usług<br />internetowych</h3>
          </div>
          <img className="hero-img" src={HeroImg} alt="hero-image" />
        </S.Hero>
      </div>
    </div>
    <div className="content bg-left">
      <div className="responsive-box">
        <HomepageProducts/>
      </div>
    </div>
    <div className="content bg-right">
      <div className="responsive-box">
        <WhyUsSection/>
        <Spacer />
      </div>
    </div>
    <div className="content bg-left">
      <div className="responsive-box">
        <FaqSection />
      </div>
    </div>
        {/* <AdVideoSection /> */}
    
    
   </>
   
  )
}

export default Home;
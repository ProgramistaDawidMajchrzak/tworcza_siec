import React, { useState, useEffect, useRef } from 'react';
import { showProduct } from '../../services/products.service';
import Loading from '../Elements/Loading';
import * as S from './style';
import { Spacer } from '../Elements/style';
import BackIcon from '../../assets/icons/back.png';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../Elements/Inputs';
import {ProductVisualization, ProductDescription, Cta, PlansSection, Benefits} from './ProductElements';
import Faq from '../Elements/Faq';
import { Title } from '../Elements/TwoColumns';
import { HomepageText, Underline } from '../HomePage/style';
import { getLowestPriceText } from '../utils';


function ProductPage() {
  const navigate = useNavigate();
  const { product_code } = useParams();
  const [product, setProduct] = useState(null);

  const plansRef = useRef(null);

  const scrollToPlans = () => {
    if (plansRef.current) {
      plansRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchProduct = async (code) => {
    try {
        const data = await showProduct(code);
        setProduct(data);
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProduct(product_code);
  }, []);

  const questions = [
    {
      id: 1,
      question: "Co dokładnie oznacza dostosowanie do mojej działalności?",
      answer: "Dostosowanie oznacza zmianę treści (tekstów, zdjęć, danych kontaktowych), kolorystyki i sekcji tak, aby odpowiadały Twojej branży – np. salonowi kosmetycznemu, firmie budowlanej czy kancelarii prawnej."
    },
    {
      id: 2,
      question: "Czy będę mógł samodzielnie edytować stronę w przyszłości?",
      answer: "Tak, po przekazaniu strony otrzymasz pełen dostęp do Panelu Klienta, w którym w prosty sposób możesz samodzielnie edytować treści, zdjęcia czy dodawać nowe podstrony."
    },
    {
      id: 3,
      question: "Czy potrzebuję własnego hostingu i domeny?",
      answer: "Hosting na 1 rok jest w cenie, więc nie musisz się nim martwić. Domenę musisz zarejestrować we własnym zakresie, ale chętnie doradzimy, gdzie to zrobić i pomożemy ją poprawnie podpiąć do strony."
    },
    {
      id: 4,
      question: "Ile trwa realizacja gotowej strony z dostosowaniem?",
      answer: "Zazwyczaj cały proces trwa od 2 do 5 dni roboczych – zależnie od szybkości przesłania przez Ciebie potrzebnych materiałów (treści, zdjęć, logotypu)."
    },
    {
      id: 5,
      question: "Czy mogę później rozbudować stronę o dodatkowe funkcje?",
      answer: "Oczywiście! Produkt jest w pełni skalowany, można dodać nowe funkcjonalności – jak sklep internetowy, formularze, blog, system rezerwacji czy inne integracje, zgodnie z Twoimi potrzebami."
    }
  ]

  return (
    <>
    {product ?
      <>
        <div className="content bg-right-top">
          <div className="responsive-box">
            <S.ProductView>
              {/* {product ? <div dangerouslySetInnerHTML={{ __html: product.content }} /> : <Loading />} */}
              <div className="back-container">
                <button className='back-btn' onClick={() => navigate('/sklep')}>
                  <img src={BackIcon} alt="back-icon" />
                  <p>WRÓĆ</p>
                </button>
              </div>
              <Spacer />
              <div className="product-content">
                <div className="short-desc">
                  <div className='short-desc-container'>                  
                    <HomepageText>
                      <div className="content-box" style={{marginBottom: "1rem"}}>
                        <h3 style={{margin: '0'}}>{product.title}</h3>
                        <Underline />
                        {/* <p>Otrzymujesz gotową <span>obecność w sieci</span> w <span>atrakcyjnej cenie</span> – bez konieczności inwestowania w drogie projekty od zera. Wystarczy przystosować treści oraz funkcjonalności i <span>możesz działać od razu</span>.<br/><br/> <span>Oszczędzasz czas i nerwy</span>, które możesz przeznaczyć na <span>rozwój swojego biznesu</span>. To <span>szybkie, proste i skuteczne rozwiązanie</span> dla każdej działalności.</p> */}
                      </div>
                    </HomepageText>
                  <p>{product.description}</p>
                  </div>
                  {/* <p><span>Gotowa strona internetowa,</span> idealna dla firm usługowych, które chcą wyróżnić się profesjonalnym wizerunkiem i przyciągnąć nowych klientów online.</p> */}
                  <div className='price-container'>
                    <h4>{getLowestPriceText(product.financing)}<span> brutto</span></h4>
                    {/* <h4>od 100 zł <span>(w tym VAT)</span></h4> */}
                    {/* <Button
                      type="button"
                      value="Wybierz Plan"
                      className='secondary-btn'
                      /> */}
                      <button className='cta-btn' style={{margin: ".5rem 0"}} onClick={scrollToPlans}>
                        Wybierz Plan
                      </button>
                    <div className="product-code">
                      <p>KOD PRODUKTU: </p>
                      <p>{product.productCode}</p>
                    </div>
                  </div>
                </div>
                <Spacer />
                <ProductVisualization url={product.demoUrl}/>
              </div>
            </S.ProductView>
          </div>
        </div>
        <div className="content bg-right">
          <div className="responsive-box">
            <div className="product-layout">
              <Spacer />
              <Benefits scrollToPlans={scrollToPlans}/>
              <Spacer />
            </div>
          </div>
        </div>
        <div className="content bg-left">
          <div className="responsive-box">
            <div className="product-layout">
              <Cta product={product} scrollToPlans={scrollToPlans}/>
              <Spacer />
              {/* <Title title="Dostępne plany dla tego produktu"/> */}
                <div ref={plansRef}>
                  <PlansSection product={product} />
                </div>
              <Spacer />
            </div>
          </div>
        </div>
        <div className="content bg-left">
          <div className="responsive-box">
            <Spacer />
            {/* <ProductDescription desc={desc} setDesc={setDesc} product={product}/> */}
              <Title title="Jak to wygląda w praktyce" style={{margin: " 0 4rem"}}/>
            <Faq 
              questions={questions}
              style={{display: "flex", flexDirection: "column", alignItems: "center"}}
            />
          </div>
        </div>
      </>
      :
      <div className="content bg-right">
        <div className="responsive-box">
          <Loading />
        </div>
      </div>
    }
    </>
  )
}

export default ProductPage;


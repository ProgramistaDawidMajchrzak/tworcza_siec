import React, {useState} from 'react';
import * as S from './style';
import ForWhoIcon from '../../assets/icons/for-who.png';
import PagesIcon from '../../assets/icons/pages.png';
import FunctionalitiesIcon from '../../assets/icons/functionalities.png';
import PayingForIcon from '../../assets/icons/in_price.png';
import Checkmark from '../../assets/checkmark.png';
import Info from '../../assets/icons/Info.svg';
import { HomepageText, Underline, WhyUsSection } from '../HomePage/style';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function ProductVisualization({url}) {

    const [active, setActive] = useState('web');
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (name) => {
    if (active !== name) {
      setActive(name);
    }
  };

  const highlightColors = {
    baseColor: 'var(--product-bg)',
    highlightColor: 'var(--skeleton-dark)',
  };

 return (
    <S.ProductVisualization>
      <div className="vis-nav">
        <button
          onClick={() => handleChange('web')}
          className={active === 'web' ? 'active' : ''}
        >
          Web
        </button>
        <button
          onClick={() => handleChange('tablet')}
          className={active === 'tablet' ? 'active' : ''}
        >
          Tablet
        </button>
        <button
          onClick={() => handleChange('mobile')}
          className={active === 'mobile' ? 'active' : ''}
        >
          Mobile
        </button>
      </div>

      <div className={`vis-container ${active}`}>
        {isLoading && (
          <Skeleton
            height="100%"
            width="100%"
            borderRadius={0}
            {...highlightColors}
            containerClassName="skeleton-container"
          />
        )}

        <iframe
          src={url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: isLoading ? 'none' : 'block',
          }}
          title="Dynamic View"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </S.ProductVisualization>
  );
}


export function ProductDescription({desc, setDesc, product}) {
    
    const handleDescription = (desc) => {
        switch (desc) {
            case 1:
                return product.for_who;
                case 2:
                    return product.pages;
                    case 3:
                        return product.functionalities;
                    case 4:
                        return product.paying_for;
                        default:
                            break;
                        }
                    }

    return (
    <S.ProductDescription>
        <div className="desc-nav">
            <button onClick={() => setDesc(1)}>
                <img src={ForWhoIcon} alt="for_who_icon" />
                <p>DLA KOGO</p>
            </button>
            <button onClick={() => setDesc(2)}>
                <img src={PagesIcon} alt="pages_icon" />
                <p>ZAKŁADKI</p>
            </button>
            <button onClick={() => setDesc(3)}>
                <img src={FunctionalitiesIcon} alt="functionalities_icon" />
                <p>FUNKCJONALNOŚCI</p>
            </button>
            <button onClick={() => setDesc(4)}>
                <img src={PayingForIcon} alt="paying_for_icon" />
                <p>CO JEST W CENIE</p>
            </button>
        </div>
        <div className="desc-content">
            <div style={{color: 'white'}} dangerouslySetInnerHTML={{ __html: handleDescription(desc) }} />
        </div>
    </S.ProductDescription>
  )
}

export function Cta({product, scrollToPlans}) {
    return (
        <S.Cta>
            <div className="cta-content">
                <h2>Zbuduj swoją profesjonalną obecność w sieci. <br /><span>Wybierz plan, a my zajmiemy się resztą!</span></h2>
                <ul>
                    <li>
                        <img src={Checkmark} alt="checkmark" />
                        <p>Pomoc na każdym etapie</p>
                    </li>
                    <li>
                        <img src={Checkmark} alt="checkmark" />
                        <p>Możliwość personalizacji</p>
                    </li>
                    <li>
                        <img src={Checkmark} alt="checkmark" />
                        <p>Gotowe do wdrożenia</p>
                    </li>
                </ul>
                <button onClick={scrollToPlans} className='cta-btn'>Wybierz Swój Plan</button>
            </div>
            <div className="img-container">
                <img src={`http://localhost:5000${product.previewImage}`} alt="product-image" />
            </div>
        </S.Cta>
    )
}

export function PlansSection({product}) {
    const financing = product.financing
    return (
        <S.PlansSection>
            <HomepageText>
                <div className="content-box">
                    <h3 style={{margin: '0'}}>Dostępne plany</h3>
                    <Underline />
                    {/* <p>Wybierając produkty od <span>Twórcza Sieć</span>, masz pewność, że <span>inwestujesz w nowoczesne i sprawdzone rozwiązania</span>, które pomogą Ci w rozwoju <span>Twojego biznesu</span>. <br /><br />Nasza platforma to nie tylko <span>gotowe narzędzia IT</span>, ale także wsparcie ekspertów oraz gwarancja jakości na każdym etapie współpracy.</p> */}
                </div>
            </HomepageText>
            <div className="plans-container">
                {financing.filter(f => f.availability).map(f => 
                    <div className="plan-el">
                        <h4>{f.name}</h4>
                        {f.discount_price.length ?
                            <>
                                <p>{f.price} zł</p>
                                <p className="price">{f.discount_price} zł</p>
                            </>
                            :
                            <p className="price">{f.price} zł</p>
                        }
                        <h6>W cenie:</h6>
                        <ul>
                            
                            <li>W pełni {product.type == "Strona Internetowa" ? "funkcjonalna" : "funkcjonalny"} {product.type}</li>
                            <br />
                            <li>Pomoc w przystosowaniu treści do typu prowadzonej działalności</li>
                            <li>Konfiguracja funkcjonalności</li>
                            <li>Hosting 1 rok</li>
                            <li>Konfiguracja domeny</li>
                            <li>Dostęp do Panelu Klienta <img src={Info} alt="more info icon" /></li>
                        </ul>
                        <div className="button-container">
                            <button className='cta-btn'>Wybierz</button>
                        </div>
                    </div>

                )}
            </div>
        </S.PlansSection>
    );
}

export function Benefits({scrollToPlans}) {
  return (
    <S.Benefits>
        
        <WhyUsSection>
            <div className="front-text">
                <HomepageText>
                    <div className="content-box">
                        <h3 style={{margin: '0'}}>Korzyści dla Ciebie</h3>
                        <Underline />
                        <p>Otrzymujesz gotową <span>obecność w sieci</span> w <span>atrakcyjnej cenie</span> – bez konieczności inwestowania w drogie projekty od zera. Wystarczy przystosować treści oraz funkcjonalności i <span>możesz działać od razu</span>.<br/><br/> <span>Oszczędzasz czas i nerwy</span>, które możesz przeznaczyć na <span>rozwój swojego biznesu</span>. To <span>szybkie, proste i skuteczne rozwiązanie</span> dla każdej działalności.</p>
                    </div>
                </HomepageText>
            </div>
                    <div className="boxes">
                        <div className="box">
                            <p>Niskia Cena</p>
                        </div>
                        <div className="box">
                            <p>Gotowe od ręki</p>
                        </div>
                        <div className="box lighter">
                            <p>Najwyższa jakość</p>
                        </div>
                        <div className="box lighter">
                            <p>Wybierz Plan</p>
                            <div className="button-container">
                                {/* <NavLink to='/sklep'> */}
                                    <button onClick={scrollToPlans} className='cta-btn'>Plany</button>
                                {/* </NavLink> */}
                            </div>
                        </div>
                    </div>
        </WhyUsSection>
    </S.Benefits>
  )
}

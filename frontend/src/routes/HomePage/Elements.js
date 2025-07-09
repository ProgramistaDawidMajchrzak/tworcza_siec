import React, {useState} from 'react';
import * as S from './style';
import Faq from '../Elements/Faq';
import { addToNewsletter } from '../../services/newsletter.service';
import loadingGif from '../../assets/giphy.gif'
import { Spacer } from '../Elements/TwoColumns';
import { NavLink } from 'react-router-dom';
import HomeImg from '../../assets/home-1.png'
import HomeImg2 from '../../assets/home-2.png'
import HomeImg3 from '../../assets/home-3.png'

export function HomepageProducts() {
  return (
    <S.HomepageProducts>
        <div className="font-image-products">
            <img className='laptop' src={HomeImg} alt="home-img" />
            <img className='phone' src={HomeImg2} alt="home-img2" />
            <img className='laptop2' src={HomeImg3} alt="home-img3" />
        </div>
        <div className="front-text">
            <S.HomepageText>
                <div className="content-box">
                    <h3 style={{paddingTop: "3rem"}}>Skorzystaj z gotowych rozwiązań IT</h3>
                    <S.Underline />
                    <p><span>Oszczędzaj czas i pieniądze</span>, wybierając sprawdzone narzędzia dla Twojego biznesu.<br /> <br />Oferujemy nowoczesne strony internetowe, sklepy online i rozwiązania dopasowane do Twoich potrzeb – <span>bez kompromisów w jakości.</span></p>
                    <p>Ceny już od  <span>99zł/mies przez rok</span></p>
                    <div className="button-container">
                        <NavLink to='/sklep'>
                            <button className='cta-btn'>Zobacz wszystkie</button>
                        </NavLink>
                    </div>
                </div>
            </S.HomepageText>
        </div>
    </S.HomepageProducts>
  )
}

export function WhyUsSection(){
    return(
        <S.WhyUsSection>
            <div className="front-text">
                <S.HomepageText>
                    <div className="content-box">
                        <h3 style={{margin: '0'}}>Dlaczego Twórcza Sieć to idealny wybór?</h3>
                        <S.Underline />
                        <p>Wybierając produkty od <span>Twórcza Sieć</span>, masz pewność, że <span>inwestujesz w nowoczesne i sprawdzone rozwiązania</span>, które pomogą Ci w rozwoju <span>Twojego biznesu</span>. <br /><br />Nasza platforma to nie tylko <span>gotowe narzędzia IT</span>, ale także wsparcie ekspertów oraz gwarancja jakości na każdym etapie współpracy.</p>
                    </div>
                </S.HomepageText>
            </div>
            <div className="boxes">
                <div className="box">
                    <p>Niskie Ceny</p>
                </div>
                <div className="box">
                    <p>Szybka Realizacja</p>
                </div>
                <div className="box lighter">
                    <p>Pełen zakres usług</p>
                </div>
                <div className="box lighter">
                    <p>Przejrzyj oferty</p>
                    <div className="button-container">
                        <NavLink to='/sklep'>
                            <button className='cta-btn'>Sklep</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </S.WhyUsSection>
    )
}

export function FaqSection() {

    const [loadingNewsletter, setLoadingNewsletter] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);

    const [inputs, setinputs] = useState([
        {
            input: 'email',
            error: false,
            value: ''
        },
        {
            input: 'rodo',
            error: false,
            value: false
        },
        {
            input: 'agreement',
            error: false,
            value: false
        }
    ]);

    const questions = [
        {
          id: 1,
          question: "Czym jest Twórcza Sieć?",
          answer: "Twórcza Sieć to platforma oferująca unikalne strony internetowe, sklepy online oraz rozwiązania biznesowe, która pomaga w budowaniu silnej obecności w sieci."
        },
        {
          id: 2,
          question: "Czy mogę dostosować produkt do swoich potrzeb?",
          answer: "Tak! Oferujemy możliwość personalizacji produktu zgodnie z formą prowadzonej przez Ciebie działalności. Dodatkowo dostarczamy szkolenia"
        },
        {
          id: 3,
          question: "Ile trwa realizacja zamówienia?",
          answer: "Po akceptacji oferty do 3 dni."
        },
        {
          id: 4,
          question: "Czy mogę liczyć na wsparcie po zakupie?",
          answer: "Oczywiście! Zapewniamy przystosowanie oraz wdrożenie produktu. Dodatkowo stając się naszym klientem dostajesz dostęp do zasobów szkoleniowych z narzędzi marketingowych."
        }
      ]

      const handleInputChange = (index, newValue) => {
            setinputs(prevState =>
                prevState.map((input, i) =>
                    i === index ? { ...input, value: newValue, error: false } : input
                )
            );
            if(index === 0){
                setEmailTaken(false)
                setNewsletterSuccess(false)
            }
        };

        const handleInputChangeError = (index) => {
            setinputs(prevState =>
                prevState.map((input, i) =>
                    i === index ? { ...input, error: true } : input
                )
            );
        };
    
    
    const handleCheckboxChange = (index) => {
        setinputs(prevState =>
            prevState.map((input, i) =>
                i === index ? { ...input, value: !input.value, error: false } : input
            )
        );
    };

    const handleNewsletter = async (e) => {
        e.preventDefault()
        if(inputs[0].value.length < 5){
            handleInputChangeError(0)
            return
        }else if(inputs[1].value === false){
            handleInputChangeError(1)
            return
        }else if(inputs[2].value === false){
            handleInputChangeError(2)
            return
        }
        setLoadingNewsletter(true)
          try {
              const data = await addToNewsletter({'email': inputs[0].value});
              console.log(data)
              if(data.message === "Na Twój e-mail wysłano link potwierdzający!"){
                setNewsletterSuccess(true)
                setinputs([
                    {
                        input: 'email',
                        error: false,
                        value: ''
                    },
                    {
                        input: 'rodo',
                        error: false,
                        value: false
                    },
                    {
                        input: 'agreement',
                        error: false,
                        value: false
                    }
                ])
              }
          } catch (error) {
              if(error.response?.data?.errors?.email[0] === "The email has already been taken."){
                setEmailTaken(true)
                setinputs(prevState =>
                    prevState.map((input, i) =>
                        i === 0 ? { ...input, error: true } : input
                    )
                );
              }
          }
          setLoadingNewsletter(false);
    }

  return (
    <S.FaqSection>
        <div className="faq-el">
            <S.HomepageText>
                <div className="content-box">
                    <h3 style={{margin: '0'}}>Przekonaj się jakie to proste</h3>
                    <S.Underline />
                </div>
            </S.HomepageText>
            <div className="faq">
                <Faq
                    questions={questions}
                    style={{display: "flex", flexDirection: "column"}}
                />
            </div>
        </div>
        <div className="newsletter-el">
            <div className="newsletter-box">
                <form onSubmit={(e) => handleNewsletter(e)} className="container">
                    <h3>Dołącz do Twórczej Społeczności!</h3>
                    <p>Bądź na bieżąco z:</p>
                    <ul>
                        <li className='list-el'>Nowościami</li>
                        <li className='list-el'>Promocjami naszych produktów i szkoleń</li>
                        <li className='list-el'>Poradami dotyczącymi zwiększenia widoczności w sieci</li>
                    </ul>
                    <input
                        type="email"
                        placeholder="Email"
                        value={inputs[0].value}
                        onChange={(e) => handleInputChange(0, e.target.value)}
                        className={`${inputs[0].error ? "error" : "normal"}`}
                    />
                    <div className="checkbox-el">
                        <input
                            checked={inputs[1].value}
                            onChange={() => handleCheckboxChange(1)}
                            type="checkbox"
                            className={`${inputs[1].error ? "error" : "normal"}`}
                        />
                        <p>Wyrażam zgodę na przetwarzanie moich danych osobowych przez Twórcza Sieć w celu otrzymywania newslettera. Wiem, że mogę wycofać zgodę w dowolnym momencie.</p>
                    </div>
                    <div className="checkbox-el">
                        <input
                            checked={inputs[2].value}
                            onChange={() => handleCheckboxChange(2)}
                            type="checkbox"
                            className={`${inputs[2].error ? "error" : "normal"}`}
                        />
                        <p>Chcę otrzymywać informacje o nowościach, promocjach i ofertach specjalnych drogą elektroniczną (e-mail) na podany adres.</p>
                    </div>
                    <button type='sumbit' className={emailTaken ? "newsletter-btn btn-error" : (newsletterSuccess ? "newsletter-btn btn-success" : "newsletter-btn")}>
                        {emailTaken ? "Podany email jest już zapisany do newslettera." : (newsletterSuccess ? "Na Twój e-mail wysłano link potwierdzający!" : (loadingNewsletter ? <img src={loadingGif} alt='loading gif'/> :"Zapisz się do naszego newslettera."))}
                    </button>
                </form>
            </div>
        </div>
    </S.FaqSection>
  )
}

export function AdVideoSection() {
  return (
    <S.AdVideoSection>
        <S.HomepageText>
            <div className="content-box">
                <h3 style={{margin: '0'}}>Dowiedz się więcej</h3>
                <S.Underline />
            </div>
        </S.HomepageText>
        <Spacer/>
        <iframe 
            width="90%" 
            height="100%" 
            src="https://www.youtube.com/embed/Ec9h561qxYI" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
        />
    </S.AdVideoSection>

  )
}

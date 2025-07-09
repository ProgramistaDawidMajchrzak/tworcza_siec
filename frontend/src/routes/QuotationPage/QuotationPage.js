import React, {useState} from 'react';
import Banner from '../Elements/Banner';
import { Form, FormInput } from '../Elements/Form';
import Faq from '../Elements/Faq';
import { TwoColumns, Column, Spacer, BlueContainer, TwoTitles, Title } from '../Elements/TwoColumns';

import emailjs from '@emailjs/browser';


function QuotationPage() {

  const [type, setType] = useState('');
  const [industry, setIndustry] = useState('');
  const [actualWeb, setActualWeb] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const questions = [
    {
      id: 1,
      question: "Analiza zgłoszenia",
      answer: "Po otrzymaniu Twojego formularza, nasz zespół dokładnie zapozna się z Twoimi odpowiedziami. Na tym etapie zbieramy najważniejsze informacje, aby lepiej zrozumieć zakres projektu oraz Twoje potrzeby."
    },
    {
      id: 2,
      question: "Wstępna wycena",
      answer: "Na podstawie zebranych informacji przygotujemy wstępną wycenę oraz propozycję zakresu prac. Wstępna wycena zawiera orientacyjne koszty oraz przybliżony harmonogram realizacji projektu."
    },
    {
      id: 3,
      question: "Przedstawienie oferty",
      answer: "Po akceptacji wstępnej wyceny przygotujemy szczegółową ofertę, zawierającą wszystkie elementy projektu, takie jak etapy, harmonogram i finalny kosztorys."
    },
    {
      id: 4,
      question: "Podpisanie umowy i start projektu",
      answer: "Po akceptacji oferty przechodzimy do podpisania umowy, co oznacza formalne rozpoczęcie współpracy. Przechodzimy do szczegółowego planowania i realizacji projektu zgodnie z ustalonym harmonogramem."
    }
  ]

  const handleDoQutotation = (e) => {
    e.preventDefault();

    const formData = {
      'name': name,
      'email': email,
      'type': type,
      'actual_web': actualWeb,
      'industry': industry,
      'project_description': projectDesc,
    }

    emailjs.send('service_c2c4hz7', 'template_srtq12f', formData, 's1iTkTafX7b9ovQ0m')
      .then((result) => {
          console.log('Email sent:', result.text);
          alert('Wiadomość wysłana pomyślnie!');
      }, (error) => {
          console.log('Error:', error.text);
          alert('Wystąpił błąd podczas wysyłania wiadomości.');
      });
      
  }


  return (
    <>
    <div className="content">
    <div className="responsive-box">
      <Spacer />
      {/* <div className="content">
        <div className="responsive-box"> */}
          <Banner 
            title="SKORZYSTAJ"
            subtitle="Z Darmowej Wyceny Projektu"
          />
        {/* </div>
      </div> */}
      <Spacer />
      <div className="content bg-left">
        {/* <div className="responsive-box"> */}
          <TwoColumns>
            <Column>
                <TwoTitles
                  title="CO DALEJ"
                  subtitle="Krok po kroku" 
                />
                <Faq 
                  questions={questions}
                />
            </Column>
            
            <Column>
              <BlueContainer style={{padding: "1rem 0"}}>
                <Form handleSubmit={e => handleDoQutotation(e)} sendText="Wyślij">
                  <Title 
                    style={{marginBottom: "1rem"}}  
                    title="Formularz"
                  />
                  <div class="form-el">
                    <label>Typ projektu</label>
                    <select value={type} onChange={e => setType(e.target.value)}>
                      <option value="Strona Internetowa">Strona Internetowa</option>
                      <option value="landing Page">Landing Page</option>
                      <option value="Sklep">Sklep</option>
                    </select>
                  </div>``
                  <FormInput
                    label="Branża" 
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                  />
                  <FormInput
                    label="Adres obecnej strony, jeśli istnieje" 
                    value={actualWeb}
                    onChange={e => setActualWeb(e.target.value)}
                  />
                  <div class="form-el">
                    <label>O projekcie</label>
                    <textarea value={projectDesc} onChange={e => setProjectDesc(e.target.value)} rows={10} id=""></textarea>
                  </div>
                  <FormInput
                    label="Imię" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <FormInput
                    label="Adres email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form>
              </BlueContainer>
            </Column>
          </TwoColumns>
        {/* </div> */}
      </div>
    </div>
    </div>
    </>
  )
}

export default QuotationPage;
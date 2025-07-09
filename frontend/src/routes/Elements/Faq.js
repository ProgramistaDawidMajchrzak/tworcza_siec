import React, {useState} from 'react';
import * as S from './style';
import { BlueContainer } from './TwoColumns';
import IconOne from '../../assets/icons/icon-one.png';
import IconTwo from '../../assets/icons/icon-two.png';
import IconThree from '../../assets/icons/icon-three.png';
import IconFour from '../../assets/icons/icon-four.png';
import IconFive from '../../assets/icons/icon-five.png';
import { Title } from './TwoColumns';

function Faq({questions, style}) {

    const [active, setActive] = useState(questions[0].question);
    const toggleFAQ = (question) => setActive(question);

    const handleIcon = (id) => {
        switch (id) {
            case 1:
                return IconOne;
            case 2:
                return IconTwo;
            case 3:
                return IconThree;
            case 4:
                return IconFour;
            case 5:
                return IconFive;
            default:
                return IconOne;
        }
    }

  return (
    <S.Faq style={style}>
        
        {questions.map(q => 
            
                <BlueContainer key={q.question} style={{borderRadius: "12px", marginBottom: "1rem", width: "90%"}}>
                    <button className="faq-question" onClick={() => toggleFAQ(q.question)}>
                        <img src={handleIcon(q.id)} alt="icon-one" />
                        {q.question}
                    </button>
                    <div className={`faq-answer ${q.question === active ? "open" : ""}`}>
                        <p>{q.answer}</p>
                    </div>
                </BlueContainer>
            
        )}
        
    </S.Faq>
  )
}

export default Faq;
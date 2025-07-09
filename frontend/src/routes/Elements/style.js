import styled from "styled-components";
import bgConnection from '../../assets/connection-img.png';

export const Banner = styled.div`
    width: calc(100% - 220px);
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 26px;
    background-color: var(--main-dark);
    height: 220px;
    display: flex;
    align-items: center;
    @media (max-width: 1100px) {
        width: 100%;
    }
    @media (max-width: 500px) {
        border-radius: 18px;
    }
    
`;

export const TwoTitles = styled.div`
    h4{
        color: var(--blue);
        font-weight: 800;
        font-size: 15px;
        margin: 0 0 8px 0;
    }
    h2{
        color: var(--white);
        font-weight: 300;
        font-size: 32px;
        margin: 0;
    }
    @media (max-width: 500px) {
        margin-right: 1rem;
        h4{
            font-size: 13px;
            margin: 0 0 8px 0;
        }
        h2{
            font-size: 24px;
            margin: 0;
        }
    }
`;
export const Title = styled.h5`
        color: var(--white);
        font-weight: 700;
        font-size: 20px;
        margin: 0;
`;

export const TwoColumns = styled.div`
    width: calc(100% - 220px);
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: space-between;
    gap: 2rem;
     @media (max-width: 1200px) {
        gap: 1rem;
    }
    @media (max-width: 1100px) {
        flex-direction: column-reverse;
        width: 100%;
    }
`;

export const Column = styled.div`
    width: 100%;   
`;
export const Spacer = styled.div`
    width: 100%;
    height: 64px;
    @media (max-width: 850px) {
        height: 1rem;
    }
`;
export const BlueContainer = styled.div`
    width: 100%;
    background-color: var(--main-dark);
    border-radius: 26px;
`;
export const FormInput = styled.div`
    width: 420px; 
    margin-bottom: 1rem;
    @media (max-width: 500px) {
        width: 90%;
    }
    label{
        color: var(--white);
        display: block;
        margin-bottom: 8px;
        font-weight: 300;
        font-size: 16px;
    }
    input{
        width: 100%;
        border: 1px solid var(--blue);
        padding: 11px 18px;
        border-radius: 12px;
        background-color: var(--inputs-bg);
        color: var(--white);
        @media (max-width: 1300px) {
            width: 80%;
        }
        @media (max-width: 500px) {
            width: 80%;
        }
    }
    textarea{
        resize: none;
        width: 100%;
        border: 1px solid var(--blue);
        padding: 11px 18px;
        border-radius: 12px;
        background-color: var(--inputs-bg);
        color: var(--white);
    }
`;

export const Faq = styled.div`
  margin: auto;
  /* padding: 20px; */
  font-family: Arial, sans-serif;
  margin-top: 1.2rem;
    .faq-question {
        width: 100%;
        background: none;
        border: none;
        color: var(--white);
        font-weight: 600;
        font-size: 16px;
        text-align: left;
        padding: 20px;
        cursor: pointer;
        outline: none;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 32px;
        }
    }

    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out;
        margin-top: 0;
        font-weight: 400;
        font-size: 14px;
        color: var(--grey);
        line-height: 150%;
        p{
            padding: 0 50px 16px 50px;
            margin: 0;
        }
    }

    .faq-answer.open {
        max-height: 200px;
        /* padding: 10px 15px; */
    }
`;

export const Loading = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Footer = styled.div`
    width: 100%;
    background-color: var(--background);
    height: 360px;
    background-image: url(${bgConnection});
    background-position: top -90px right -50px; 
    background-repeat: no-repeat;
    background-size: contain;
    @media (max-width: 350px) {
        background-image: none;
    }
    
    .connection-left{
        height: 100%;
        background-image: url(${bgConnection});
        background-position: top 50px left -50px; 
        background-repeat: no-repeat;
        background-size: contain;
        @media (max-width: 860px) {
            background-image: none;
        }
        .responsive-box{
            height: 100%;
            padding: 0 260px;
            display: flex;
            justify-content: space-evenly;
            @media (max-width: 860px) {
                flex-direction: column;
                padding: 0;
                padding-left: 100px;
            }
            @media (max-width: 550px) {
                padding-left: 1rem;
            }
            .column {
                display: flex;
                flex-direction: column;
                justify-content: baseline;
                align-items: flex-start;
                padding-top: 70px;
                width: 100%;
                color: white;
                gap: 1rem;
                @media (max-width: 860px) {
                    padding-top: 16px;
                }
                .logo{
                    width: 220px;
                    height: auto;
                    @media (max-width: 860px) {
                        width: 140px;
                    }
                }
                input{
                    width: 90px;
                }
                ul{
                    list-style: none;
                    li{
                        margin-bottom: 1rem;
                        a{
                            text-decoration: none;
                            color: white;
                        }
                    }
                }
            }
        }
    }
`;

import styled from "styled-components";
import bgEllipse from '../../assets/bg-ellipse.png';

export const Hero = styled.div`
    width: 100%;
    height: 320px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-image: url(${bgEllipse});
    background-size: cover; /* Dostosowanie obrazu do rozmiaru elementu */
    background-position: top; /* Ustawienie obrazu na środku */
    background-repeat: no-repeat; /* Zapobiega powtarzaniu obrazu */
    
    .hero-img{
        width: 440px;
        @media (max-width: 950px) {
            width: 340px;
        }
        @media (max-width: 750px) {
            width: 270px;
        }
        @media (max-width: 550px) {
            display: none;
        }
    }
    .hero-img-shop{
        position: absolute;
        bottom: 0;
        right: 70px;
        width: 640px;
        @media (max-width: 1400px) {
            right: 50px;
            width: 440px;
        }
        @media (max-width: 1100px) {
            right: 30px;
            width: 380px;
        }
        @media (max-width: 850px) {
            right: 0;
            width: 300px;
        }
        @media (max-width: 650px) {
            display: none;
        }
    }
    
    @media (max-width: 950px) {
        height: 260px;
    }
    @media (max-width: 750px) {
        height: 220px;
    }
    .hero-text{
        width: auto;
        .blue-text{
            color: var(--blue);
            font-size: 22px;
        }
        h3{
            font-weight: 400;
            margin: 0;
            color: var(--white);
            @media (max-width: 550px) {
                margin-bottom: .5rem;
            }
        }
    }
`;
export const HomepageProducts = styled.div`
    width: 100%;
    min-height: 500px;
    display: flex;
    @media (max-width: 750px) {
        flex-direction: column;
    }
    .front-text{
        width: 30%;
        @media (max-width: 750px) {
            width: 100%;
        }
    }
    .font-image-products{
        @media (max-width: 750px) {
            width: 100%;
            height: 380px;
        }
        @media (max-width: 490px) {
            height: 200px;
        }
        @media (max-width: 400px) {
            height: 130px;
        }
        display: flex;
        width: 70%;
        height: 100%;
        position: relative;
        position: relative;
        img{
            position: absolute;
        }
        .laptop{
            top: 100px;
            max-width: 550px;
        }
        .laptop2{
            top: 100px;
            right: 0;
            z-index: 1;
            max-width: 650px;
        }
        .phone{
            z-index: 2;
            left: 240px;
            max-width: 450px;
        }
        @media (max-width: 1350px) {
            .laptop{
                left: -50px;
                top: 100px;
                max-width: 450px;
            }
            .laptop2{
                top: 120px;
                right: 0;
                max-width: 370px;
            }
            .phone{
                top: 20px;
                left: 140px;
                max-width: 350px;
            }
        }
        @media (max-width: 750px) {
            .laptop2{
                display: none;
            }
        }
        @media (max-width: 490px) {
            .laptop{
                top: -20px;
                max-width: 350px;
            }
            .phone{
                top: -70px;
                max-width: 300px;
            }
        }
        @media (max-width: 400px) {
            .laptop{
                top: -20px;
                max-width: 280px;
                left: -20px;
            }
            .phone{
                top: -70px;
                left: 120px;
                max-width: 250px;
            }
        }
        @media (max-width: 300px) {
            .phone{
                display: none;
            }
        }
    }
`;

export const HomepageText = styled.div`
        /* width: 30%; */
        /* height: 100%; */
        .content-box{
            /* width: 90%; */
            position: relative;
            /* left: 50%;
            transform: translate(-50%, 0); */
            h3{
                color: var(--white);
                /* font-size: 32px; */
                font-weight: 400;
                /* padding-top: 3rem; */
                margin: 0;
                /* @media (max-width: 1250px) {
                    font-size: 32px;
                } */
            }
            p{
                color: var(--grey);
                span{
                    color: var(--white);
                }
            }
            .button-container{
                .cta-btn{
                    margin: 1rem 0;
                }
                @media (max-width: 750px) {
                    margin-bottom: 2rem;
                } 
            }
        }
`;

export const WhyUsSection = styled.div`
    width: 100%;
    display: flex;
    @media (max-width: 750px) {
        flex-direction: column;
    }
    .front-text{
        width: 40%;
        @media (max-width: 750px) {
            width: 100%;
        }
    }
    .boxes{
        width: 60%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 1rem;
        @media (max-width: 750px) {
            width: 100%;
            justify-content: center;
        }
        .box{
            @media (max-width: 1350px) {
                width: 270px;
            }
            @media (max-width: 1100px) {
                width: 240px;
            }
            @media (max-width: 950px) {
                width: 190px;
            }
            @media (max-width: 750px) {
                width: 160px;
            }
            height: 100px;
            width: 340px;
            border-radius: 8px;
            background: linear-gradient(to bottom right, #112E5E, #090F22);
            color: var(--white);
            font-weight: 600;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                margin-left: 1rem;
            }
            @media (max-width: 1100px) {
                .cta-btn{
                    margin: 0 .5rem 0 0;
                }
            }
            @media (max-width: 750px) {
                .cta-btn{
                    padding: 8px 12px;
                }
            }
            
        }
        .lighter{
            background: linear-gradient(to bottom right, #0580BE, #10376A) !important;

        }
    }
`;

export const Underline = styled.div`
    width: 120px;
    height: 5px;
    background: linear-gradient(to right, #0580BE,rgb(4, 27, 58)) !important;
`;

export const FaqSection = styled.div`
    width: 100%;
    display: flex;
    /* margin-top: 3rem; */
    @media (max-width: 850px) {
        flex-direction: column;
    }
    .faq-el{
        width: 40%;
        @media (max-width: 850px) {
            width: 100%;
        }
        .faq{
            width: 100%;
        }
    }
    .newsletter-el{
        width: 60%;
        @media (max-width: 850px) {
            width: 100%;
        }
        .newsletter-box{
            margin: 4rem 0 0 2rem;
            width: auto;
            min-height: 420px;
            background: linear-gradient(to bottom left, #10376A ,#0580BE) !important;
            border-radius: 12px;
            color: var(--white);
            @media (max-width: 850px) {
                margin: 2rem 0 0 0;
                min-height: 460px;
                margin-bottom: 2rem;
            }
            .container{
                margin: 0 2rem;
                @media (max-width: 1250px) {
                    margin: 0 1rem;
                }
                @media (max-width: 750px) {
                    margin: 0 .5rem;
                }
                h3{
                    margin-left: 2rem;
                    padding-top: 2rem;
                }
                p{
                    margin-left: 2rem;
                }
                .list-el{
                    margin-left: 2rem;
                    font-weight: bold;
                    font-size: 20px; 
                }
                @media (max-width: 1250px) {
                    h3{
                        margin-left: 1rem;
                        padding-top: 1rem;
                    }
                    p{
                        margin-left: 1rem;
                    }
                    .list-el{
                        margin-left: 1rem;
                        font-size: 16px; 
                }
                }
                .newsletter-btn{
                    width: 80%;
                    height: 40px;
                    background-color: #FFEB5A;
                    color: #000;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: bold;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    left: 50%;
                    transform: translate(-50%, 0);
                    position: relative;
                    @media (max-width: 1250px) {
                        margin-top: .5rem;
                    }
                    img{
                        margin: 0;
                        padding: 0;
                        height: 180px;
                        width: auto;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
                .btn-error{
                    background-color:rgb(255, 90, 90);
                }
                .btn-success{
                    background-color:rgb(90, 255, 90);
                }
                input[type="email"]{
                    margin: 1rem 0;
                    width: 80%;
                    height: 40px; 
                    position: relative;
                    background-color: transparent;
                    border: 1px solid var(--white);
                    border-radius: 8px;
                    left: 50%;
                    color: white;
                    transform: translate(-50%, 0);
                    padding: 0 1rem;
                    outline: none;
                    &::placeholder {
                        color: white !important;
                        opacity: 1 !important;
                    }
                    &::-webkit-input-placeholder {
                        color: white !important;
                        opacity: 1 !important;
                    }
                    &::-moz-placeholder {
                        color: white !important;
                        opacity: 1 !important;
                    }

                    &:-ms-input-placeholder {
                        color: white !important;
                        opacity: 1 !important;
                    }

                    &::-ms-input-placeholder {
                        color: white !important;
                        opacity: 1 !important;
                    }
                }
                .checkbox-el{
                    display: flex;
                    gap: .5rem;
                    position: relative;
                    align-items: center;
                    left: 50%;
                    transform: translate(-50%, 0);
                    width: calc(80% + 2rem);
                    margin-bottom: .5rem;
                    input[type='checkbox']{
                        min-width: 20px;
                        height: 20px;
                        appearance: none; /* Usuwa domyślny styl przeglądarki */
                        background-color: #fff;
                        border: 2px solid #ccc;
                        border-radius: 4px;
                        cursor: pointer;
                        position: relative;
                        
                        &:checked {
                            background-color:rgb(36, 255, 51); /* Kolor po zaznaczeniu */
                            border-color: rgb(36, 255, 51);
                        }

                        &:checked::before {
                            content: "✔"; /* Znak ✅ po zaznaczeniu */
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            color: white;
                            font-size: 14px;
                            font-weight: bold;
                        }

                        &:hover {
                            border-color: #007bff; /* Podświetlenie */
                        }
                        .error{
                    background-color:rgba(255, 0, 0, 0.39) !important;
                    border: 1px solid rgba(255, 0, 0, 0.39) !important;
                }
                    }
                    p{
                        margin: 0;
                        font-size: 10px;
                    }
                }
                .error{
                    background-color:rgba(255, 0, 0, 0.39) !important;
                    border: 1px solid rgba(255, 0, 0, 0.39) !important;
                }
            }
        }
    }
`;

export const AdVideoSection = styled.div`
    height: auto;
    iframe{
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        height: 700px;
    }
`;

import styled from 'styled-components';
import bgEllipse from '../../assets/bg-ellipse.png';

export const ShopContainer = styled.div`
    width: 100%;
    display: flex;
    min-height: 50vh;
    @media (max-width: 850px) {
        flex-direction: column;
    }
    .open-close{
        display: block;
        button{
            cursor: pointer;
            display: flex;
            gap: .4rem;
            background-color: transparent;
            border: none;
            justify-content: flex-start;
            padding-left: 0;
            h4{
                text-align: center;
                color: var(--blue);
                font-size: 18px;
            }
            img{
                width: 24px;
                height: auto;
            }
        }
        @media (min-width: 850px) {
            display: none;
        }
    }
    .filter-box.open {
        max-height: 1000px; /* większa niż przewidywana maksymalna wysokość */
    }
    .filter-box{
        width: 220px;
        height: 550px;
        border-right: 1px solid var(--white);
        position: sticky;
        top: 80px;
        align-self: flex-start;
        /* @media (min-width: 850px) {
            display: block;
        } */
        @media (max-width: 850px) {
            margin-bottom: 4rem;
            overflow: hidden;
            max-height: 0;
            transition: max-height 0.5s ease;
            width: 100%;
            height: 220px;
            display: flex;
            border-right: none;
            border-bottom: 1px solid var(--white);
            h5{
                display: none;
            }
        }
        textarea{
            background-color: transparent;
            border: 1px solid var(--blue);
            border-radius: 5px;
            resize: none;
            padding: 6px;
            margin-top: 1.5rem;
            color: white;
            min-height: 120px;
            @media (max-width: 850px) {
                width: 220px;
                min-height: 95px;
                margin-top: .5rem;
            }
            @media (max-width: 440px){
                width: 180px;
            }
        }

        .search-container{
            /* width: 150px; */
            position: relative;
            margin-top: 1rem;
            @media (max-width: 850px) {
                input{
                    position: absolute;
                    right: -120px;
                    bottom: 60px;
                }
            }
            @media (max-width: 650px){
                input{
                    position: absolute;
                    right: 0;
                    bottom: 14px;
                }
            }
            /* input{
                max-width: 120px;
                text-align: center;
            } */

        }
        
        @media (max-width: 1000px) {
            position: static; /* Normalne zachowanie dla mniejszych ekranów */
        }
        .search{
            h4{
                display: none;
                @media (max-width: 850px){
                        display: block;
                        color: var(--blue);
                        font-weight: 700;
                        font-size: 20px;
                        margin: 0;
                }
            }
        }
        .filters{
            margin-top: 1rem;
            @media (max-width: 850px){
                width: 216px;
            }
            @media (max-width: 650px){
                max-width: 162px;
            }
            h4{
                display: none;
                @media (max-width: 850px){
                        display: block;
                        color: var(--blue);
                        font-weight: 700;
                        font-size: 20px;
                        margin: 0;
                }
            }
            input{
                transition: .2s ease-in;
                @media (max-width: 850px){
                    max-width: 200px;
                }
                @media (max-width: 650px){
                    max-width: 150px;
                }
            }
            .filter-btn{
                width: 80%;
                text-align: left;
                padding: 6px 10px;
                background-color: transparent;
                border: 1px solid var(--blue);
                color: var(--white);
                font-size: 14px;
                margin-top: .5rem;
                border-radius: 4px;
                font-weight: 600;
                cursor: pointer;
                @media (max-width: 850px){
                    width: 200px;
                }
                @media (max-width: 440px){
                    font-size: 11px;
                    width: 130px;
                }
            }
            .active{
                color: var(--blue) !important;
                background-color: var(--white);
            }
        }
    }
    .shop-box{
        @media (max-width: 850px){
            width: 100%;
        }
        width: calc(100% - 220px);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const Product = styled.div`
    /* max-width: 1020px; */
    width: 1020px;
    height: auto;
    min-height: 460px;
    background-color: var(--product-bg);
    border-radius: 12px;
    margin-bottom: 2rem;
    background-image: url(${bgEllipse});
    background-position-x: right;
    background-size: 0.5x;
    background-position: left;
    background-repeat: no-repeat;
    position: relative;
    @media (max-width: 1300px) {
        width: 900px;
    }
    @media (max-width: 1250px) {
        width: 800px;
    }
    @media (max-width: 1100px) {
        width: 650px;
    }
    @media (max-width: 950px) {
        width: 550px;
    }
    @media (max-width: 850px){
        width: 100%;
        min-height: auto;
    }
    .product-type{
        @media (max-width: 850px){
            transform: rotate(0deg);
            top: -36px;
            left: 1rem;
        }
        position: absolute;
        width: auto;
        background-color: var(--blue);
        transform: rotate(-90deg);
        width: 200px;
        height: 36px;
        z-index: 10;
        top: 122px;
        left: -117.5px;
        border-radius: 8px 8px 0 0;
        p{
            height: 100%;
            line-height: 36px;
            width: auto;
            text-align: center;
            font-weight: 600;
            margin: 0;
            font-size: 13px;
            color: var(--white);
        }
    }
    
   
    .product-container{
        margin: 2rem;
        display: flex;
        @media (max-width: 850px) {
            flex-direction: column;
        }
        .left-box{
            margin-top: 1rem;
            width: 40%;
            border-right: 1px solid var(--blue);
            @media (max-width: 850px) {
                width: 100%;
                border-right: none;
                margin-top: 0;
            }
            .left-content{
                margin: 0 1.5rem 1.5rem 0;
                @media (max-width: 850px) {
                    margin: 0 .5rem .5rem 0;
                }
                h4{
                    margin: 0;
                    color: var(--blue);
                    font-size: 21px;
                    font-weight: 500;
                }
                .list{
                    margin-left: 1rem;
                    margin-top: 1.5rem;
                    color: var(--white);
                    @media (max-width: 850px) {
                        margin-left: 0;
                        margin-top: 1rem;
                    }
                    h6{
                        font-weight: 600;
                        font-size: 15px;
                        margin: 0;
                        @media (max-width: 850px) {
                            display: none;
                        }
                    }
                    ul{
                        @media (max-width: 850px) {
                            display: flex;
                            flex-wrap: wrap;
                            gap: .5rem;
                            list-style: none;
                            margin: 0;
                            padding: 0;
                        }
                        li{
                            margin-bottom: .4rem;
                            font-size: 14px;
                            color: var(--grey);
                            @media (max-width: 850px) {
                                margin-bottom: 0;
                                padding: 6px 10px;
                                border: 2px solid white;
                                border-radius: 6px;
                            }
                        }
                    }
                }
            }
        }
        .right-box{
            margin-top: 1rem;
            width: 60%;
            @media (max-width: 850px) {
                margin-top: 0;
                width: 100%;
            }
            .right-content{
                margin-left: 3rem;
                @media (max-width: 850px) {
                    margin-left: 0;
                }
                p{
                    line-height: 150%;
                    padding: 0;
                    max-width: 80%;
                    font-size: 14px;
                    color: var(--grey);
                }
                .descc{
                    @media (max-width: 850px) {
                        display: none;
                    }
                }
                img{
                    width: 100%;
                }
                .button-container{
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 2rem;
                    .price{
                        font-weight: 600;
                        font-size: 18px;
                        color: var(--white);
                    }
                    a{
                        input{
                            max-width: 100%;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }    
`;

export const ProductView = styled.div`
    width: 100%;
    h1,h2,h3,h4,p{
        margin: 0;
        color: white;
    }
    .back-container{
        width: 100%;
        padding-top: 1rem;
        .back-btn{
            background-color: transparent;
            width: auto;
            display: flex;
            gap: 1rem;
            align-items: center;
            cursor: pointer;
            border: none;
            img{
                height: 1rem;
                width: auto;
            }
        }
    }
    .product-content{
        max-width: 1250px;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        .short-desc{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .short-desc-container{
                @media (max-width: 650px) {
                    margin-right: .5rem;
                }
            }
            p{
                line-height: 135%;
                max-width: 650px;
                font-size: 20px;
                font-weight: 600;
                @media (max-width: 950px) {
                    font-size: 16px;
                    max-width: 550px;
                }
                span{
                    color: var(--blue);
                }
            }
            .price-container{
                max-width: 350px;
                display: flex;
                flex-direction: column;
                align-items: end;
                gap: 0.5rem;
                font-size: 20px;
                letter-spacing: 1.2px;
                span{
                    letter-spacing: .9px;
                    font-size: 13px;
                    font-weight: 400;
                }
                .product-code{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    p{
                        font-size: 10px;
                        font-weight: 400;
                    }
                    @media (max-width: 650px) {
                        flex-direction: column;
                    }
                }
            }
        }
    }
`;

export const ProductVisualization = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .vis-nav{
        height: 50px;
        button{
            border: 1px solid var(--white);
            background-color: transparent;
            width: 140px;
            height: 40px;
            color: var(--white);
            font-weight: 600;
            cursor: pointer;
        }
        button:nth-child(1) {
            border-radius: 50px 0 0 50px;
        }
        button:nth-child(3) {
            border-radius: 0 50px 50px 0;
        }
        @media (max-width: 1250px) {
            button:nth-child(2) {
                display: none;
            }
        }
        .active{
            background-color: var(--blue);
        }
    }
    .vis-container{
        margin-top: 1rem;
        height: 600px;
        transition: width 0.5s ease;
        background-color: lightgray;
         @media (max-width: 1250px) {
            margin-bottom: 1rem;
         }
    }
    .web{
        width: 100%;
    }
    .tablet{
        width: 50%;
    }
    .mobile{
        width: 30%;
    }
    @media (max-width: 1250px) {
       
        .mobile{
            width: 50%;
        }
    }
`;

export const ProductDescription = styled.div`
    width: 920px;
    height: auto;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    gap: 1rem;
    .desc-nav{
        width: 220px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        button{
            background-color: transparent;
            display: flex;
            color: var(--white);
            align-items: center;
            height: 32px;
            width: 100%;
            justify-content: flex-start;
            gap: 1rem;
            font-weight: 600;
            font-size: 13px;
            border: none;
            cursor: pointer;
            img{
                height: 90%;
                width: auto;
            }
        }
    }
    .desc-content{
        width: calc(100% - 236px);
        ol, strong, span, li {
            background-color: transparent !important;
        }
        li{
            margin-top: 1rem;
        }
    }
`;
export const Cta = styled.div`
    width: 100%;
    display: flex;
    .cta-content{
        color: white;
        h2{
            font-size: 32px;
            span{
                font-size: 24px;
            }
        }
        ul{
            list-style: none;
            li{
                display: flex;
                gap: 1rem;
                align-items: center;
                p{
                    font-weight: 700;
                    font-size: 18px;
                    margin: 0;
                    letter-spacing: 1.2px;
                }
            }
        }
    }
    .img-container{
        width: 50%;
        position: relative;
        img{
            width: 90%;
            position: absolute;
            right: 0;
            top: 2rem;
            /* transform: translate(-50%, 0); */
        }
    }
`;

export const PlansSection = styled.div`
    width: 100%;
    .plans-container{
        width: 100%;
        display: flex;
        gap: 2rem;
        justify-content: center;
        align-items: flex-start;
        .plan-el{
            width: 360px;
            border-radius: 12px;
            //background-color: #4B5064;
            background: linear-gradient(to bottom right, #4B5064, #081734);
            h4{
                text-align: center;
                color: var(--white);
                font-size: 18px;
            }
            p{
                text-align: center;
                color: #5FA3F3;
                font-size: 18px;
                font-weight: 600;
                opacity: .7;
                text-decoration: line-through;
                margin: 0;
            }
            .price{
                text-align: center;
                color: #5FA3F3;
                font-size: 24px;
                font-weight: 800;
                opacity: 1;
                text-decoration: none;
            }
            h6{
                color: var(--white);
                font-size: 1rem;
                margin-left: 1rem;
                margin-bottom: 0;
            }
            ul{
                width: 80%;
                color: var(--white);
                li{
                    margin-bottom: .3rem;
                    img{
                        width: 20px;
                        height: auto;
                        cursor: pointer;
                    }
                }
            }
            .button-container{
                display: flex;
                margin: 1rem 0;
                justify-content: center;
            }
        }
    }
`;  


export const BoardEl = styled.div`
    background-color: var(--white);
    border: 2px solid #EEF2F4;
    min-height: 200px;
    height: auto;
    margin-bottom: 1rem;
    border-radius: .5rem;
    padding: .8rem .8rem 0 .8rem;
    position: relative;
    &:first-child {
        margin-top: 1.6rem; 
    }

    &:last-child {
        margin-bottom: 1.6rem;
    }
    .flex{
        display: flex;
        gap: .8rem;
        margin-bottom: .8rem;
        .img{
            height: 50px;
            width: 50px;
            border-radius: 50px;
            overflow: hidden;
            border: 1px solid #EEF2F4;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .post-info{
            h6{
                margin: 0;
                font-size: .9rem;
                font-weight: 500;
                margin: .5rem 0 .2rem 0;
                span{
                    color: black;
                    font-size: 1rem;
                    font-weight: 700;
                    &:first-child {
                        margin-right: .5rem; 
                        cursor: pointer;
                    }

                    &:last-child {
                        margin-left: .5rem;
                    } 
                }
            }
            p{
                margin: 0;
                color: grey;
                font-size: .8rem;
            }
        }
        .skeleton-author{
            width: 160px;
            margin-top: .4rem;
        }
    }
    .skeleton-content{
        margin-top: .4rem;
    }
    .content{
        margin-top: .4rem;
        padding: 0 1rem;
        p{
            font-size: 1rem;
            line-height: 1.5rem;
        }
    }
    .post-action{
        height: 50px;
        padding-right: 1rem;
        margin: 0;
        display: flex;
        gap: 1.4rem;
        padding: 0 1rem;
        .action-el{
            display: flex;
            align-items: center;
            gap: .6rem;
            .fa-heart{
                cursor: pointer;
            }
            p{
                font-size: .7rem;
            }
        }
    }
    .add-comment-area{
        height: 50px;
        width: 100%;
        padding: 0 1rem 0 1rem;
        form{
            display: flex;
            input[type="text"]{
                background-color: var(--gray);
                padding: .4rem .8rem;
                width: 88%;
                border: 1px solid var(--main-color);
            }
            button[type="submit"]{
                background-color: var(--main-color);
                border: none;
                cursor: pointer;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 25px;
                    height: 25px;
                    margin: 0;
                }
            }
        }
    }
    .comment-area{
        padding: 0 1rem;
        .comment{
            width: 100%;
            height: auto;
            .img{
                width: 35px !important;
                height: 35px !important;
                border-radius: 35px !important;
            }
            .post-info{
                h6{
                    margin: 0 0 .1rem 0;
                    span{
                        margin-left: 0 !important;
                        color: black;
                        font-size: .8rem;
                        font-weight: 600;
                    }
                }
                p{
                    font-size: .7rem;
                }
            }
            .comment-content{
                margin-top: .4rem;
                padding: 0 1rem;
                p{
                    font-size: .9rem;
                    line-height: 1.4rem;
                }
            }
        }
        .show-more{
            color: #54B1F6;
            font-size: .7rem;
            font-weight: 700;
            cursor: pointer;
        }
    }  
`;
export const Benefits = styled.div`
    width: 100%;
    .benefits-container{
        margin-top: 1rem;
        width: 100%;
        height: 100px;
        .benefit-el{
            width: 360px;
            border: 2px solid white;
            border-radius: 12px;
            //background-color: #4B5064;
            /* background: linear-gradient(to bottom right, #4B5064, #081734); */
                h4{
                    text-align: center;
                    color: var(--white);
                    font-size: 18px;
                }
        }
    }
`;
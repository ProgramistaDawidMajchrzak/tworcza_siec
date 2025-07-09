import styled from 'styled-components';
import bgEllipse from '../../assets/bg-ellipse.png';

export const Login = styled.div`
    height: 100vh;
    background-color: var(--background);
    background-image: url(${bgEllipse});
    background-position-x: right;
    background-size: 0.5x;
    background-position: left;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box{
        max-width: 420px;
        width: 82%;
        height: 290px;
        border-radius: 12px;
        background-color: var(--product-bg);
        input, label{
            max-width: 70%;
            margin-left: 2.5rem;
        }
    }
`;


export const AdminNavigation = styled.div`
    width: 100%;
    background-color: var(--second-dark);
    display: flex;
    .nav-box{
        width: 180px;
        height: 100vh;
        position: relative;
            a{
                display: block;
                text-decoration: none;
                color: var(--white);
                height: 36px;
                line-height: 36px;
                padding-left: 1rem;
            }
            #link.active{
                background-color: var(--white);
                color: var(--background);
            }
            input{
                position: absolute;
                bottom: 1rem;
                left: 50%;
                transform: translate(-50%, 0);
            }
    }
    .admin-content{
        width: calc(100% - 180px);
        height: 100vh;
        background-color: var(--background);
    }
`;

export const AdminBoard = styled.div`
    width: 100%;
    height: 100vh;
    color: var(--white);
    overflow-y: auto;
    .search-box{
        margin: 2rem 4rem;
        display: flex;
        gap: 3rem;
        align-items: baseline;
    }
    .board-content{
        margin: 1rem 2rem;
        height: calc(100vh - 2rem);
        .form-container{
            display: block;
            position: relative;
            input[type="submit"]{
                position: absolute;
                right: 0;
            }
        }
    }
    .board-list{
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 2rem;
        gap: .5rem;
    }
`;
export const ProductView = styled.div`
    width: 90%;
    height: 135px;
    border: 1px solid var(--blue);
    .product-content{
        margin: 1rem;
        display: flex;
        justify-content: space-between;
        background-color: red;
        .general-info{
            h5{
                margin: 0;
                font-weight: 400;
                font-size: 12px;
                margin-bottom: .5rem;
                span{
                    margin-left: .3rem;
                    font-weight: 700;
                    font-size: 16px;
                    color: var(--blue);
                }
            }
        }
        .image-action{
            display: flex;
            gap: 2rem;
            height: 110px;
            .image{
                img{
                    height: 90%;
                    width: auto;
                }
            }
            .action{
                button{
                    display: block;
                    margin-top: .2rem;
                }
            }
        }
    }

`;

export const TableSearchBox = styled.div`
    width: calc(100% - 4rem);
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 1rem;
    height: 80px;
    background-color: lightgray;
`;

export const AdminTable = styled.div`
    width: 100%;
    table{
        width: calc(100% - 4rem);
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        margin-top: 1rem;
        thead{
            height: 40px;
            background-color: var(--blue);
        }
        tbody{
            tr:nth-child(even) {
                background-color:rgb(111, 126, 193);
            } 
        }
    }
`;

export const PaginationContainer = styled.div`
    ul{
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        justify-content: space-evenly;
        list-style: none;
        max-width: 500px;
        li{
            border: 1px solid white;
            border-radius: 4px;
            padding: 4px 8px;
            cursor: pointer;
        }
        .selected{
            background-color: var(--blue);
        }
    }
`;
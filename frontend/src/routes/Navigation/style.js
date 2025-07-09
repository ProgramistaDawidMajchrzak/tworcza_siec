import styled from "styled-components";

export const Navigation = styled.div`
    width: 100%;
    background-color: var(--second-dark);
    transition: top 0.3s ease-in-out;
    z-index: 100;

    &.at-top {
        position: relative; /* Normalna nawigacja, gdy jesteśmy na górze */
    }

    &.visible {
        position: fixed;
        top: 0; /* Pokazuje się po 200px */
        left: 0;
    }

    &:not(.at-top):not(.visible) {
        position: fixed;
        top: -80px; /* Chowa nawigację podczas przewijania w dół */
        left: 0;
    }
    .nav-box{
        height: 76px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            height: 50px;
            width: auto;
            @media (max-width: 700px) {
                height: 30px;
            }
        }
        .action-box{
            display: flex;
            gap: 2rem;
            align-items: center;
            a{
                text-decoration: none;
                color: var(--white);
                height: 76px;
                line-height: 76px;
            }
            #link.active{
                border-bottom: 1px solid var(--white) !important;
            }
        }
    }
    @media (max-width: 700px) {
        .nav-box {
            flex-direction: row;
            position: relative;
        }
    }
`;
export const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 32px;
  color: white;
  cursor: pointer;

  @media (max-width: 700px) {
    display: block;
  }
`;

export const Menu = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
    a{
        text-decoration: none;
        color: var(--white);
        /* height: 76px;
        line-height: 76px; */
    }
    #link.active{
        border-bottom: 1px solid var(--white) !important;
    }

    @media (max-width: 700px) {
        position: absolute;
        top: -200px; /* Ukryte menu */
        left: 0;
        width: calc(100% - 20px);
        background-color: var(--second-dark);
        flex-direction: column;
        align-items: flex-start;
        text-align: center;
        padding: 20px;
        transition: top 0.3s ease-in-out;

        &.open {
        top: 76px; /* Wysunięcie menu */
        }
    }
`;
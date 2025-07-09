import React from 'react';
import * as S from './style';
import Logo from '../../assets/logo-true.png';
import { Button } from './Inputs';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <S.Footer>
        <div className="connection-left">
            <div className="responsive-box">
                <div className="column">
                    <img className='logo' src={Logo} alt="logo-short" />
                    <p>C Wszelkie prawa zastrzeżone</p>
                    {/* <Button
                        value="Panel Klienta"
                    /> */}
                </div>
                <div className="column">
                    <ul>
                        <li>
                            <NavLink id="link" to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink id="link" to='/nowosci'>Nowości</NavLink>
                        </li>
                        <li>
                            <NavLink id="link" to='/wycena'>Wycena</NavLink>
                        </li>
                        <li>
                            <NavLink id="link" to='/sklep'>Sklep</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="column">
                    <ul>
                        {/* <li>
                            <a href="#">zakładka 1</a>
                        </li>
                        <li>
                            <a href="#">zakładka 2</a>
                        </li>
                        <li>
                            <a href="#">zakładka 3</a>
                        </li>
                        <li>
                            <a href="#">zakładka 4</a>
                        </li>
                        <li>
                            <a href="#">zakładka 5</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    </S.Footer>
  )
}

export default Footer;
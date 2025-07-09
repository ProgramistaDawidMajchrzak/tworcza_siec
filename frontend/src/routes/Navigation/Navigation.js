import React, {useState, useEffect} from 'react';
import * as S from './style';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button } from '../Elements/Inputs';
import Logo from '../../assets/logo-white.png';
import { Spacer } from '../Elements/TwoColumns';
import Footer from '../Elements/Footer';
import { FiMenu, FiX } from 'react-icons/fi';


function Navigation() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY <= 200) {
            setIsAtTop(true);  // Jeśli na samej górze, nawigacja działa normalnie
            setIsVisible(false); // Nie pokazuj "wysuniętej" wersji
        } else {
            setIsAtTop(false); // Użytkownik przewija

            if (scrollY > lastScrollY && scrollY > 200) {
            setIsVisible(false); // Chowa nawigację przy przewijaniu w dół
            } else if (scrollY > 200) {
            setIsVisible(true); // Pokazuje nawigację po przekroczeniu 200px
            }
        }

        setLastScrollY(scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

  return (
    <>
        <S.Navigation className={`${isAtTop ? 'at-top' : ''} ${isVisible ? 'visible' : ''}`}>
            <div className="responsive-box">
                <div className="nav-box">
                    <NavLink to='/' onClick={() => setIsMenuOpen(false)}>
                        <img src={Logo} alt="Logo" />
                    </NavLink>
                    {/* <div className="action-box">
                        <NavLink id="link" to='/nowosci'>Nowości</NavLink>
                        <NavLink id="link" to='/wycena'>Wycena</NavLink>
                        <NavLink to='/sklep'>
                            <Button
                                type='button'
                                value='Sklep'
                            />
                        </NavLink>
                    </div> */}
                    {/* Hamburger button */}
                    <S.Hamburger onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </S.Hamburger>
                    
                    {/* Menu dla desktopa i mobile */}
                    <S.Menu className={isMenuOpen ? 'open' : ''}>
                        <NavLink id="link" to='/nowosci' onClick={() => setIsMenuOpen(false)}>Nowości</NavLink>
                        <NavLink id="link" to='/wycena' onClick={() => setIsMenuOpen(false)}>Wycena</NavLink>
                        <NavLink to='/sklep' onClick={() => setIsMenuOpen(false)}>
                            <Button type='button' value='Sklep' />
                        </NavLink>
                    </S.Menu>
                </div>
            </div>
        </S.Navigation>
        
                <Outlet />
                {/* <Spacer /> */}
                <Footer />
        
    </>
  )
}

export default Navigation
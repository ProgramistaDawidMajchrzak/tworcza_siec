import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as S from './style';
import { Button } from '../Elements/Inputs';
import { logout } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

function AdminNavigation() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <S.AdminNavigation>
                    <div className="nav-box">
                            <NavLink id="link" to='/admin-home'>Home</NavLink>
                            <NavLink id="link" to='/admin-products-add'>Dodaj Produkt</NavLink>
                            <NavLink id="link" to='/admin-products'>Produkty Lista</NavLink>
                            <NavLink id="link" to='/admin-subscribers'>Subskrybenci</NavLink>
                            <NavLink id="link" to='/admin-newsletter'>Newsletter</NavLink>
                            <NavLink id="link" to='/admin-users'>Klienci</NavLink>
                            <NavLink id="link" to='/admin-zips'>Server Zips</NavLink>
                            <Button
                                onClick={handleLogout}
                                type='button'
                                value='Wyloguj'
                            />
                    </div>

                <div className="admin-content">
                    {/* <div className="responsive-box"> */}
                        <Outlet />
                    {/* </div> */}
                </div>
            </S.AdminNavigation>
        </>
    )
}

export default AdminNavigation;
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import { FormInput, Form } from '../Elements/Form';
import { login } from '../../services/auth.service';

function AdminLogin() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async e => {
    e.preventDefault();

    const formData = {
      'email': email,
      'password': password
    }

    try {
      const data = await login(formData);
      localStorage.setItem('accessToken', data.token);
      navigate('/admin-home');
    } catch (error) {
        console.error('Error fetching data:', error.response.data);
    }
  }

  return (
    <S.Login>
        <div className="login-box">
            <Form sendText="Login" handleSubmit={e => handleLogin(e)}>
                <FormInput 
                  label="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  />
                <FormInput 
                  type="password"
                  label="hasło"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
            </Form>
        </div>
    </S.Login>
  )
}

export default AdminLogin;
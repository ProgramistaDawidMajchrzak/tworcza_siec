import React, {useState, useEffect} from 'react';
import * as S from './style';
import { addNewsletterCampaign, getNewsletterCampaigns, sendOneTimeEmail } from '../../services/newsletter.service';
import { Form, FormInput } from '../Elements/Form';
import Loading from '../Elements/Loading';
import { AdminTable } from './AdminElements';
import { formatDate } from '../utils';
import { Spacer } from '../Elements/TwoColumns';

function AdminNewsletter() {
    const [refresh, setRefresh] = useState(false);
    const [campaigns, setCampaigns] = useState(null);
    const [loadingCampaigns, setLoadingCampaigns] = useState(true);
        
    const fetchAllCampaigns = async () => {
        try {
            const data = await getNewsletterCampaigns();
            setCampaigns(data);
            console.log(data)
            setLoadingCampaigns(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [email, setEmail] = useState({
        subject: '',
        content: '',
    })

    const [campaign, setCampaign] = useState({
        subject: '',
        content: '',
        send_at: '',
    })

    const handleChangeEmail = (e) => {
        const { name, value } = e.target;
        setEmail((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            console.log(email)
            const data = await sendOneTimeEmail(email); 
            console.log(data)   
            setRefresh(!refresh)
            setEmail({
                subject: '',
                content: '',
            })
        } catch (error) {
            console.error('Error fetching data:', error.response.data);
        }
    }
    const handleAddCampaign = async (e) => {
        e.preventDefault();
        try {
            console.log(campaign)
            const data = await addNewsletterCampaign(campaign); 
            console.log(data)   
            setRefresh(!refresh)
        } catch (error) {
            console.error('Error fetching data:', error.response.data);
        }
    }

    useEffect(() => {
        fetchAllCampaigns();
    }, [refresh]);

    return (
        <S.AdminBoard>
            <div className="board-content">
                <h2>Jednorazowy Email</h2>
                <Form sendText="Wyślij" handleSubmit={e => handleSendEmail(e)}>
                    <FormInput 
                        type='text'
                        label="Tytuł Maila"  
                        name="subject" 
                        value={email.subject} 
                        onChange={handleChangeEmail}
                        />
                    <FormInput 
                        type='text'
                        label="Treść Maila"  
                        name="content" 
                        value={email.content} 
                        onChange={handleChangeEmail}
                        />
                </Form>
                <Spacer />
                <h2>Kampania</h2>
                <Form sendText="Dodaj Kampanie" handleSubmit={e => handleAddCampaign(e)}>
                    <FormInput 
                        type='text'
                        label="Tytuł Kampanii"  
                        name="subject" 
                        value={campaign.subject} 
                        onChange={handleChange}
                        />
                    <FormInput 
                        type='text'
                        label="Treść Kampanii"  
                        name="content" 
                        value={campaign.content} 
                        onChange={handleChange}
                        />
                    <FormInput 
                        type='date'
                        label="Data wysyłki"  
                        name="send_at" 
                        value={campaign.send_at} 
                        onChange={handleChange}
                    />
                </Form>
                <Spacer />

                {loadingCampaigns ? <Loading /> :
                    <AdminTable>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tytuł</th>
                                <th>Treść</th>
                                <th>Zaplanowana Data</th>
                                <th>Data utworzenia</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>

                        <tbody>
                            {campaigns && campaigns.map(s => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td>{s.subject}</td>
                                    <td>{s.content}</td>
                                    <td>{formatDate(s.send_at)}</td>
                                    <td>{formatDate(s.created_at)}</td>
                                    <td>
                                        <button
                                            // onClick={() => handleDeleteSubscriber(s.id)}
                                        >
                                            Usuń
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </AdminTable>
                }
            </div>
        </S.AdminBoard>
    )
}

export default AdminNewsletter;
import React, {useState, useEffect} from 'react';
import * as S from './style';
import { getSubscribers, deleteSubscriber } from '../../services/newsletter.service';
import Loading from '../Elements/Loading';
import { AdminTable, TableSearchBox } from './AdminElements';
import { formatDate } from '../utils';

function AdminSubscribers() {
    const [refresh, setRefresh] = useState(false);
    const [subscribers, setSubscribers] = useState(null);
    const [loadingSubscribers, setLoadingSubscribers] = useState(true);
    
    const fetchAllSubscribers = async () => {
        try {
            const data = await getSubscribers();
            setSubscribers(data);
            console.log(data)
            setLoadingSubscribers(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteSubscriber = async (id) => {
        try {
            await deleteSubscriber(id);
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        fetchAllSubscribers();
    }, [refresh]);

  return (
    <S.AdminBoard>
        <div className="board-content">
            <TableSearchBox>
                Search Box
            </TableSearchBox>
            {loadingSubscribers ? <Loading /> :
                <AdminTable>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Data Dołączenia</th>
                            <th>Potwierdzony?</th>
                            <th>Data Potwierdzenia</th>
                            <th>Akcja</th>
                        </tr>
                    </thead>

                    <tbody>
                        {subscribers && subscribers.map(s => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.email}</td>
                                <td>{formatDate(s.created_at)}</td>
                                <td>{s.is_confirmed ? "Tak" : "Nie"}</td>
                                <td>{s.is_confirmed ? formatDate(s.updated_at) : "-"}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteSubscriber(s.id)}
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

export default AdminSubscribers;
import React, {useState, useEffect} from 'react';
import * as S from './style';
import { getAllClients } from '../../services/clients.service';
import Pagination from './Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDate } from '../utils';
import { AdminTable } from './AdminElements';

function AdminClients() {

  const [refresh, setRefresh] = useState(false);
  const [clients, setClients] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  
  const fetchAllClients = async () => {
    try {
      const data = await getAllClients(page, search);
      setClients(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAllClients(page);
  }, [refresh, page]);

  return (
    <S.AdminBoard>

          {clients ?
                    <AdminTable>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Rola</th>
                                <th>Liczba produktów</th>
                                <th>Data utworzenia</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>

                        <tbody>
                            {clients && clients.users.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.email}</td>
                                    <td>{c.role}</td>
                                    <td>4</td>
                                    <td>{formatDate(c.createdAt)}</td>
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
                    :
                    Array.from({ length: 10 }).map((_, idx) => (
                                        <div key={idx} style={{ width: "90%", margin: "0 auto" }}>
                                          <Skeleton 
                                            baseColor="var(--product-bg)"
                                            highlightColor="var(--skeleton-dark)"
                                            height={55}
                                            width="100%"
                                          />
                                        </div>                  
                                        ))
                }

      {clients &&
        <Pagination 
          totalPages={clients.totalPages}
          handlePageClick={e => {
            setClients(null)
            setPage(e.selected + 1)
          }}
          page={page - 1}
        />
      }
    </S.AdminBoard>
  )
}

export default AdminClients;
import React, {useState, useEffect} from 'react';
import { uploadZipToServer, getZipProductsFromServer } from '../../services/products.service';
import * as S from './style';
import { toast } from 'react-toastify';
import { formatDate, formatBytes } from '../utils';
import { AdminTable } from './AdminElements';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Pagination from './Pagination';

function AdminZipsAdd() {

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const [refresh, setRefresh] = useState(false);
    const [zips, setZips] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
      
    const fetchAllZips = async (page) => {
        try {
          const data = await getZipProductsFromServer(page, search);
          setZips(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Wybierz plik!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            uploadZipToServer(formData);
            setPage(1)
            setRefresh(!refresh)
            setFile(null)
            setStatus('')
            toast.success(`Dodano plik .zip na serwer`);
        } catch (err) {
            setStatus('Błąd podczas uploadu!');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAllZips(page);
    }, [refresh, page]);

    return (
        <S.AdminBoard>
            <div className="p-4 border rounded shadow-md">
                <h2 className="text-xl mb-4">Wyślij WordPress .zip na serwer</h2>
                <input
                    type="file"
                    accept=".zip"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-4"
                />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Wyślij plik na serwer
                </button>
                {status && <p className="mt-4">{status}</p>}
            </div>
            {zips ?
                <AdminTable>
                    <thead>
                        <tr>
                            <th>Kod Produktu</th>
                            <th>Wielkość</th>
                            <th>Data Dodania</th>
                            <th>Url</th>
                        </tr>
                    </thead>
                                
                    <tbody>
                        {zips && zips.zips.map(z => (
                            <tr key={z.name}>
                                <td>{z.name}</td>
                                <td>{formatBytes(z.size)}</td>
                                <td>{formatDate(z.modifyTime)}</td>
                                <td>{z.url}</td>
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
            {zips &&
                <Pagination 
                    totalPages={zips.pagination.totalPages}
                    handlePageClick={e => {
                        setZips(null)
                        setPage(e.selected + 1)
                    }}
                    page={page - 1}
                />
            }
        </S.AdminBoard>
    )
}

export default AdminZipsAdd;
import React, {useState, useEffect} from 'react';
import * as S from './style';
import { getAllProducts, toggleVisibility, deleteProduct } from '../../services/products.service';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../Elements/Form';
import { Button } from '../Elements/Inputs';
import Pagination from './Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function AdminProductsList() {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchAllProducts = async () => {
    try {
        const data = await getAllProducts(page, search);
        setProducts(data);
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  const handleDeleteProdukt = async (id) => {
    try {
        await deleteProduct(id);
        setRefresh(!refresh);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  const handleToggleVisibility = async (id) => {
    try {
        await toggleVisibility(id);
        setRefresh(!refresh);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts(page);
  }, [refresh, page]);

  const handlePriceVisibility = (financing) => {
    // const trueFinancing = JSON.parse(financing)
    if(financing[0]?.discount_price?.length){
      return `${financing[0].discount_price}  <--  ${financing[0].price}`
    }
    return financing[0].price;
  }

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  };

  return (
    <S.AdminBoard>
      <div className="search-box">
        <FormInput value={search} onChange={e => setSearch(e.target.value)}/>
          <Button 
            value="Szukaj"
            onClick={() => {
              setProducts(null)
              setPage(1)
              setRefresh(!refresh)
            }}
          />
      </div>
      <div className="board-list">
            {(products && products.data.length !== 0) ?
                products.data.map(product =>
                  <S.ProductView key={product.id}>
                    <div className="product-content" style={{backgroundColor: product.visible ? "transparent" : "lightcoral"}}>
                      <div className="general-info">
                        <h5>Nazwa: <span>{product.title}</span></h5>
                        <h5>Typ: <span>{product.type}</span></h5>
                        <h5>Cena: <span>{handlePriceVisibility(product.financing)} zł</span></h5>
                        <h5>Kod: <span>{product.productCode}</span></h5>
                      </div>
                      <div className="image-action">
                        <div className="image">
                          <img src={`http://localhost:5000${product.previewImage}`} alt="product-image" />
                        </div>
                        <div className="action">
                          <button
                            onClick={() => navigate(`/sklep/${product.productCode}`)}
                            >Zobacz</button>
                          <button
                            onClick={() => navigate(`/admin-products-edit/${product.productCode}`)}
                          >Edytuj</button>
                          <button onClick={() => handleToggleVisibility(product.id)}>
                            {product.visible ? "Ukryj" : "Pokaż"}
                          </button>
                          <button
                            onClick={() => handleDeleteProdukt(product.id)}
                          >
                            Usuń
                          </button>
                        </div>
                      </div>
                    </div>
                  </S.ProductView>
                ) :
                  Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} style={{ width: "90%", margin: "0 auto" }}>
                      <Skeleton 
                        baseColor="var(--product-bg)"
                        highlightColor="var(--skeleton-dark)"
                        height={135}
                        width="100%"
                      />
                    </div>                  
                    ))
              }
            {(products && products.data.length === 0) &&
                <p style={{color: 'white'}}>There are no products for now</p>
            }
      </div>
      {products &&
        <Pagination 
          totalPages={products.totalPages}
          handlePageClick={e => {
            setProducts(null)
            setPage(e.selected + 1)
          }}
          page={page - 1}
        />
      }
    </S.AdminBoard>
  )
}

export default AdminProductsList;



import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './style';
import { Form, FormInput, FormArea } from '../Elements/Form';
import { v4 as uuidv4 } from 'uuid';
import { editProduct, showProduct } from '../../services/products.service';
import ProductSample from './product-sample.json';

function AdminProductsEdit() {
  const navigate = useNavigate();
  const { productCode } = useParams();
  const [newFeature, setNewFeature] = useState('');

  const fetchProduct = async (code) => {
    try {
        const data = await showProduct(code);
        setProduct(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProduct(productCode);
    
  }, []);

  const [product, setProduct] = useState({
    title: ProductSample.name,
    type: '',
    visible: true,
    special: false,
    description: ProductSample.shortDescription,
    features: [],
    demoUrl: '',
    financing: [
      {
        availability: true,
        name: 'Płatność jednorazowa',
        price: '',
        discount_price: ''
      },
      {
        availability: true,
        name: 'Abonament 12 miesięcy',
        price: '',
        discount_price: ''
      },
      {
        availability: true,
        name: 'Abonament 24 miesiące',
        price: '',
        discount_price: ''
      }
    ],
    productCode: '',
    prewievImage: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
    }));
  };

  const handleUUID = (type) => {
    let slug = '';
    switch (type) {
      case "Strona Internetowa":
        slug = "STR"
        break;
      case "Landing Page":
        slug = "LAND"
        break;
      case "Sklep":
        slug = "SHOP"
        break;
      default:
        break;
      }
        
      const shortId = uuidv4().slice(0, 7).toUpperCase();

      
      setProduct((prevProduct) => ({
        ...prevProduct,
        type: type,
        productCode: slug + "-" + shortId,
      }));
  }


  const handleAddProduct = async (e) => {
    e.preventDefault();
        try {
            await editProduct(product, product.id);
            setProduct({
              title: '',
              type: '',
              visible: true,
              special: false,
              description: '',
              demoUrl: '',
              financing: [
                {
                  availability: true,
                  name: 'Płatność jednorazowa',
                  price: '',
                  discount_price: ''
                },
                {
                  availability: true,
                  name: 'Abonament 12 miesięcy',
                  price: '',
                  discount_price: ''
                },
                {
                  availability: true,
                  name: 'Abonament 24 miesiące',
                  price: '',
                  discount_price: ''
                }
              ],
              productCode: '',
              // prewievImage: null,
            });
            navigate('/admin-products')
            // setPreviewImage(null)
        } catch (error) {
            console.error('Error fetching data:', error.response.data);
        }
  }

  const handleChangeFinancingPrices = (index, name, value) => {
    const newFinancing = product.financing.map((financingItem, i) => {
      if (i === index) {
        return {
          ...financingItem,
          [name]: value,
        };
      }
      return financingItem;
    });

    setProduct((prevProduct) => ({
      ...prevProduct,
      financing: newFinancing,
    }));
  };
  
  const handleChangeFinancingCheckbox = (index) => {
    const newFinancing = product.financing.map((financingItem, i) => {
      if (i === index) {
        return {
          ...financingItem,
          availability: !product.financing[index].availability,
        };
      }
      return financingItem;
    });

    setProduct((prevProduct) => ({
      ...prevProduct,
      financing: newFinancing,
    }));
  };
  

  return (
    <S.AdminBoard>
        <div className="board-content">
            <Form sendText="Edytuj Produkt" handleSubmit={e => handleAddProduct(e)}>
                <FormInput 
                  label="Nazwa Produktu"  
                  name="title" 
                  value={product.title} 
                  onChange={handleChange}
                />
                <FormInput 
                  label="Url"  
                  name="demoUrl" 
                  value={product.demoUrl} 
                  onChange={handleChange}
                />
                <div className="form-el">
                  <label>Typ</label>
                  <select 
                    name="type" 
                    value={product.type} 
                    onChange={e => {
                      handleUUID(e.target.value)
                    }}>
                    <option disabled value="">Wybierz</option>
                    <option value="Strona Internetowa">Strona Internetowa</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Sklep">Sklep</option>
                  </select>
                </div>
                <FormInput 
                  label="Kod Produktu"
                  name="productCode" 
                  value={product.productCode} 
                  onChange={handleChange}
                />
                <div className="form-el">
                  <label>Widoczność</label>
                  <div>
                    <input 
                      checked={product.visible} 
                      onChange={() => {
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            visible: !product.visible,
                          }));
                      }} 
                      type="checkbox" 
                    />
                    <span>Widoczność</span>
                  </div>
                  <div>
                    <input 
                      checked={product.special} 
                      onChange={() => {
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            special: !product.special,
                          }));
                      }} 
                      type="checkbox" 
                    />
                    <span>Wyróżniony produkt</span>
                  </div>
                </div>
                 <div className="form-el">
                  <label>Funkcjonalności</label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      value={newFeature}
                      placeholder="Dodaj funkcję"
                      onChange={(e) => setNewFeature(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFeature.trim()) {
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            features: [...prevProduct.features, newFeature.trim()],
                          }));
                          setNewFeature('');
                        }
                      }}
                    >
                      Dodaj
                    </button>
                  </div>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {feature}
                        <button
                          type="button"
                          onClick={() => {
                            setProduct((prevProduct) => ({
                              ...prevProduct,
                              features: prevProduct.features.filter((_, i) => i !== index),
                            }));
                          }}
                        >
                          ❌
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="form-el">
                  <label>Finansowanie</label>
                  <div style={{border: "1px solid white", marginBottom: ".5rem", width: "600px"}}>
                    <input 
                      checked={product.financing[0].availability} 
                      onChange={() => handleChangeFinancingCheckbox(0)} 
                      type="checkbox" 
                    />
                    <span>Płatność jednorazowa</span>
                    {product.financing[0].availability && 
                      <div style={{margin: ".5rem 1rem"}}>
                        <FormInput 
                          label="Cena"
                          type="number"  
                          name="price" 
                          value={product.financing[0].price} 
                          onChange={e => handleChangeFinancingPrices(0,'price', e.target.value)}
                        />
                        {product.financing[0].discount_price.length && 
                          <FormInput 
                            label="Cena po promocji"
                            type="number"  
                            name="price" 
                            value={product.financing[0].discount_price} 
                            onChange={e => handleChangeFinancingPrices(0,'discount_price', e.target.value)}
                          />
                        }
                      </div>
                    }
                  </div>
                  <div style={{border: "1px solid white", marginBottom: ".5rem", width: "600px"}}>
                    <input 
                      checked={product.financing[1].availability} 
                      onChange={() => handleChangeFinancingCheckbox(1)} 
                      type="checkbox" 
                    />
                    <span>Abonament 12 miesięcy</span>
                    {product.financing[1].availability && 
                      <div style={{margin: ".5rem 1rem"}}>
                        <FormInput 
                          label="Cena"
                          type="number"  
                          name="price" 
                          value={product.financing[1].price} 
                          onChange={e => handleChangeFinancingPrices(1,'price', e.target.value)}
                        />
                        {product.financing[1].discount_price.length && 
                          <FormInput 
                            label="Cena po promocji"
                            type="number"  
                            name="price" 
                            value={product.financing[1].discount_price} 
                            onChange={e => handleChangeFinancingPrices(1,'discount_price', e.target.value)}
                          />
                        }
                      </div>
                    }
                  </div>
                  <div style={{border: "1px solid white", marginBottom: ".5rem", width: "600px"}}>
                    <input 
                      checked={product.financing[2].availability}  
                      onChange={() => handleChangeFinancingCheckbox(2)} 
                      type="checkbox" 
                    />
                    <span>Abonament 24 miesiące</span>
                    {product.financing[2].availability && 
                      <div style={{margin: ".5rem 1rem"}}>
                        <FormInput 
                          label="Cena"
                          type="number"  
                          name="price" 
                          value={product.financing[2].price} 
                          onChange={e => handleChangeFinancingPrices(2,'price', e.target.value)}
                        />
                        {product.financing[2].discount_price.length && 
                          <FormInput 
                            label="Cena po promocji"
                            type="number"  
                            name="price" 
                            value={product.financing[2].discount_price} 
                            onChange={e => handleChangeFinancingPrices(2,'discount_price', e.target.value)}
                          />
                        }
                      </div>
                    }
                  </div>
                </div>
                <FormArea
                  rows={10}
                  label="Short Description"
                  name="description" 
                  value={product.description} 
                  onChange={handleChange}
                />
                {/* <label>Główne zdjęcie</label>
                <input type="file" name="prewievImage" onChange={handleFileChange} accept="image/*" />
                {product.previewImage && (
                  <div style={{ marginTop: '10px' }}>
                      <p>Preview:</p>
                      <img src={`http://localhost:5000${product.previewImage}`} alt="Preview" style={{ width: '350px', height: 'auto' }} />
                  </div>
                )} */}
            </Form>
        </div>
    </S.AdminBoard>
  )
}

export default AdminProductsEdit;
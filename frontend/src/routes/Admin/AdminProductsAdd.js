import React, { useState } from 'react';
import * as S from './style';
import { Form, FormInput, FormArea } from '../Elements/Form';
import { v4 as uuidv4 } from 'uuid';
import { addProduct } from '../../services/products.service';
import ProductSample from './product-sample.json';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminProductsAdd() {
  const navigate = useNavigate();
  const [newFeature, setNewFeature] = useState('');
  const [product, setProduct] = useState({
    title: ProductSample.name,
    type: '',
    visible: true,
    special: false,
    description: ProductSample.shortDescription,
    demoUrl: '',
    features: [
      "Blog",
      "Newsletter", 
      "WhatsApp Chat",
      "Galeria zdjęć",
      "Slider", 
      "Formularz kontaktowy", 
      "Minimalistyczny Sklep",
      "Koszyk zakupowy",
      "Pakiety cenowe",
      "Tabela cen",
      "Suwak cenowy",
      "Sekcja “Zaufali nam”",
      "Sekcja FAQ",
      "Członkowie zespołu",
      "Animacje",
      "Wykresy kołowe",
      "Wyszukaj na stronie"
    ],
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
    previewImage: '',
    wordpressZipUrl: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      previewImage: file,
    }));
        setPreviewImage(URL.createObjectURL(file));
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
        wordpressZipUrl: `http://${process.env.REACT_APP_SERVER_URL}/zips/${slug + "-" + shortId}.zip`
      }));
  }

  const handleAddProduct = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("features", JSON.stringify(product.features));
  formData.append("productCode", product.productCode);
  formData.append("financing", JSON.stringify(product.financing));
  formData.append("special", product.special);
  formData.append("visible", product.visible);
  formData.append("demoUrl", product.demoUrl);
  formData.append("wordpressZipUrl", product.wordpressZipUrl);

  if (product.previewImage) {
    formData.append("previewImage", product.previewImage);
  }

  try {
    await addProduct(formData);
    toast.success("Dodano produkt");
    resetForm()
    navigate('/admin-products')
  } catch (error) {
    console.error('Error sending product:', error.response?.data || error.message);
  }
};

function resetForm() {
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
    previewImage: null,
  });
  setPreviewImage(null)
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
            <Form sendText="Dodaj Produkt" handleSubmit={e => handleAddProduct(e)}>
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
                <FormInput 
                  label="Wordpress Url"
                  name="wordpressZipUrl" 
                  value={product.wordpressZipUrl} 
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
                    <span>Widoczny od razu w sklepie</span>
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
                  {/* <div>
                    <input 
                      checked={product.homepage} 
                      onChange={() => {
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            homepage: !product.homepage,
                          }));
                      }} 
                      type="checkbox" 
                    />
                    <span>Widoczny na homepage carousel</span>
                  </div> */}
                </div>

                <div className="form-el">
                  <label>Promocja</label>
                  <div>
                    <input 
                      checked={product.discount} 
                      onChange={() => {
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            discount: !product.discount,
                          }));
                      }} 
                      type="checkbox" 
                    />
                    <span>Promocja od razu</span>
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
                        {product.discount && 
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
                        {product.discount && 
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
                        {product.discount && 
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
                <label>Główne zdjęcie</label>
                <input type="file" name="front_image" onChange={handleFileChange} accept="image/*" />
                {previewImage && (
                  <div style={{ marginTop: '10px' }}>
                      <p>Preview:</p>
                      <img src={previewImage} alt="Preview" style={{ width: '350px', height: 'auto' }} />
                  </div>
                )}
                {/* <div style={{marginTop:'4rem'}}>
                  <label>Dla Kogo</label>
                  <div style={{ width: 500, height: 300 }}>
                    <div ref={forWhoQuillRef} />
                  </div>
                </div>
                <div style={{marginTop:'4rem'}}>
                  <label>Zakładki</label>
                  <div style={{ width: 500, height: 300 }}>
                    <div ref={pagesQuillRef} />
                  </div>
                </div>
                <div style={{marginTop:'4rem'}}>
                  <label>Funkcjonalności</label>
                  <div style={{ width: 500, height: 300 }}>
                    <div ref={functionalitiesQuillRef} />
                  </div>
                </div> */}
                {/* <div style={{marginTop:'4rem'}}>
                  <label>W cenie</label>
                  <div style={{ width: 500, height: 300 }}>
                    <div ref={payingForQuillRef} />
                  </div>
                </div> */}
            </Form>
        </div>
    </S.AdminBoard>
  )
}

export default AdminProductsAdd;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductAPI from '../../API/ProductAPI';

const imageStyle = {
  position: 'relative',
  width: '100%',
};

const btnStyle = {
  position: 'absolute',
  zIndex: '1',
  right: '0',
  top: '0',
  color: 'red',
};

const EditProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async productId => {
      const response = await ProductAPI.getDetail(productId);
      setProduct(response);
    };
    getDetail(productId);
  }, []);

  const handleChange = e => {
    setProduct(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRemoveImage = url => {
    setProduct(prev => ({
      ...prev,
      imageURL: product.imageURL.filter(image => image !== url),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const files = e.target.image.files;

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('image', files[i]);
    }
    data.append('name', product.name);
    data.append('price', product.price);
    data.append('category', product.category);
    data.append('stock', product.stock);
    data.append('imageURL', product.imageURL);
    data.append('short_desc', product.short_desc);
    data.append('long_desc', product.long_desc);

    await ProductAPI.updateProduct(productId, data);
    navigate('/products');
  };

  return (
    <div className='page-wrapper d-block'>
      <div className='page-breadcrumb'>
        <div className='row'>
          <div className='col-12'>
            <form
              className='col-10'
              onSubmit={handleSubmit}
              encType='multipart/form-data'
            >
              <div class='form-group'>
                <label htmlFor='name'>Product Name</label>
                <input
                  type='text'
                  class='form-control'
                  id='name'
                  placeholder='Enter Product Name'
                  required
                  defaultValue={product.name}
                  onChange={handleChange}
                />
              </div>
              <div class='form-group'>
                <label htmlFor='price'>Price</label>
                <input
                  type='number'
                  class='form-control'
                  id='price'
                  placeholder='Enter Price'
                  required
                  min='0'
                  defaultValue={product.price}
                  onChange={handleChange}
                />
              </div>
              <div class='form-group'>
                <label htmlFor='category'>Category</label>
                <input
                  type='text'
                  id='category'
                  class='form-control'
                  placeholder='Enter Category'
                  required
                  defaultValue={product.category}
                  onChange={handleChange}
                />{' '}
              </div>
              <div className='form-group'>
                <label htmlFor='stock'>Stock</label>
                <input
                  type='number'
                  id='stock'
                  className='form-control'
                  placeholder='Enter Stock'
                  defaultValue={product.stock}
                  required
                  onChange={handleChange}
                />{' '}
              </div>
              <div class='form-group'>
                <label htmlFor='short_desc'>Short Description</label>
                <textarea
                  class='form-control'
                  rows='2'
                  id='short_desc'
                  placeholder='Enter Short Description'
                  required
                  defaultValue={product.short_desc}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div class='form-group'>
                <label htmlFor='long_desc'>Long Description</label>
                <textarea
                  class='form-control'
                  rows='4'
                  id='long_desc'
                  placeholder='Enter Long Description'
                  required
                  defaultValue={product.long_desc}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div class='form-group'>
                <div class='row'>
                  {product.imageURL?.map(image => (
                    <div className='col-3'>
                      <button
                        className='close'
                        style={btnStyle}
                        onClick={() => handleRemoveImage(image)}
                      >
                        <span>&times;</span>
                      </button>
                      <img src={image} alt='product' style={imageStyle} />
                    </div>
                  ))}
                </div>
                <label htmlFor='image'>Upload image (4 images)</label>
                <input
                  type='file'
                  class='form-control-file'
                  id='image'
                  multiple
                />
              </div>

              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <footer className='footer text-center text-muted'>
        All Rights Reserved by Adminmart. Designed and Developed by
        <a href='https://www.facebook.com/nunhivole/'> Hoang Son</a>.
      </footer>
    </div>
  );
};

export default EditProduct;

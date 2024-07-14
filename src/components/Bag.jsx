import React, { useState, useEffect } from 'react';

const Bag = () => {
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      
      const data = [
        {
          id: 'rec1JZlfCIBOPdcT2',
          title: 'Samsung Galaxy S8',
          price: '399.99',
          img: 'https://www.course-api.com/images/cart/phone-1.png',
          amount: 1,
        },
        {
          id: 'recB6qcHPxb62YJ75',
          title: 'google pixel',
          price: '499.99',
          img: 'https://www.course-api.com/images/cart/phone-2.png',
          amount: 1,
        },
        {
          id: 'recdRxBsE14Rr2VuJ',
          title: 'Xiaomi Redmi Note 2',
          price: '699.99',
          img: 'https://www.course-api.com/images/cart/phone-3.png',
          amount: 1,
        },
        {
          id: 'recwTo160XST3PIoW',
          title: 'Samsung Galaxy S7',
          price: '599.99 ',
          img: 'https://www.course-api.com/images/cart/phone-4.png',
          amount: 1,
        },
      ];

      setProducts(data);
      setTotalAmount(data.reduce((acc, product) => acc + product.amount, 0));
    };

    fetchData();
  }, []);

  const handleAmountClick = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          let newAmount = product.amount;
          if (product.amount % 2 === 0) {
            newAmount = product.amount + 1;
            setTotalAmount((prevTotal) => prevTotal + 1);
          } else if (product.amount % 2 !== 0 && product.amount > 0) {
            newAmount = product.amount - 1;
            setTotalAmount((prevTotal) => prevTotal - 1);
          }
          return { ...product, amount: newAmount };
        }
        return product;
      })
    );
  };

  const handleRemoveClick = (id) => {
    const productToRemove = products.find((product) => product.id === id);
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    setTotalAmount((prevTotal) => prevTotal - productToRemove.amount);
  };

  const handleClearCart = () => {
    setProducts([]);
    setTotalAmount(0);
  };

  return (
    <div>
      <h1 className="text-center">Your Bag</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <img src={product.img} alt={product.title} style={{ width: '100px', marginRight: '10px' }} />
            <div style={{ flexGrow: 1 }}>
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <button className="bg-success text-light border-0"
                onClick={() => handleAmountClick(product.id)}
                
              >
                Amount: {product.amount}
              </button>
            </div>
            <button className="bg-danger text-light border-0 m-4"
             onClick={() => handleRemoveClick(product.id)} >
              Remove
            </button>
          </li>
          
        ))}
        <button className="bg-danger text-light border-0 m-4 position-absolute" 
        onClick={handleClearCart}>
        Clear Cart
      </button>
      <p>Total Amount: {totalAmount}</p>
      </ul>
      
    </div>
  );
};

export default Bag;

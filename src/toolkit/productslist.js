// ProductList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addToCart, increment, decrement } from "./store";
import classes from "./productlist.module.css";
import { trimString } from "../utilities/comman";

import heart from "../images/Group 4.png";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { items, loading, error, count } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleAddToCart = (i, product) => {
    dispatch(addToCart({ i, product }));
    if (product.view_status === 1) {
      navigate("cart");
    }
  };

  const handleIncreaseQuantity = (product_id) => {
    dispatch(increment({ product_id }));
  };

  const handleDecreaseQuantity = (product_id) => {
    dispatch(decrement({ product_id }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className={classes.cart}>
        <div onClick={() => navigate("/cart")}>
          cart:<span>{count}</span>
        </div>
      </div>
      <div className={classes.container}>
        {" "}
        {items.map((product, i) => (
          <div key={i}>
            <div className={classes.product_container} key={product.product_id}>
              <div className={classes.imgdiv}>
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "15px",
                  }}
                  src={product.img_path}
                ></img>
              </div>
              <div className={classes.name}>
                <div>{trimString(product.name, 20)}</div>
                <div>{product.price}</div>
              </div>
              <div className={classes.hovereffect}>
                <div>
                  <img src={heart}></img>
                </div>
                <div className={classes.cart_btn}>
                  <div className={classes.plus_minus}>
                    <button
                      onClick={() => handleDecreaseQuantity(product.product_id)}
                    >
                      -
                    </button>
                    <span>{product.qty}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(product.product_id)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button onClick={() => handleAddToCart(i, product)}>
                      {product.view_status === 1 ? "view cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

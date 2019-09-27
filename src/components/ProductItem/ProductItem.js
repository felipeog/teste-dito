import React from "react";

/* ProductItem
Exibe os dados do produto de uma compra.
*/
const ProductItem = props => {
  const { productName, productPrice } = props.product;

  return (
    <tr>
      <td>{productName}</td>
      <td>{productPrice}</td>
    </tr>
  );
};

export default ProductItem;

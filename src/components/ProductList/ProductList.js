import React from "react";
import ProductItem from "../ProductItem/ProductItem";

/* ProductList
Exibe os produtos de uma compra.
Para cada produto, renderiza um componente ProductItem.
*/
const ProductList = props => (
  <table className="product-list">
    <tr>
      <th>Produto</th>
      <th>Preço</th>
    </tr>

    {props.products.map(product => (
      <ProductItem product={product} />
    ))}
  </table>
);

export default ProductList;

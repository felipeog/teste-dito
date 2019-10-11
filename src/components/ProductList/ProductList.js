import React from 'react'
import ProductItem from '../ProductItem/ProductItem'

/* ProductList
Exibe os produtos de uma compra.
Para cada produto, renderiza um componente ProductItem.
*/
const ProductList = props => (
  <table className='product-list'>
    <thead>
      <tr>
        <th>Produto</th>
        <th>Preço</th>
      </tr>
    </thead>

    <tbody>
      {props.products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </tbody>
  </table>
)

export default ProductList

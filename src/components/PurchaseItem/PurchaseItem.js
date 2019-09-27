import React from "react";
import ProductList from "../ProductList/ProductList";

import icons from "../../assets/icons";

/* PurchaseItem
Exibe os dados de uma compra.
Renderiza o componente ProductList.
*/
const PurchaseItem = props => {
  const { date, time, storeName, revenue, products } = props.purchase;

  return (
    <article className="purchase-item">
      <div className="purchase-item__container">
        <header>
          <ul className="purchase-item__meta">
            <li className="purchase-item__item">
              <div
                className="purchase-item__icon"
                dangerouslySetInnerHTML={{ __html: icons.calendar }}
              />
              {date}
            </li>
            <li className="purchase-item__item">
              <div
                className="purchase-item__icon"
                dangerouslySetInnerHTML={{ __html: icons.clock }}
              />
              {time}
            </li>
            <li className="purchase-item__item">
              <div
                className="purchase-item__icon"
                dangerouslySetInnerHTML={{ __html: icons.place }}
              />
              {storeName}
            </li>
            <li className="purchase-item__item">
              <div
                className="purchase-item__icon"
                dangerouslySetInnerHTML={{ __html: icons.money }}
              />
              {revenue}
            </li>
          </ul>
        </header>

        <div className="purchase-item__products">
          {<ProductList products={products} />}
        </div>

        <div
          className="purchase-item__check"
          dangerouslySetInnerHTML={{ __html: icons.check }}
        />
      </div>
    </article>
  );
};

export default PurchaseItem;

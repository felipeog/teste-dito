import React from "react";
import ProductList from "../ProductList/ProductList";

import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { ReactComponent as Clock } from "../../assets/icons/clock.svg";
import { ReactComponent as Money } from "../../assets/icons/money.svg";
import { ReactComponent as Place } from "../../assets/icons/place.svg";

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
              <Calendar className="purchase-item__icon" />
              {date}
            </li>
            <li className="purchase-item__item">
              <Clock className="purchase-item__icon" />
              {time}
            </li>
            <li className="purchase-item__item">
              <Place className="purchase-item__icon" />
              {storeName}
            </li>
            <li className="purchase-item__item">
              <Money className="purchase-item__icon" />
              {revenue}
            </li>
          </ul>
        </header>

        <div className="purchase-item__products">
          {<ProductList products={products} />}
        </div>

        <Check className="purchase-item__check" />
      </div>
    </article>
  );
};

export default PurchaseItem;

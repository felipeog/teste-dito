import React from "react";
import { CSSTransition } from "react-transition-group";
import PurchaseItem from "../PurchaseItem/PurchaseItem";

/* PurchaseList
Itera sobre o array de compras.
Para cada compra, renderiza um componente PurchaseItem.
*/
const PurchaseList = props => (
  <CSSTransition in={true} appear={true} timeout={800} classNames="fade">
    <section className="purchase-list">
      {props.purchases.map(purchase => (
        <PurchaseItem purchase={purchase} />
      ))}
    </section>
  </CSSTransition>
);

export default PurchaseList;

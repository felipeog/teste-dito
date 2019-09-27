import React from "react";
import PurchaseItem from "../PurchaseItem/PurchaseItem";

/* PurchaseList
Itera sobre o array de compras.
Para cada compra, renderiza um componente PurchaseItem.
*/
const PurchaseList = props => (
  <section className="purchase-list">
    {props.purchases.map(purchase => (
      <PurchaseItem purchase={purchase} />
    ))}
  </section>
);

export default PurchaseList;

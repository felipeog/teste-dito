import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import PurchaseItem from '../PurchaseItem/PurchaseItem'
import moment from 'moment'

/* PurchaseList
Itera sobre o array de compras.
Para cada compra, renderiza um componente PurchaseItem.
*/
class PurchaseList extends Component {
  sortEventsDec = (a, b) => {
    if (a.timestamp > b.timestamp) return -1
    if (a.timestamp < b.timestamp) return 1
    return 0
  }

  getCustomData = (event, key) => {
    const customDataId = event.custom_data.findIndex(data => data.key === key)
    const customDataValue = event.custom_data[customDataId].value

    return customDataValue
  }

  setPurchases = events => {
    const purchases = events.filter(event => event.event === 'comprou')
    const products = events.filter(event => event.event === 'comprou-produto')

    let formattedPurchases = []

    purchases.sort(this.sortEventsDec).forEach(purchase => {
      const purchaseTransactionId = this.getCustomData(
        purchase,
        'transaction_id'
      )
      const purchaseProducts = products.filter(
        product =>
          this.getCustomData(product, 'transaction_id') ===
          purchaseTransactionId
      )

      const date = moment(purchase.timestamp).format('DD/MM/YYYY')
      const time = moment(purchase.timestamp).format('HH:mm')
      const revenue = purchase.revenue.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })
      const transactionId = this.getCustomData(purchase, 'transaction_id')
      const storeName = this.getCustomData(purchase, 'store_name')

      let formattedProducts = []

      purchaseProducts.forEach(product => {
        const date = moment(product.timestamp).format('DD/MM/YYYY')
        const productName = this.getCustomData(product, 'product_name')
        const productPrice = this.getCustomData(
          product,
          'product_price'
        ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

        formattedProducts = [
          ...formattedProducts,
          {
            date,
            productName,
            productPrice
          }
        ]
      })

      formattedPurchases = [
        ...formattedPurchases,
        {
          date,
          time,
          revenue,
          transactionId,
          storeName,
          products: formattedProducts
        }
      ]
    })

    return formattedPurchases
  }

  render() {
    const purchases = this.setPurchases(this.props.events)

    return (
      <CSSTransition in={true} appear={true} timeout={800} classNames='fade'>
        <section className='purchase-list'>
          {purchases.map((purchase, index) => (
            <PurchaseItem key={index} purchase={purchase} />
          ))}
        </section>
      </CSSTransition>
    )
  }
}

export default PurchaseList

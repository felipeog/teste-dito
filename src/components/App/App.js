import React from "react";
import moment from "moment";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import PurchaseList from "../PurchaseList/PurchaseList";

/* App
Consome o endpoint que contém os eventos.
Manipula os eventos de modo a organizá-los.
Envia os dados processados para o componente PurchaseList.
*/
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Conterá os eventos após manipulação
      purchases: [],
      // Assume true caso ocorra caso um erro no consumo do endpoint
      error: false
    };
  }

  // Organiza eventos em ordem decrescente
  sortEventsDec = (a, b) => {
    if (a.timestamp > b.timestamp) return -1;
    if (a.timestamp < b.timestamp) return 1;
    return 0;
  };

  // Facilita a extração de dados dos eventos
  getCustomData = (event, key) => {
    const customDataId = event.custom_data.findIndex(data => data.key === key);
    const customDataValue = event.custom_data[customDataId].value;

    return customDataValue;
  };

  // Manipulação dos eventos
  setPurchases = events => {
    // Separa os eventos "comprou" e "comprou-produto"
    const purchases = events.filter(event => event.event === "comprou");
    const products = events.filter(event => event.event === "comprou-produto");

    // Array que conterá as compras devidamente formatadas
    let formattedPurchases = [];

    purchases
      // Ordena o array de forma decrescente
      .sort(this.sortEventsDec)
      // Itera sobre os eventos "comprou"
      .forEach(purchase => {
        // Filtra os eventos "comprou-produto" que possuem
        // o mesmo "transaction_id" do evento "comprou" sendo iterado
        const purchaseTransactionId = this.getCustomData(
          purchase,
          "transaction_id"
        );
        const purchaseProducts = products.filter(
          product =>
            this.getCustomData(product, "transaction_id") ===
            purchaseTransactionId
        );

        // Formata dados
        const date = moment(purchase.timestamp).format("DD/MM/YYYY");
        const time = moment(purchase.timestamp).format("HH:mm");
        const revenue = purchase.revenue.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL"
        });
        const transactionId = this.getCustomData(purchase, "transaction_id");
        const storeName = this.getCustomData(purchase, "store_name");

        // Array que conterá os produtos da compra devidamente formatados
        let formattedProducts = [];

        // Itera sobre os eventos "comprou-produto" filtrados anteriormente
        purchaseProducts.forEach(product => {
          // Formata dados
          const date = moment(product.timestamp).format("DD/MM/YYYY");
          const productName = this.getCustomData(product, "product_name");
          const productPrice = this.getCustomData(
            product,
            "product_price"
          ).toLocaleString("pt-br", { style: "currency", currency: "BRL" });

          // Adiciona os dados formatados ao array em forma de objeto
          formattedProducts = [
            ...formattedProducts,
            {
              date,
              productName,
              productPrice
            }
          ];
        });

        // Adiciona os dados formatados ao array em forma de objeto
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
        ];
      });

    // Define o state com os dados processados
    this.setState({ purchases: formattedPurchases });
  };

  // Comsumo do endpoint na montagem do componente
  componentDidMount() {
    axios
      .get("https://storage.googleapis.com/dito-questions/events.json")
      // Chama a função de manipulação de dados
      .then(res => this.setPurchases(res.data.events))
      .catch(err => {
        console.error(err);
        // Define o state caso ocorra um erro
        this.setState({ error: true });
      });
  }

  // Renderização
  render() {
    return (
      <div className="wrapper">
        {this.state.error ? ( // Mostra uma mensagem de erro caso ocorra um erro no consumo do endpoint
          <p>Erro ao carregar timeline de compras</p>
        ) : (
          <CSSTransition
            in={true}
            appear={true}
            timeout={400}
            classNames="fade"
          >
            <PurchaseList purchases={this.state.purchases} />
          </CSSTransition>
        )}
      </div>
    );
  }
}

export default App;

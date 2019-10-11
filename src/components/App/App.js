import React from 'react'
import PurchaseList from '../PurchaseList/PurchaseList'

import { connect } from 'react-redux'
import { fetchEvents } from '../../redux'

/* App
Consome o endpoint que contém os eventos.
Manipula os eventos de modo a organizá-los.
Envia os dados processados para o componente PurchaseList.
*/
class App extends React.Component {
  componentDidMount() {
    this.props.fetchEvents()
  }

  render() {
    let output

    if (this.props.error) {
      output = <p>Erro ao carregar timeline de compras</p>
    } else if (this.props.events.events !== undefined) {
      output = <PurchaseList events={this.props.events.events} />
    } else if (this.props.loading) {
      output = <p>Carregando...</p>
    } else {
      output = <p>Não sei</p>
    }

    return <div className='wrapper'>{output}</div>
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    events: state.events,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import React from "react"
import { Link } from "react-router-dom";
import DropList from "./Droplist"

class MobileListConversionPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      baseCurrency: "Your Currency",
      inputValue: 1,
      listOfCurrencies: [],
      changes: true
    }
    this.exchangeList = this.exchangeList.bind(this)
    this.setBaseCurrency = this.setBaseCurrency.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  setBaseCurrency(event) {
    let currency = event.target.innerText;
    if(currency === ""){
      currency = event.target.parentNode.innerText
    }
    this.setState({
      baseCurrency: currency,
      changes: true
    })
  }

  changeValue(event) {
    const inputValue = Number(event.target.value);
    this.setState({
      inputValue: inputValue
    })
  }

  exchangeList(){
    if(this.state.changes === false || this.state.baseCurrency ==="Currency"){
      return;
    }
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.baseCurrency}`)
      .then((response) => {
        if(response.ok){
          return response.json()
        }
      })
      .then((data) => {
        const rates = Object.entries(data.rates);
        this.setState({
          listOfCurrencies: rates,
          changes: false
        })
        }
      )
  }

  componentDidUpdate(){
    this.exchangeList()
  }

  render(){
    const listOfCurrencies = this.state.listOfCurrencies.map((currency) => {
      return(
            <div className="col-6 col-sm-4 col-lg-3">
              <p key={currency[0]} className="currency-list">
                <img src={`https://www.countryflags.io/${currency[0].slice(0, 2)}/flat/64.png`} className="rounded-circle" alt=""/>
                {currency[0]}:{(currency[1]*this.state.inputValue).toFixed(2)}</p>
            </div>
      )
    })

    return(
      <div>
        <DropList setCurrency="listCurrency" data={this.state} setBaseCurrency={this.setBaseCurrency} setCompareCurrency = {this.setCompareCurrency} changeValue = {this.changeValue}/>
        <div className="container-fluid">
          <div className="currency-display row">
            {listOfCurrencies}
          </div>
        </div>
        <div className="d-flex justify-content-center my-5">
          <Link to={`/`} className="mx-4">Home
          </Link>
          <Link to={`/mobileonetoonepage/`} className="mx-4">One to one mode
          </Link>
        </div>
      </div>
    )
  }
}

export default MobileListConversionPage

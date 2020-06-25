import React from "react"
import { Link } from "react-router-dom";
import DropList from "./Droplist"

class MobileOnetoOnePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      baseCurrency: "Your Currency",
      comparedCurrency: "Exchanged to",
      inputValue: "",
      exchangeRate: "",
    }
    this.setBaseCurrency = this.setBaseCurrency.bind(this)
    this.setCompareCurrency = this.setCompareCurrency.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.getExchangeRate = this.getExchangeRate.bind(this)
    this.currencySwap = this.currencySwap.bind(this)
  }

  getExchangeRate(){
    const {baseCurrency, comparedCurrency} = this.state;
    if((baseCurrency ==="Your Currency" || baseCurrency ==="Exchanged to") || (comparedCurrency ==="Exchanged to" ||comparedCurrency ==="Your Currency")){
      return;
    }
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${baseCurrency}&symbols=${comparedCurrency}`)
      .then((response) => {
        if(response.ok){
          return response.json()
        }
      })
      .then((data) => {
        const rates = data.rates[`${comparedCurrency}`];
        this.setState({
          exchangeRate: rates
        })
        }
      )
  }

  setBaseCurrency(event) {
    let currency = event.target.innerText;
    if(currency === ""){
      currency = event.target.parentNode.innerText
    }
    this.setState({
      baseCurrency: currency
    })
  }

  setCompareCurrency(event) {
    let currency = event.target.innerText;
    if(currency === ""){
      currency = event.target.parentNode.innerText
    }
    this.setState({
      comparedCurrency: currency
    })
  }

  changeValue(event) {
    const inputValue = Number(event.target.value);
    this.setState({
      inputValue: inputValue
    })
  }

  componentWillUpdate(){
    this.getExchangeRate()
  }

  currencySwap(){
    const {baseCurrency, comparedCurrency} = this.state
    this.setState({
      baseCurrency: comparedCurrency,
      comparedCurrency: baseCurrency
    })
  }

  render(){
    return(
      <div className="main my-3">
        <div>
          <h3>From</h3>
          <DropList setCurrency="baseCurrency" data={this.state} setBaseCurrency={this.setBaseCurrency} setCompareCurrency = {this.setCompareCurrency} changeValue = {this.changeValue} getExchangeRate = {this.getExchangeRate}/>
          <div className="d-flex justify-content-center align-items-center w-100">
            <p className="arrow text-center mb-0" onClick={this.currencySwap}><i className="fas fa-arrows-alt-v"></i></p>
          </div>
          <h3>To</h3>
          <DropList setCurrency="comparedCurrency" data={this.state} setBaseCurrency={this.setBaseCurrency} setCompareCurrency = {this.setCompareCurrency} changeValue = {this.changeValue} getExchangeRate = {this.getExchangeRate}/>
        </div>
        <div className="d-flex justify-content-center my-5">
          <Link to={`/`} className="mx-4">Home
          </Link>
          <Link to={`/mobilelistconversionpage/`} className="mx-4">List mode
          </Link>
        </div>
      </div>
    )
  }
}

export default MobileOnetoOnePage

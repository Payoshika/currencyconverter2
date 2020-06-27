import React from "react"
import { Link } from "react-router-dom";
import DropList from "./Droplist"
import LineExample from "./Chart"

class MobileOnetoOnePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      baseCurrency: "Your Currency",
      comparedCurrency: "Exchanged to",
      inputValue: "",
      exchangeRate: "",
      changes: true,
      labels: "",
      data: "",
    }
    this.setBaseCurrency = this.setBaseCurrency.bind(this)
    this.setCompareCurrency = this.setCompareCurrency.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.getExchangeRate = this.getExchangeRate.bind(this)
    this.currencySwap = this.currencySwap.bind(this)
    this.getHistoricalData = this.getHistoricalData.bind(this)
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
      baseCurrency: currency,
      changes: true
    })
  }

  setCompareCurrency(event) {
    let currency = event.target.innerText;
    if(currency === ""){
      currency = event.target.parentNode.innerText
    }
    this.setState({
      comparedCurrency: currency,
      changes: true
    })
  }

  changeValue(event) {
    const inputValue = Number(event.target.value);
    this.setState({
      inputValue: inputValue
    })
  }

  componentDidUpdate(){
    this.getExchangeRate()
    this.getHistoricalData()
  }

  currencySwap(){
    const {baseCurrency, comparedCurrency} = this.state
    this.setState({
      baseCurrency: comparedCurrency,
      comparedCurrency: baseCurrency,
      changes: true
    })
  }

  getHistoricalData(){
    const {baseCurrency, comparedCurrency} = this.state;
    if((baseCurrency ==="Your Currency" || baseCurrency ==="Exchanged to") || (comparedCurrency ==="Exchanged to" ||comparedCurrency ==="Your Currency")){
      return;
    }
    if(this.state.changes === false){
      return;
    }
    let dateGenerator= new Date();
    let year = String(dateGenerator.getFullYear())
    let month =String(dateGenerator.getMonth()+1)
    if(month.length === 1){
      month = 0 + month
    }
    let aMonthAgo = String(dateGenerator.getMonth())
    if(aMonthAgo.length === 1){
      aMonthAgo = 0 + aMonthAgo
    }
    let date =String(dateGenerator.getDate())
    if(date.length === 1){
      date = 0 + date
    }
    let basedate = `${year}-${month}-${date}`
    let pastdate = `${year}-${aMonthAgo}-${date}`
    fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${pastdate}&end_at=${basedate}&base=${baseCurrency}&symbols=${comparedCurrency}`)
      .then((response) => {
        if(response.ok){
          return response.json()
        }
      })
      .then((data) => {
        const newdata = Object.entries(data.rates).map((entries) => {
          return(
            [entries[0].slice(5,10),entries[1][`${comparedCurrency}`]]
          )
        })
        const labels = newdata.map((date) => date[0])
        const plotData = newdata.map((data) => Number(data[1]))
        this.setState ({
          labels: labels,
          data: plotData,
          changes: false
        })
        console.log(newdata);
        }
      )
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <LineExample labels={this.state.labels} data={this.state.data}/>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center my-3">
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

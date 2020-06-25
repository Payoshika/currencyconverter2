import React from "react"

const DropList = (props) => {
  const currencyList = ["USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON", "SEK", "CHF", "ISK", "NOK", "RUB", "TRY", "AUD", "BRL", "CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP", "THB", "ZAR"]
  const {baseCurrency, comparedCurrency, inputValue, exchangeRate} = props.data;
  const setCurrency = props.setCurrency

  if(setCurrency === "baseCurrency"){
    return(
      <div className="base-currency input-group mb-3">
        <div className="input-group-prepend">
          <button className="btn btn-outline-secondary rounded dropdown-toggle" type="button" data-toggle="dropdown">
            <img src={`https://www.countryflags.io/${baseCurrency.slice(0, 2)}/flat/64.png`} className="rounded-circle" alt=""/>{baseCurrency}
          </button>
          <div className="dropdown-menu">
          {currencyList.map((currency) => {
            return (
              <span key={currency} className="dropdown-item" onClick={props.setBaseCurrency}>
                <img src={`https://www.countryflags.io/${currency.slice(0, 2)}/flat/64.png`} className="rounded-circle" alt=""/>{currency}</span>
            )
          })}
          </div>
        </div>
        <input type="number" className="form-control" min="1" step="1" value={inputValue} onChange={props.changeValue}/>
      </div>
    )
  }
  else if(setCurrency === "comparedCurrency"){
    return(
      <div className="compared-currency dropdown">
        <div className="input-group-prepend">
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
            <img src={`https://www.countryflags.io/${comparedCurrency.slice(0, 2)}/flat/64.png`} className="rounded-circle" alt=""/>
            {comparedCurrency}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {currencyList.map((currency) => {
            return (
              <span key={currency} className="dropdown-item d-flex align-items-center" onClick={props.setCompareCurrency}><img src={`https://www.countryflags.io/${currency.slice(0, 2)}/flat/64.png`} className="rounded-circle" alt=""/>{currency}</span>
            )
          })}
          </div>
          <input type="number" className="form-control" value={(inputValue * exchangeRate).toFixed(2)}/>
        </div>
      </div>
    )
  }
  else if(setCurrency === "listCurrency"){
    return(
      <div className="base-currency input-group mb-3">
        <div className="input-group-prepend">
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"><img src={`https://www.countryflags.io/${baseCurrency.slice(0, 2)}/flat/64.png`} className="rounded-circle" alt=""/>{baseCurrency}</button>
          <div className="dropdown-menu">
          {currencyList.map((currency) => {
            return (
              <span key={currency} className="dropdown-item d-flex align-items-center" onClick={props.setBaseCurrency}><img src={`https://www.countryflags.io/${currency.slice(0, 2)}/flat/64.png`} className="rounded-circle" alt=""/>{currency}</span>
            )
          })}
          </div>
        </div>
        <input type="number" className="form-control" min="1" step="1" value={inputValue} onChange={props.changeValue}/>
      </div>
    )
  }

}


export default DropList;

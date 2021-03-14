import React, { useState, useEffect } from "react";
import "../css/outputScreen.css";
import { useStateValue } from "../DataLayer";

const OutputScreen = () => {
  const [state] = useStateValue();
  const [showOutput, setShowOutput] = useState(false);
  const [formattedAmount, setFormattedAmount] = useState("0.00");

  useEffect(() => {
    if (state.amount !== null || window.innerWidth > 992) {
      setShowOutput(true);
      let x = parseFloat(state.amount).toFixed(2);
      x = x.toString();
      let afterPoint = "";
      if (x.indexOf(".") > 0)
        afterPoint = x.substring(x.indexOf("."), x.length);
      x = Math.floor(x);
      x = x.toString();
      let lastThree = x.substring(x.length - 3);
      const otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers != "") lastThree = "," + lastThree;
      const res =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        lastThree +
        afterPoint;
      setFormattedAmount(res);
    }
  }, [state.count]);

  const closeOutput = () => {
    setShowOutput(false);
  };

  return showOutput === true ? (
    <div className="output-area">
      <div className="large-viewport">
        <h3>Your monthly payment</h3>
        <h1>
          <span>₹</span>
          {state.amount > 0 && !isNaN(state.amount) ? formattedAmount : "0.00"}
        </h1>
        <div>
          <h5>Total principal paid</h5>
          <span>
            ₹
            {state.principal !== null
              ? Number(parseFloat(state.principal).toFixed(2)).toLocaleString(
                  "en",
                  {
                    minimumFractionDigits: 2,
                  }
                )
              : "0.00"}
          </span>
        </div>
        <hr />
        <div>
          <h5>Total interest paid</h5>
          <span>
            ₹
            {!isNaN(state.amount)
              ? state.time > 0 && state.principal > 0
                ? Number(
                    parseFloat(
                      state.amount * state.time - state.principal
                    ).toFixed(2)
                  ).toLocaleString("en", {
                    minimumFractionDigits: 2,
                  })
                : parseFloat(state.amount - state.principal).toFixed(2)
              : "0.00"}
          </span>
        </div>
        <button className="btn-color">Compare loan rates</button>
        <button className="btn-simple">Show authorization schedule</button>
        <button className="btn-simple">Add extra payments</button>
        <button className="btn-simple">Store Results</button>
      </div>

      <div className="small-viewport">
        <div className="left-content">
          <div className="left-content-wrapper">
            <button onClick={() => closeOutput()}>
              <img src="img/close-light.svg" alt="close" />
            </button>
            <h1 className="first-heading">The deffered</h1>
            <h1>payment loan</h1>
            <p>
              A loan is a contract in which the borrower recieves an amount of
              money that they are obligated to pay back in the future.
            </p>
            <div className="result">
              <div className="result-left">
                <h3>Your monthly payment</h3>
                <h1>
                  <span>₹</span>
                  {state.amount > 0 && !isNaN(state.amount)
                    ? formattedAmount
                    : "0.00"}
                </h1>
              </div>
              <div className="result-right">
                <div>
                  <h5>Total principal paid</h5>
                  <span>
                    ₹
                    {state.principal !== null
                      ? Number(
                          parseFloat(state.principal).toFixed(2)
                        ).toLocaleString("en", {
                          minimumFractionDigits: 2,
                        })
                      : "0.00"}
                  </span>
                </div>
                <div>
                  <h5>Total interest paid</h5>
                  <span>
                    ₹
                    {!isNaN(state.amount)
                      ? state.time > 0 && state.principal > 0
                        ? Number(
                            parseFloat(
                              state.amount * state.time - state.principal
                            ).toFixed(2)
                          ).toLocaleString("en", {
                            minimumFractionDigits: 2,
                          })
                        : parseFloat(state.amount - state.principal).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-content"></div>
      </div>
    </div>
  ) : null;
};

export default OutputScreen;

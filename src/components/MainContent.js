import React, { useState } from "react";
import "../css/mainContent.css";
import { useStateValue } from "../DataLayer";

const MainContent = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [time, setTime] = useState(0);
  const [rateStyle, setRateStyle] = useState({});
  const [principleStyle, setPrincipalStyle] = useState({});
  const [timeStyle, setTimeStyle] = useState({});

  const changeInput = (e, inputType) => {
    const left = `${(e.target.value / (e.target.max - e.target.min)) * 100}%`;
    if (inputType === "principal") {
      setPrincipal(e.target.value);
      setPrincipalStyle({ ...principleStyle, left: left });
    } else if (inputType === "rate") {
      setRate(e.target.value);
      setRateStyle({ ...rateStyle, left: left });
    } else if (inputType === "time") {
      setTime(e.target.value);
      setTimeStyle({ ...timeStyle, left: left });
    }
  };

  const calculateAmount = (e) => {
    e.preventDefault();
    const newRate = parseFloat(rate / 1200);
    if (time > 0) {
      const top = parseFloat(Math.pow(1 + newRate, time));
      const bottom = parseFloat(top - 1);
      const ratio = parseFloat(top / bottom);
      const amount = parseFloat(principal * newRate * ratio);
      console.log(amount);
      dispatch({
        type: "INTEREST_CALCULATED",
        amount: amount,
        time: time,
        principal: principal,
      });
    } else {
      const amount = parseFloat(principal * newRate) + parseFloat(principal);
      console.log(amount);
      dispatch({
        type: "INTEREST_CALCULATED",
        amount: amount,
        time: time,
        principal: principal,
      });
    }
  };

  return (
    <div className="main-content">
      <h1>The deferred</h1>
      <h1>payment loan</h1>
      <p>
        A loan is a contract in which the borrower recieves an amount of money
        that they are obligated to pay back in the future.
      </p>
      <form onSubmit={(e) => calculateAmount(e)}>
        <div className="bi-section">
          <div className="input-group">
            <div className="label-group">
              <span>Principal</span>
              <span>
                {Number(parseFloat(principal).toFixed(2)).toLocaleString("en", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="slider-wrapper">
              <div className="show-value">
                <span style={principleStyle}>{`${parseFloat(
                  (principal / 100000).toFixed(1)
                )}L`}</span>
              </div>
              <input
                type="range"
                name="principal"
                value={principal}
                onChange={(e) => changeInput(e, "principal")}
                min="0"
                step="50000"
                max="1000000"
              />
              <span className="range-label">Min</span>
              <span className="range-label range-label-right">Max</span>
            </div>
          </div>

          <div className="input-group input-group-margin">
            <div className="label-group">
              <span>Rate</span>
              <span>{rate}% P.A.</span>
            </div>
            <div className="slider-wrapper">
              <div className="show-value">
                <span style={rateStyle}>{`${rate}%`}</span>
              </div>
              <input
                type="range"
                name="rate"
                value={rate}
                onChange={(e) => changeInput(e, "rate")}
                min="0"
                step="0.5"
                max="20"
              />
              <span className="range-label">Min</span>
              <span className="range-label range-label-right">Max</span>
            </div>
          </div>
        </div>
        <div className="bi-section">
          <div className="input-group">
            <div className="label-group">
              <span>Time</span>
              <span>{time} Months</span>
            </div>
            <div className="slider-wrapper">
              <div className="show-value">
                <span style={timeStyle}>{`${time}M`}</span>
              </div>
              <input
                type="range"
                name="principal"
                value={time}
                onChange={(e) => changeInput(e, "time")}
                min="0"
                step="1"
                max="24"
              />
              <span className="range-label">Min</span>
              <span className="range-label range-label-right">Max</span>
            </div>
          </div>

          <div className="input-group input-group-margin">
            <button type="submit" className="btn-calculate">
              Calculate Loan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MainContent;

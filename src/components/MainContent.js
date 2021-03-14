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

  const changeInput = (e, setInput, setStyle, styleObject) => {
    setInput(e.target.value);
    const left = `${(e.target.value / (e.target.max - e.target.min)) * 100}%`;
    setStyle({ ...styleObject, left: left });
  };

  const calculateAmount = (e) => {
    e.preventDefault();
    const amount =
      parseInt(principal) + parseInt((principal * rate * time) / 100);
    if (amount > 0) {
      dispatch({
        type: "INTEREST_CALCULATED",
        amount: amount,
        time: time,
        principal: principal,
      });
    } else {
      dispatch({
        type: "INTEREST_CALCULATED",
        amount: null,
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
              <span>{(principal / 100000).toFixed(2)} Lakhs</span>
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
                onChange={(e) =>
                  changeInput(
                    e,
                    setPrincipal,
                    setPrincipalStyle,
                    principleStyle
                  )
                }
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
                onChange={(e) =>
                  changeInput(e, setRate, setRateStyle, rateStyle)
                }
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
              <span>{time} Yrs</span>
            </div>
            <div className="slider-wrapper">
              <div className="show-value">
                <span style={timeStyle}>{`${time}Y`}</span>
              </div>
              <input
                type="range"
                name="principal"
                value={time}
                onChange={(e) =>
                  changeInput(e, setTime, setTimeStyle, timeStyle)
                }
                min="0"
                step="0.5"
                max="10"
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

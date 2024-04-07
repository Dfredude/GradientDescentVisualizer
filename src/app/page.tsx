// pages/page.tsx
import React from 'react';
import Graph from '../../components/graph';

const Page: React.FC = () => {
  return (
    <section className="hero is-fullheight" id="playground">
      <div className="">
        <div className="">
          <h1 className="">It's your turn.</h1>
          <div className="">
            <div className="">
              <div className="">
                <label className="">Function</label>
                <div className="">
                  <input className="" type="text" id="function-input" defaultValue="x^2+x" />
                </div>
              </div>
              <p>functions you should try (click to auto-format):</p>
              <div className="">
                <button className="" id="fn-x-2">x<sup><sup>2</sup></sup></button>
                <button className="" id="fn-x-3">x<sup><sup>3</sup></sup></button>
                <button className="" id="fn-sin-x">sin(x)</button>
                <button className="" id="fn-1-x">1/x</button>
                <button className="" id="fn-poly-x">poly</button>
              </div>
              <div className="">
                <label className="">Starting Point</label>
                <div className="">
                  <input className="" id="initial-start" type="number" defaultValue="5" />
                </div>
              </div>
              <button className="" id="start-button">
                <span className="">
                  <i className=""></i>
                </span>
                <span>Set Up</span>
              </button>
              <hr />
              <div className="">
                <label className="">Learning Rate</label>
                <div className="">
                  <input className="" id="learning-rate" type="number" defaultValue="0.25" />
                </div>
              </div>
              <button className="" id="update-button">
                <span className="">
                  <i className=""></i>
                </span>
                <span>Next Iteration</span>
              </button>
            </div>
            <div className="">
              <Graph />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;

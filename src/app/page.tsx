// pages/page.tsx
import React from 'react';
import Graph from '../../components/graph';
import "./globals.css";
const Page: React.FC = () => {
  return (
    <div className="flex self-center">
      <section className="" id="playground">
        <div className= "flex self-center">
            <div className="p-20">
                <div className="">
                  <label className="text-xl italic">Function</label>
                  <div className="w-20 p-3">
                    <input className="border-4 border-indigo-500/50 rounded-md" type="text" id="function-input" defaultValue="x^2+x" />
                  </div>
                </div>
                <p className="italic">Functions worth a shot:</p>
                <div className="space-x-4">
                  <button className="p-5" id="fn-x-2">x<sup><sup>2</sup></sup></button>
                  <button className="p-5" id="fn-x-3">x<sup><sup>3</sup></sup></button>
                  <button className="p-5" id="fn-sin-x">sin(x)</button>
                  <button className="p-5" id="fn-1-x">1/x</button>
                  <button className="p-5" id="fn-poly-x">poly</button>
                </div>
                <div className="flex self-centern space-x-2 pt-5 pb-5">
                  <label className="italic">Starting Point</label>
                  <div className="pl-5">
                    <input className="w-10" id="initial-start" type="number" defaultValue="4" />
                  </div>
                  <button className="w-25 bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded" id="start-button">Set Up</button>
                </div>
                
                <hr />
                <div className="flex self-center pt-5 pb-5">
                  <label className="italic">Learning Rate</label>
                  <div className="pl-5">
                    <input className="" id="learning-rate" type="number" defaultValue="0.25" />
                  </div>
                </div>
                <button className="w-25 bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded" id="update-button">
                  Next Iteration
                </button>
            </div>
            <div className="rounded-lg shadow-xl m-20 p-20">
                <Graph />
            </div>
        </div>
    </section>
    </div>
  );
};

export default Page;

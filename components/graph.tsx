"use client"
import React, { useEffect } from 'react';
import functionPlot from 'function-plot';
import { derivative, compile, EvalFunction } from 'mathjs';

const Graph: React.FC = () => {
  let g1options: any = {
    target: '#graph-1',
    title: "Gradient Descent",
    xAxis: {
      label: 'x - axis',
      domain: [-6, 6]
    },
    yAxis: {
      label: 'y - axis',
      domain: [-18, 36]
    },
    data: [
      {
        fn: 'x^2+x',
        derivative: {
          fn: '2 * x + 1',
          x0: 2
        },
        attr: { "stroke-width": 3 }
      }
    ]
  };

  let started: boolean = false;
  let currentPos: number = 0;
  let iterator: number = 1;

  let inputFunc: string = '';
  let compiledFunc: EvalFunction;
  let derivativeFunc: EvalFunction;

  const badJSONDeepCopy = (obj: any): any => {
    return JSON.parse(JSON.stringify(obj));
  };

  const redrawPlot = (options: any, fn: string, deriv: string, evalAt: number, iter: number, pointsDiff?: any) => {
    delete options.title;
    functionPlot(options);

    options.title = "iteration " + iter;
    options.data[0].fn = fn;
    options.data[0].derivative = {
      fn: deriv,
      x0: evalAt
    };

    if (pointsDiff !== undefined) {
      if (options.data.length === 1) {
        options.data.push(
          {
            points: [pointsDiff],
            fnType: 'points',
            graphType: 'scatter'
          }
        );
      }
      else {
        options.data[1].points.push(pointsDiff);
      }
    }

    functionPlot(options);
  };

  const updatePos = (current: number, deriv: EvalFunction, learning: number): number => {
    return current + (-1 * deriv.evaluate({ x: current }) * learning);
  };

  useEffect(() => {
    const startButton = document.getElementById("start-button");
    const updateButton = document.getElementById("update-button");
    const fnX2 = document.getElementById("fn-x-2");
    const fnX3 = document.getElementById("fn-x-3");
    const fnSinX = document.getElementById("fn-sin-x");
    const fn1X = document.getElementById("fn-1-x");
    const fnPolyX = document.getElementById("fn-poly-x");
    const functionInput = (document.getElementById("function-input") as HTMLInputElement | null);
    const initialStart = (document.getElementById("initial-start") as HTMLInputElement | null);
    const learningRate = (document.getElementById("learning-rate") as HTMLInputElement | null);
    const currentPosElement = document.getElementById("current-pos");

    startButton?.addEventListener("click", () => {
      let inputEval = initialStart?.value;
      let evalAt = Number(inputEval);
      if (isNaN(evalAt)) { return; }

      iterator = 0;
      if (g1options.data.length >= 2) {
        g1options.data = [g1options.data[0]];
      }

      started = true;

      currentPos = evalAt;
      currentPosElement!.innerHTML = evalAt.toString();

      inputFunc = functionInput!.value;
      compiledFunc = compile(inputFunc);

      derivativeFunc = derivative(inputFunc, 'x');
      redrawPlot(g1options, inputFunc, derivativeFunc.toString(), currentPos, iterator, [currentPos, compiledFunc.evaluate({ x: currentPos })]);
    });

    updateButton?.addEventListener("click", () => {
      if (!started) { return; }
      let learningRateVal = learningRate?.value;
      if (isNaN(Number(learningRateVal))) { return; }

      iterator++;
      currentPos = updatePos(currentPos, derivativeFunc, Number(learningRateVal));

      currentPosElement!.innerHTML = currentPos.toString();
      redrawPlot(g1options, inputFunc, derivativeFunc.toString(), currentPos, iterator, [currentPos, compiledFunc.evaluate({ x: currentPos })]);
    });

    const setFnInputVal = (val: string, start: number = 4) => {
      functionInput!.value = val;
      initialStart!.value = start.toString();
    };

    fnX2?.addEventListener("click", () => setFnInputVal("x^2"));
    fnX3?.addEventListener("click", () => setFnInputVal("x^3"));
    fnSinX?.addEventListener("click", () => setFnInputVal("sin(x)", 2));
    fn1X?.addEventListener("click", () => setFnInputVal("1/x", 0.5));
    fnPolyX?.addEventListener("click", () => setFnInputVal("x + 2 * (x^2) + (0.4) * x^3", 2));

    functionPlot(g1options);
  }, []);

  return (
    <div>
      <div id="graph-1"></div>
      <div className="tags has-addons are-large">
        <span className="tag is-primary">Current Point</span>
        <span className="tag is-dark" id="current-pos">set up your graph!</span>
      </div>
    </div>
  );
};

export default Graph;

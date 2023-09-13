import React, {useState} from 'react';
import svgArr from './svg/svgList';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';

function DiceBoard()  {
  const [diceList, setList] = useState([]);
  const [data, setData] = useState([]);

  function newDice(fname) {
    setList([...diceList, fname]);

  }

  function removeDice(index) {
    const newList = diceList.filter((_,i) => i !== index);
    setList(newList);
  }

  function displayDice(dicef){
    if (dicef === 4){return 0};
    if (dicef === 6){return 1};
    if (dicef === 8){return 2};
    if (dicef === 10){return 3};
    if (dicef === 12){return 4;};
    if (dicef === 20){return 5};
  }

  function calculateGraph() {
    function dice(){
        function d(i){return Math.ceil(i*Math.random())};
        let fResult = 0;
        for (let j=0;j<diceList.length;j++){fResult = fResult + d(diceList[j]);}
        return fResult;
    }

    let samples = Array(10**5).fill().map(dice);
    let percentage = [];
    let indexes = [];
    let maxValue = Math.max(...samples);

    for(let side = 1;side<=maxValue;side++){
        let filteredSamples = samples.filter(element => element === side);
        let count = filteredSamples.length/samples.length*100;
        percentage.push(count);}

    for (let x of percentage.keys()){
      indexes.push(x+1);}

    let tableresults = [];
    for (let i=0;i<indexes.length;i++){
      tableresults[i] = {x: indexes[i], y: percentage[i]}
    }
    console.log(tableresults);
    return tableresults;
  }

  return (
    <div className='diceBoard'>
      <div className='diceList'>
        <button className ="newDice" onClick={() => newDice(4)}><img src={svgArr[0]} alt="d4" /></button>
        <button className ="newDice" onClick={() => newDice(6)}><img src={svgArr[1]} alt="d6" /></button>
        <button className ="newDice" onClick={() => newDice(8)}><img src={svgArr[2]} alt="d8" /></button>
        <button className ="newDice" onClick={() => newDice(10)}><img src={svgArr[3]} alt="d10" /></button>
        <button className ="newDice" onClick={() => newDice(12)}><img src={svgArr[4]} alt="d12" /></button>
        <button className ="newDice" onClick={() => newDice(20)}><img src={svgArr[5]} alt="d20" /></button>
      </div>
      <div className='diceOnTrack'>{diceList.map((diceList, index) => (<div><button className="dice" onClick={() => removeDice(index)}><img src={svgArr[displayDice(diceList)]} alt={diceList} /></button></div>))}</div>
      <div className="diceGraph">
        <XYPlot height={300} width={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={data} />
        </XYPlot>
      </div>
      <button 
        className='bottom-button' 
        onClick={() => setData(calculateGraph())}>
        <img src={svgArr[6]} alt="graph" />
      </button>
      <button 
        className='bottom-button'
        onClick={() => setList([])}>
        <img src={svgArr[7]} alt="graph" />
      </button>
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Dice-Stats</p>
      </header>
      <div className="App-body">
        <DiceBoard />
      </div>
    </div>
  );
}
import React, {useState} from 'react';
import logo from './logo.svg';
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
        <button className ="newDice" onClick={() => newDice(4)}>d4</button>
        <button className ="newDice" onClick={() => newDice(6)}>d6</button>
        <button className ="newDice" onClick={() => newDice(8)}>d8</button>
        <button className ="newDice" onClick={() => newDice(10)}>d10</button>
        <button className ="newDice" onClick={() => newDice(12)}>d12</button>
        <button className ="newDice" onClick={() => newDice(20)}>d20</button>
      </div>
      <div>{diceList.map((diceList, index) => (
          <button className="dice" onClick={() => removeDice(index)}>{diceList}</button>
      ))}</div>
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
        className='calculate' 
        onClick={() => setData(calculateGraph())}>
      Graphe</button>
      <button className="dice" onClick={() => console.log({data})}>Debug</button>

    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Dice-Stats</p>
      </header>
      <div className="App-body">
        <DiceBoard />
      </div>
    </div>
  );
}
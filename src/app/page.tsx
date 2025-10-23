"use client";

import { useEffect, useState } from "react";
import Chart from "./components/chart";


export default function Home() {
  const [memData, setMemData] = useState<number[]>([]);

  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);

  const [levelStyle, setLevelStyle] = useState("");

  const [boxActive, setBoxActive] = useState<boolean[]>([]);

  const [userData, setUserData] = useState<number[]>([]);

  // Generate path up to 25 levels deep, 
  // #45B1FF
  
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    let boxBuffer = [];
    for (let i = 0; i < 9; i++) {
      boxBuffer.push(false);
    } 

    setBoxActive(boxBuffer);

    resetLevelData();
  }, []);

  useEffect(() => {
    if (memData.length === 0 || boxActive.length === 0) return;
    (async () => {
      await displayLevel(level);
    })();
  }, [memData, level]);

  const click = (index: number) => {
    toggleBox(index, true);
  
    let p = progress;

    if (index === memData[progress]) {
      console.log("Progressing...", level, " | ", progress);
      setProgress(progress + 1);
      p++;
    } else { // wrong square combo
      setLevelStyle("flash-red");
      setTimeout(() => setLevelStyle(""), 600);

      resetLevelData();

      setProgress(0);
      setLevel(1);
    }

    if (p === level) { // level passed
      console.log("Level passed", level, " | ", progress);
      setLevelStyle("flash-white");
      setTimeout(() => setLevelStyle(""), 600);
      setLevel(level + 1);
      setProgress(0);
    }
  }

  const sendResults = async(result: number) => {

  }

  const toggleBox = (index: number, state: boolean) => {
    
    setBoxActive(() => {
      const arr = new Array(9).fill(false);
      if (state) arr[index] = true;
      return arr;
    });
  };


  const displayBox = async (index: number) => {
    await sleep(375);
    toggleBox(index, true);
    await sleep(375);
    toggleBox(index, false);  
  }

  // Display the current box depth
  const displayLevel = async (depth: number) => {
    for (let i = 0; i < depth; i++) {
      await displayBox(memData[i]);
    }
  }

  const resetLevelData = () => {
    let levelBuffer = [];

    //To avoid the box being the same index twice in a row
    let prev = 0;
    for (let i = 0; i < 25; i++) {
      let num: number;
      while ((num = Math.floor(Math.random() * 9)) === prev);
      prev = num;

      levelBuffer.push(num);
    }
    setMemData(levelBuffer);
  }

  return (<div className="w-full h-screen bg-[#E6E8F4]">
    <div className={`
      bg-[#2b87d1]
      ${levelStyle}
      w-full
      h-1/2
      flex
      flex-col

      items-center
      align-middle
      justify-center
    `}>
      <div className="flex justify-between align-middle items-center mb-4">
        <h1 className="opacity-50 text-white text-3xl">Level: </h1>
        <span className="ml-2 text-3xl text-white">{level}</span>
      </div>
      
      <div className="flex justify-between">
        <div className="flex flex-col justify-between w-35 h-102">
          <div className={`box ${boxActive[0] ? "active": ""}`} onMouseDown={()=>click(0)} onMouseUp={()=>toggleBox(0, false)}></div>
          <div className={`box ${boxActive[1] ? "active": ""}`} onMouseDown={()=>click(1)} onMouseUp={()=>toggleBox(1, false)}></div>
          <div className={`box ${boxActive[2] ? "active": ""}`} onMouseDown={()=>click(2)} onMouseUp={()=>toggleBox(2, false)}></div>
        </div>
        <div className="flex flex-col justify-between w-35 h-102">
          <div className={`box ${boxActive[3] ? "active": ""}`} onMouseDown={()=>click(3)} onMouseUp={()=>toggleBox(3, false)}></div>
          <div className={`box ${boxActive[4] ? "active": ""}`} onMouseDown={()=>click(4)} onMouseUp={()=>toggleBox(4, false)}></div>
          <div className={`box ${boxActive[5] ? "active": ""}`} onMouseDown={()=>click(5)} onMouseUp={()=>toggleBox(5, false)}></div>
        </div>
        <div className="flex flex-col justify-between h-102">
          <div className={`box ${boxActive[6] ? "active": ""}`} onMouseDown={()=>click(6)} onMouseUp={()=>toggleBox(6, false)}></div>
          <div className={`box ${boxActive[7] ? "active": ""}`} onMouseDown={()=>click(7)} onMouseUp={()=>toggleBox(7, false)}></div>
          <div className={`box ${boxActive[8] ? "active": ""}`} onMouseDown={()=>click(8)} onMouseUp={()=>toggleBox(8, false)}></div>
        </div>
      </div>
    </div>


    <div className="flex items-center justify-center h-1/2">

      <div className="bg-white shadow-md w-1/4 h-4/5 mr-6">
        <h1 className="text-4xl p-4">Statistics</h1>

        <Chart data={userData}></Chart>
      </div>

      <div className="bg-white shadow-md w-1/4 h-4/5">
        <h1> About the test </h1>
        <p>
          Memorize the sequence of buttons that light up,
          then press them in order.
        </p>

        <p>
          Every time you finish the pattern, it gets longer.
        </p>

        <p>
          Make a mistake, and the test is over.
        </p>        
      </div>
    </div>
  </div>)
}
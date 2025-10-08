"use client";

import { useEffect, useState } from "react";


export default function Home() {
  const [memData, setMemData] = useState<number[]>([]);
  const [level, setLevel] = useState(0);

  const [boxActive, setBoxActive] = useState<boolean[]>([]);

  // Generate path up to 25 levels deep, 
  // #45B1FF
  
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    console.log("first pass")
    let boxBuffer = [];
    for (let i = 0; i < 9; i++) {
      boxBuffer.push(false);
    } 

    setBoxActive(boxBuffer);

    let levelBuffer = [];
    for (let i = 0; i < 25; i++) {
      levelBuffer.push(Math.floor(Math.random() * 9))
    }
    setMemData(levelBuffer);
  }, []);

  useEffect(() => {
    (async () => {
      console.log("async")
      for (let i = 0; i < memData.length; i++) {
        console.log("1");
        await sleep(500);
        console.log("2");
        await sleep(500);
      }
    })() 
  }, [memData, boxActive]);

  const toggleBox = (index: number, state: boolean) => {
    console.log(`toggle ${index}`);
    

    const buffer = [...boxActive];
    
    if (buffer[index] != state) {
      if (state)  {
        let nBuffer = new Array<boolean>(9);
        nBuffer.fill(false, 0, 9);
        nBuffer[index] = true;
        setBoxActive(nBuffer);
        return ;
      }


      buffer[index] = state;
      setBoxActive(buffer);
    }
    
  };

  
  const square = (sq: number) => {

  }

  // Display the current box depth
  const displayLevel = async () => {

  }

  const levelPassed = () => {

  }

  return (<div className="w-full h-screen">

    <div className="
      bg-[#2b87d1]
      w-full
      h-1/2
      flex
      flex-col

      items-center
      align-middle
      justify-center
    ">
      <div className="flex justify-between align-middle items-center mb-4">
        <h1 className="opacity-50 text-white text-3xl">Level: </h1>
        <span className="ml-2 text-3xl text-white">{level}</span>
      </div>
      
      <div className="flex justify-between">
        <div className="flex flex-col justify-between w-35 h-102">
          <div className={`box ${boxActive[1] ? "active": ""}`} onMouseDown={()=>toggleBox(1, true)} onMouseUp={()=>toggleBox(1, false)}></div>
          <div className={`box ${boxActive[2] ? "active": ""}`} onMouseDown={()=>toggleBox(2, true)} onMouseUp={()=>toggleBox(2, false)}></div>
          <div className={`box ${boxActive[3] ? "active": ""}`} onMouseDown={()=>toggleBox(3, true)} onMouseUp={()=>toggleBox(3, false)}></div>
        </div>
        <div className="flex flex-col justify-between w-35 h-102">
          <div className={`box ${boxActive[4] ? "active": ""}`} onMouseDown={()=>toggleBox(4, true)} onMouseUp={()=>toggleBox(4, false)}></div>
          <div className={`box ${boxActive[5] ? "active": ""}`} onMouseDown={()=>toggleBox(5, true)} onMouseUp={()=>toggleBox(5, false)}></div>
          <div className={`box ${boxActive[6] ? "active": ""}`} onMouseDown={()=>toggleBox(6, true)} onMouseUp={()=>toggleBox(6, false)}></div>
        </div>
        <div className="flex flex-col justify-between h-102">
          <div className={`box ${boxActive[7] ? "active": ""}`} onMouseDown={()=>toggleBox(7, true)} onMouseUp={()=>toggleBox(7, false)}></div>
          <div className={`box ${boxActive[8] ? "active": ""}`} onMouseDown={()=>toggleBox(8, true)} onMouseUp={()=>toggleBox(8, false)}></div>
          <div className={`box ${boxActive[9] ? "active": ""}`} onMouseDown={()=>toggleBox(9, true)} onMouseUp={()=>toggleBox(9, false)}></div>
        </div>
      </div>
    </div>


    <div>

      <div>
        <h1>Statistics</h1>
        
        <div>

        </div>
      </div>

      <div>
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
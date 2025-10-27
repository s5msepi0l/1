/*import { useEffect, useRef } from "react";

interface props {
    data: Array<number>;
}

export default function Chart(data: props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const drawRefrence = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        
        for (let i = 0; i < 30; i++) {
            
        ctx.moveTo(12 + (i * 14), 300)
        ctx.lineTo(12 + (i * 14), 0);
        }

        ctx.strokeStyle = "#AAAAAA";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    const drawChart = (data: Array<number>) =>  {
        const dataMin = Math.min(...data);
        const dataMax = Math.max(...data);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        drawRefrence(ctx);
        drawChart(data.data);
    }, [data]);

    return (
    <canvas
        ref={canvasRef}
        height={330}
        width={415}
        className="ml-6 mt-4"
    ></canvas>);
}*/
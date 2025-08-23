import React, { useRef } from 'react';
import { SimulatorParams } from './SimulatorPanel';

const SimulatorView: React.FC<{ params: SimulatorParams; time: number }> = ({ params, time }) => {
    const { width, height, color, showNumber, number, showEquation, equation } = params;
    const canvasRef = useRef<HTMLDivElement>(null);
    // Font size proportional to rectangle size
    const baseFont = Math.min(width, height);
    const numberFontSize = Math.round(baseFont * 0.35); // 35% of min dimension
    const equationFontSize = Math.round(baseFont * 0.22); // 22% of min dimension

    return (
        <div
            ref={canvasRef}
            style={{
                width,
                height,
                backgroundColor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                color: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            <div style={{ textAlign: 'center', width: '100%' }}>
                {showNumber && (
                    <span style={{ display: 'block', fontWeight: 'bold', fontSize: numberFontSize }}>{number}</span>
                )}
                {showEquation && (
                    <span style={{ display: 'block', fontWeight: 'bold', fontSize: equationFontSize, marginTop: showNumber ? '1rem' : 0 }}>{equation}</span>
                )}
            </div>
        </div>
    );
};

export default SimulatorView;

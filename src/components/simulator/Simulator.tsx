

import React, { useState, useRef } from 'react';
import SimulatorView from './SimulatorView';


const allColors = [
    { value: '#0d6efd' },
    { value: '#dc3545' },
    { value: '#28a745' },
    { value: '#ffc107' },
    { value: '#6610f2' },
    { value: '#fd7e14' },
    { value: '#222' },
    { value: '#ff69b4' },
];

function generateEquations(): string[] {
    const eqs: string[] = [];
    for (let a = 0; a <= 10; a++) {
        for (let b = 0; b <= 10; b++) {
            eqs.push(`${a} + ${b}`);
            eqs.push(`${a} - ${b}`);
            eqs.push(`${a} × ${b}`);
            if (b !== 0 && a % b === 0) eqs.push(`${a} ÷ ${b}`);
        }
    }
    return eqs;
}
const equationOptions = generateEquations();

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

const Simulator: React.FC = () => {
    // Settings
    const [duration, setDuration] = useState<number | null>(null); // null = infinite
    const [intervalSec, setIntervalSec] = useState(2);
    const [displayType, setDisplayType] = useState<'number' | 'equation' | 'none'>('number');
    const [isRunning, setIsRunning] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [selectedColors, setSelectedColors] = useState<string[]>(allColors.map(c => c.value));
    const [color, setColor] = useState(allColors[0].value);
    const [maxNumber, setMaxNumber] = useState(10);
    const [number, setNumber] = useState(0);
    const [equation, setEquation] = useState(equationOptions[0]);
    const [time, setTime] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Simulation logic
    const startSimulation = () => {
        setIsRunning(true);
        setTime(0);
        const numberOptions = Array.from({ length: maxNumber + 1 }, (_, i) => i);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setTime(t => {
                const nextTime = t + 1;
                if (duration !== null && nextTime >= duration) {
                    stopSimulation();
                    return t;
                }
                if (nextTime % intervalSec === 0) {
                    setColor(getRandomItem(selectedColors.length ? selectedColors : allColors.map(c => c.value)));
                    setNumber(getRandomItem(numberOptions.length ? numberOptions : [0]));
                    setEquation(getRandomItem(equationOptions));
                }
                return nextTime;
            });
        }, 1000);
    };

    const stopSimulation = () => {
        setIsRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    // Fullscreen logic
    const handleFullscreen = () => setFullscreen(f => !f);

    // Clean up interval on unmount
    React.useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Settings panel
    const settingsPanel = (
        <div className="card mb-4">
            <div className="card-header fw-bold">Ustawienia symulatora</div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Czas symulacji (sekundy, puste = nieskończoność)</label>
                    <input type="number" className="form-control" min={1} value={duration ?? ''} onChange={e => setDuration(e.target.value ? Number(e.target.value) : null)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Czas zmiany koloru/liczby/równania (sekundy)</label>
                    <input type="number" className="form-control" min={1} value={intervalSec} onChange={e => setIntervalSec(Number(e.target.value))} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Co wyświetlić?</label>
                    <select className="form-select" value={displayType} onChange={e => setDisplayType(e.target.value as any)}>
                        <option value="number">Liczba</option>
                        <option value="equation">Równanie</option>
                        <option value="none">Nic</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Wybierz kolory:</label>
                    <div className="d-flex flex-wrap gap-2">
                        {allColors.map(c => (
                            <div key={c.value} className="form-check" style={{ minWidth: 60 }}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedColors.includes(c.value)}
                                    id={`color-${c.value}`}
                                    onChange={e => {
                                        setSelectedColors(prev =>
                                            e.target.checked
                                                ? [...prev, c.value]
                                                : prev.filter(val => val !== c.value)
                                        );
                                    }}
                                />
                                <label className="form-check-label" htmlFor={`color-${c.value}`} style={{ background: c.value, color: '#fff', padding: '0.2em 0.5em', borderRadius: 4 }}>
                                    &nbsp;
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Maksymalna liczba</label>
                    <input type="number" className="form-control" min={0} value={maxNumber} onChange={e => setMaxNumber(Number(e.target.value))} />
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={startSimulation} disabled={isRunning}>Start</button>
                    <button className="btn btn-danger" onClick={stopSimulation} disabled={!isRunning}>Stop</button>
                    <button className="btn btn-primary" onClick={handleFullscreen}>{fullscreen ? 'Wyjdź z pełnego ekranu' : 'Pełny ekran'}</button>
                </div>
            </div>
        </div>
    );

    // Main simulator view
    const simulatorContent = (
        <SimulatorView
            params={{
                width: fullscreen ? window.innerWidth : 300,
                height: fullscreen ? window.innerHeight : 200,
                color,
                showNumber: displayType === 'number',
                number,
                showEquation: displayType === 'equation',
                equation,
            }}
            time={time}
        />
    );

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-md-4">
                    {settingsPanel}
                </div>
                <div className={`col-md-8 d-flex align-items-center justify-content-center${fullscreen ? ' position-fixed top-0 start-0 w-100 h-100 bg-dark' : ''}`} style={fullscreen ? { zIndex: 9999 } : {}}>
                    {simulatorContent}
                    {fullscreen && (
                        <button className="btn btn-light position-absolute top-0 end-0 m-3" onClick={handleFullscreen} style={{zIndex: 10000}}>Zminimalizuj</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Simulator;

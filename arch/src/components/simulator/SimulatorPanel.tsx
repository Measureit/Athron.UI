import React, { useState } from 'react';

interface SimulatorParams {
    width: number;
    height: number;
    color: string;
    showNumber: boolean;
    number: number;
    showEquation: boolean;
    equation: string;
}

const defaultParams: SimulatorParams = {
    width: 300,
    height: 200,
    color: '#0d6efd',
    showNumber: true,
    number: 42,
    showEquation: false,
    equation: '2 + 2 = 4',
};

const SimulatorPanel: React.FC<{ params: SimulatorParams; onChange: (params: SimulatorParams) => void }> = ({ params, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        const checked = (target as HTMLInputElement).checked;
        onChange({
            ...params,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
        });
    };

    return (
        <div className="card mb-4">
            <div className="card-header fw-bold">Ustawienia symulatora</div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Szerokość (px)</label>
                    <input type="number" className="form-control" name="width" value={params.width} onChange={handleChange} min={100} max={1000} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Wysokość (px)</label>
                    <input type="number" className="form-control" name="height" value={params.height} onChange={handleChange} min={100} max={1000} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Kolor</label>
                    <input type="color" className="form-control form-control-color" name="color" value={params.color} onChange={handleChange} />
                </div>
                <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" name="showNumber" checked={params.showNumber} onChange={handleChange} id="showNumber" />
                    <label className="form-check-label" htmlFor="showNumber">Wyświetl liczbę</label>
                </div>
                {params.showNumber && (
                    <div className="mb-3">
                        <label className="form-label">Liczba</label>
                        <input type="number" className="form-control" name="number" value={params.number} onChange={handleChange} />
                    </div>
                )}
                <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" name="showEquation" checked={params.showEquation} onChange={handleChange} id="showEquation" />
                    <label className="form-check-label" htmlFor="showEquation">Wyświetl równanie</label>
                </div>
                {params.showEquation && (
                    <div className="mb-3">
                        <label className="form-label">Równanie</label>
                        <input type="text" className="form-control" name="equation" value={params.equation} onChange={handleChange} />
                    </div>
                )}
            </div>
        </div>
    );
};

export { SimulatorPanel, defaultParams };
export type { SimulatorParams };

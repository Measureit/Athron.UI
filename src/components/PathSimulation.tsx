import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface PathSimulationProps {
    data: Array<{ x: number; y: number }>;
}

const PathSimulation: React.FC<PathSimulationProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            svg.selectAll('*').remove(); // Clear previous drawings

            const width = 800;
            const height = 400;

            svg.attr('width', width).attr('height', height);

            const line = d3.line<{ x: number; y: number }>()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveMonotoneX);

            // Draw the complete path in light gray
            svg.append('path')
                .datum(data)
                .attr('class', 'complete-path')
                .attr('d', line)
                .attr('fill', 'none')
                .attr('stroke', '#e9ecef')
                .attr('stroke-width', 3);

            // Draw the animated path
            const animatedPath = svg.append('path')
                .attr('class', 'animated-path')
                .attr('fill', 'none')
                .attr('stroke', '#0d6efd')
                .attr('stroke-width', 3);

            // Add points
            svg.selectAll('.point')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'point')
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
                .attr('r', 4)
                .attr('fill', '#6c757d')
                .attr('opacity', 0.7);

            // Add start point
            if (data.length > 0) {
                svg.append('circle')
                    .attr('cx', data[0].x)
                    .attr('cy', data[0].y)
                    .attr('r', 8)
                    .attr('fill', '#28a745');

                svg.append('text')
                    .attr('x', data[0].x)
                    .attr('y', data[0].y - 15)
                    .attr('text-anchor', 'middle')
                    .attr('class', 'fw-bold')
                    .text('START');
            }

            // Add end point
            if (data.length > 1) {
                const lastPoint = data[data.length - 1];
                svg.append('circle')
                    .attr('cx', lastPoint.x)
                    .attr('cy', lastPoint.y)
                    .attr('r', 8)
                    .attr('fill', '#dc3545');

                svg.append('text')
                    .attr('x', lastPoint.x)
                    .attr('y', lastPoint.y - 15)
                    .attr('text-anchor', 'middle')
                    .attr('class', 'fw-bold')
                    .text('END');
            }
        }
    }, [data]);

    const animatePath = () => {
        if (!svgRef.current || data.length === 0) return;

        setIsPlaying(true);
        const svg = d3.select(svgRef.current);
        const animatedPath = svg.select('.animated-path');
        const line = d3.line<{ x: number; y: number }>()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveMonotoneX);

        let step = 0;
        const interval = setInterval(() => {
            if (step >= data.length) {
                clearInterval(interval);
                setIsPlaying(false);
                setCurrentStep(0);
                return;
            }

            const currentData = data.slice(0, step + 1);
            animatedPath.attr('d', line(currentData));
            setCurrentStep(step);
            step++;
        }, 200);
    };

    const resetAnimation = () => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.select('.animated-path').attr('d', null);
        setCurrentStep(0);
        setIsPlaying(false);
    };

    return (
        <div className="container-fluid p-4">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="fw-bold text-primary">
                        <i className="bi bi-graph-up-arrow me-3"></i>
                        Path Simulation
                    </h1>
                    <p className="text-muted">Visualize and analyze training paths with interactive D3.js simulations.</p>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow-sm text-center">
                        <div className="card-body">
                            <div className="text-info mb-2">
                                <i className="bi bi-geo-alt" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <h4 className="fw-bold">{data.length}</h4>
                            <p className="text-muted mb-0">Path Points</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow-sm text-center">
                        <div className="card-body">
                            <div className="text-success mb-2">
                                <i className="bi bi-speedometer2" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <h4 className="fw-bold">{currentStep}</h4>
                            <p className="text-muted mb-0">Current Step</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow-sm text-center">
                        <div className="card-body">
                            <div className="text-warning mb-2">
                                <i className="bi bi-clock" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <h4 className="fw-bold">{Math.round(data.length * 0.2)}s</h4>
                            <p className="text-muted mb-0">Simulation Time</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow-sm text-center">
                        <div className="card-body">
                            <div className="text-primary mb-2">
                                <i className="bi bi-arrow-right" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <h4 className="fw-bold">{Math.round((currentStep / data.length) * 100 || 0)}%</h4>
                            <p className="text-muted mb-0">Progress</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-transparent">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold mb-0">
                                    <i className="bi bi-graph-up me-2"></i>
                                    Training Path Visualization
                                </h5>
                                <div>
                                    <button 
                                        className="btn btn-success me-2"
                                        onClick={animatePath}
                                        disabled={isPlaying}
                                    >
                                        <i className="bi bi-play-fill me-2"></i>
                                        {isPlaying ? 'Playing...' : 'Play Animation'}
                                    </button>
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={resetAnimation}
                                        disabled={isPlaying}
                                    >
                                        <i className="bi bi-arrow-clockwise me-2"></i>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                <svg ref={svgRef} className="border rounded bg-light"></svg>
                            </div>
                            <div className="mt-3">
                                <div className="progress" style={{ height: '6px' }}>
                                    <div 
                                        className="progress-bar" 
                                        role="progressbar" 
                                        style={{ width: `${(currentStep / data.length) * 100 || 0}%` }}
                                    ></div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <small className="text-muted">Step {currentStep} of {data.length}</small>
                                    <small className="text-muted">{Math.round((currentStep / data.length) * 100 || 0)}% Complete</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-transparent">
                            <h5 className="fw-bold mb-0">Path Statistics</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="text-center p-3">
                                        <div className="text-primary">
                                            <i className="bi bi-arrow-up-right" style={{ fontSize: '1.5rem' }}></i>
                                        </div>
                                        <div className="fw-bold">45.2m</div>
                                        <small className="text-muted">Distance</small>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-center p-3">
                                        <div className="text-success">
                                            <i className="bi bi-speedometer" style={{ fontSize: '1.5rem' }}></i>
                                        </div>
                                        <div className="fw-bold">12.5 m/s</div>
                                        <small className="text-muted">Avg Speed</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-transparent">
                            <h5 className="fw-bold mb-0">Simulation Controls</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <button className="btn btn-outline-primary">
                                    <i className="bi bi-arrow-repeat me-2"></i>
                                    Generate New Path
                                </button>
                                <button className="btn btn-outline-success">
                                    <i className="bi bi-download me-2"></i>
                                    Export Data
                                </button>
                                <button className="btn btn-outline-info">
                                    <i className="bi bi-share me-2"></i>
                                    Share Simulation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PathSimulation;
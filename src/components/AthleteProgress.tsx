import React from 'react';
import { useSelector } from 'react-redux';
import { selectAthleteProgress, selectCurrentAthlete } from '../redux/athleteSlice';
import { RootState } from '../redux/store';
import * as d3 from 'd3';

interface ProgressData {
    date: string;
    progress: number;
}

const AthleteProgress: React.FC<{ athleteId: string }> = ({ athleteId }) => {
    const progressValues = useSelector((state: RootState) => selectAthleteProgress(state, athleteId));
    const currentAthlete = useSelector((state: RootState) => selectCurrentAthlete(state));
    
    // Convert progress array to chart data
    const progressData: ProgressData[] = progressValues.map((value, index) => ({
        date: `Day ${index + 1}`,
        progress: value
    }));

    React.useEffect(() => {
        if (progressData.length === 0) return;

        const svg = d3.select('#progress-chart');
        svg.selectAll('*').remove(); // Clear previous content

        // Set dimensions and margins for the chart
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .domain(progressData.map((d: ProgressData) => d.date))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(progressData, (d: ProgressData) => d.progress) || 0])
            .nice()
            .range([height, 0]);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y));

        g.selectAll('.bar')
            .data(progressData)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', (d: ProgressData) => x(d.date)!)
            .attr('y', (d: ProgressData) => y(d.progress))
            .attr('width', x.bandwidth())
            .attr('height', (d: ProgressData) => height - y(d.progress))
            .attr('fill', '#0d6efd');
    }, [progressData]);

    return (
        <div className="container-fluid p-4">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="fw-bold text-primary">
                        <i className="bi bi-person-circle me-3"></i>
                        Athlete Progress
                    </h1>
                    {currentAthlete && (
                        <p className="text-muted">Performance tracking for {currentAthlete.name}</p>
                    )}
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow-sm text-center">
                        <div className="card-body">
                            <div className="text-success mb-2">
                                <i className="bi bi-trophy" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <h4 className="fw-bold">92%</h4>
                            <p className="text-muted mb-0">Current Performance</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow-sm text-center">
                        <div className="card-body">
                            <div className="text-info mb-2">
                                <i className="bi bi-calendar-check" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <h4 className="fw-bold">15</h4>
                            <p className="text-muted mb-0">Sessions This Month</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow-sm text-center">
                        <div className="card-body">
                            <div className="text-warning mb-2">
                                <i className="bi bi-graph-up" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <h4 className="fw-bold">+8%</h4>
                            <p className="text-muted mb-0">Improvement</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow-sm text-center">
                        <div className="card-body">
                            <div className="text-primary mb-2">
                                <i className="bi bi-clock" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <h4 className="fw-bold">45h</h4>
                            <p className="text-muted mb-0">Total Training Time</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-transparent">
                            <h5 className="fw-bold mb-0">
                                <i className="bi bi-graph-up me-2"></i>
                                Performance Chart
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                <svg id="progress-chart" width={600} height={400} className="border rounded"></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AthleteProgress;
import React from 'react';
import PathSimulation from '../components/PathSimulation';
import { generateRandomPath } from '../d3/pathUtils';

const SimulationRoute: React.FC = () => {
    // Generate some sample data for the simulation
    const sampleData = generateRandomPath(10, 800, 400);

    return (
        <div>
            <h1>Path Simulation</h1>
            <PathSimulation data={sampleData} />
        </div>
    );
};

export default SimulationRoute;
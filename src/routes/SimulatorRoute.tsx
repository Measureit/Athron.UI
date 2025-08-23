import React from 'react';
import Simulator from '../components/Simulator';
import { generateRandomPath } from '../d3/pathUtils';

const SimulatorRoute: React.FC = () => {
    // Generate some sample data for the simulation
    const sampleData = generateRandomPath(10, 800, 400);

    return (
        <div>
            <h1>Simulator</h1>
            <Simulator data={sampleData} />
        </div>
    );
};

export default SimulatorRoute;
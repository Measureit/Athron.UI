import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AthleteProgress from '../components/AthleteProgress';

const AthleteRoute: React.FC<{ path: string }> = ({ path }) => {
    const athlete = useSelector((state: RootState) => state.athlete.currentAthlete);

    return (
        <Route path={path}>
            {athlete ? <AthleteProgress athleteId={athlete.id} /> : <Redirect to="/" />}
        </Route>
    );
};

export default AthleteRoute;
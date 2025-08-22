import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GroupSession from '../components/GroupSession';

const GroupRoute: React.FC = () => {
    return (
        <Switch>
            <Route path="/group-session" component={GroupSession} />
        </Switch>
    );
};

export default GroupRoute;
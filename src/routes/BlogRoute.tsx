import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Blog from '../components/Blog';

const BlogRoute: React.FC<{ path: string }> = ({ path }) => {
    const athlete = useSelector((state: RootState) => state.athlete.currentAthlete);

    return (
        <Route path={path}>
            <Blog />
        </Route>
    );
};

export default BlogRoute;
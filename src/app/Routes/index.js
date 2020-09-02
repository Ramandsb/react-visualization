import React from 'react';
import Loadable from 'react-loadable';
import DefaultLayout from '../Components/DefaultLayout';

function Loading() {
    return <div>Loading...</div>;
}

const CovidTracker = Loadable({
    loader: () => import('../Components/CovidTracker'),
    loading: Loading,
});
const Test2 = Loadable({
    loader: () => import('../Components/Test2'),
    loading: Loading,
});
const Test3 = Loadable({
    loader: () => import('../Components/Test3'),
    loading: Loading,
});
const Test4 = Loadable({
    loader: () => import('../Components/TestComponent'),
    loading: Loading,
});

const routes = [
    { path: '/', exact: true, name: 'Home', component: DefaultLayout },
    { path: '/covid-tracker', exact: true, name: 'covid-tracker', component: CovidTracker },
    { path: '/Test2', exact: true, name: 'Test2', component: Test2 },
    { path: '/Test3', exact: true, name: 'Test3', component: Test3 },
    { path: '/Test4', exact: true, name: 'Test4', component: Test4 },
];

export default routes;
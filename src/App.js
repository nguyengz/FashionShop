import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/layouts/DefaultLayout';
import OnlyLayout from './components/layouts/OnlyLayout';
import * as routes from '~/routes';

function App() {
    return (
        <div className="App">
            <Routes>
                {routes.publicRoutes.map((route, index) => {
                    const Layout = route.layout? OnlyLayout : DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            path={route.path}
                            key={index}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;

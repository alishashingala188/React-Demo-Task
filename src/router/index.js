import React from 'react';
import { Route, Routes } from 'react-router-dom';
import appRoutes from './AppRouter';

function AppRouter() {
  return (
    <Routes>
      {appRoutes.map(({ component: Component, url }) => {
        return <Route exact key={url} path={url} element={<Component />} />;
      })}
    </Routes>
  );
}

export default AppRouter;
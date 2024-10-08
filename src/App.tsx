import React, { Suspense } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { TypeMenu } from 'types/TypeMenu';
import menu from 'json/menu.json';

const loadPages = (path: string): React.ComponentType => React.lazy(() => import(`./pages${path}`));

const flattenMenu = (menus: TypeMenu[]): TypeMenu[] => {
  const flatMenu: TypeMenu[] = [];

  const flatten = (menu: TypeMenu[]) => {
    menu.forEach(item => {
      flatMenu.push(item);
      if (item.subNav && item.subNav.length > 0) {
        flatten(item.subNav);
      }
    });
  };

  flatten(menus);
  return flatMenu;
};


function App() {
  localStorage.setItem('menu', JSON.stringify(menu));
  const menuData: TypeMenu[] = flattenMenu([...menu]);
  menuData.forEach((menu, idx) => {
    loadPages(`${menu.pathname || ''}`)
  });
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', /* 화면 전체 높이 */
          }}>
          <div>Loading...</div>
        </div>
      }>
        <Routes>
          <Route
            key='1000'
            path='/'
            Component={loadPages('/Main')}
          />
          <Route
            key='1001'
            path='/Login'
            Component={loadPages('/Login')}
          />
          {
            menuData.map((menu, idx) => {
              return (
                <Route
                  key={idx}
                  path={`/${menu.pathname || ''}`}
                  Component={loadPages(`${menu.pathname || ''}`)}
                />)
              }
            )
          }
        </Routes>
        {/* <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/showcase/P01' element={<P01 />} />
          <Route path='/example/P01_1' element={<P01_1 />} />
          <Route path='/example/P01_2' element={<P01_2 />} />
          <Route path='/example/P01_3' element={<P01_3 />} />
          <Route path='/example/EX01' element={<EX01 />} />
          <Route path='/example/EX02' element={<EX02 />} />
          <Route path='/example/EX03' element={<EX03 />} />
        </Routes> */}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

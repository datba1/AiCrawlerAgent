import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Research from './pages/Research';
import Search from './pages/Search';
import Scrape from './pages/Scrape';

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Research':
        return <Research />;
      case 'Search':
        return <Search />;
      case 'Scrape':
        return <Scrape />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeItem={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default App;

import React from 'react';
import logo from 'images/star-wars-logo.png';
import { Link } from 'react-router-dom';
import { OpeningCrawl } from 'components/OpeningCrawl';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => (
  <div className="layout">
    <header className="layout__header">
      <Link className="layout__logo-link" to="/">
        <img src={logo} alt="Star Wars Logo" className="layout__logo" />
      </Link>
    </header>
    <div className="layout__content">
      <aside className="layout__sidebar">
        <OpeningCrawl />
      </aside>
      <main className="layout__main">{children}</main>
    </div>
    <footer className="layout__footer">
      “Rebellions are built on hope.” - Jyn, Rogue One
    </footer>
  </div>
);

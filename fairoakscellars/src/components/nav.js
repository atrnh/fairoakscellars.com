import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import './nav.module.css';

const NavLink = ({ page }) => (
  <li>
    <Link
      to={page.frontmatter.path}
    >
      {page.frontmatter.title}
    </Link>
  </li>
);

const Nav = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  const navLinks = data.allMarkdownRemark.edges.map(edge => (
    <NavLink key={edge.node.id} page={edge.node} />
  ));

  return (
    <nav
    >
      <ul
      >
        {navLinks}
      </ul>
    </nav>
  );
};

export { Nav };

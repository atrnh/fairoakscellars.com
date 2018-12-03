import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

function slugify(text) {
  return text.toLowerCase().replace(' ', '-');
}

function Sidebar({ headings, current }) {
  const allHeadings = headings.map(head => {
    const slug = slugify(head.value);
    const classes = slug === current ? 'current' : '';
    return (
      <div key={slug} className={classes}>
        <a href={slug}>{head.value}</a>
      </div>
    );
  });
  return (
    <aside>
      {allHeadings}
    </aside>
  );
}

export default class Template extends React.Component {
  constructor({ data }) {
    super();
    const { markdownRemark } = data;
    const { headings, frontmatter, html } = markdownRemark;

    this.path = frontmatter.path;
    this.headings = headings;
    this.html = html;
    this.state = {
      currSection: slugify(headings[0].value)
    };
  }

  render() {
    const { currSection } = this.state;
    return (
      <Layout>
        <div>
          <Sidebar headings={this.headings} current={currSection}/>
          <div dangerouslySetInnerHTML={{ __html: this.html }}>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      headings {
        depth
        value
      }
      frontmatter {
        order
        path
        title
      }
    }
  }
`;

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.title}>
          {siteConfig.title}
        </Heading>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <div className={styles.badges}>
          <a href="https://www.npmjs.com/package/react-dialogues">
            <img
              src="https://img.shields.io/npm/v/react-dialogues.svg"
              alt="npm version"
            />
          </a>
          <a href="https://bundlephobia.com/result?p=react-dialogues">
            <img
              src="https://img.shields.io/bundlephobia/minzip/react-dialogues.svg?color=rgb(68,204,17)"
              alt="bundle size"
            />
          </a>
        </div>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/get-started">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://github.com/megahertz/react-dialogues"
          >
            GitHub
          </Link>
        </div>
        <div className={styles.install}>
          <code>npm install react-dialogues</code>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout description="Tiny interaction React UI library for modals, toasts, and popovers">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

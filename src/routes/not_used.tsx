import { Helmet } from 'react-helmet';
import Counter from '~/components/Counter';

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Hello World</title>
      </Helmet>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank" rel="noopener noreferrer">
          start.solidjs.com
        </a>{" "}
        to learn how to build React apps.
      </p>
    </main>
  );
};

export default Home;

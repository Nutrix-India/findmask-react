import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { wrapper } from '../store';

const theme = {
  colors: {
    primary: '#0070f3'
  }
};

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </ThemeProvider>
  );
};

App.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired
};

export default wrapper.withRedux(App);

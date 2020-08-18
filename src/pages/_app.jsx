import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { ContextProvider as MobileContextProvider } from '@contexts/MobileContext';
import { wrapper } from '../store';

const theme = {
  colors: {
    primary: '#0070f3'
  }
};

const App = ({ Component, pageProps, isServer, userAgent }) => {
  return (
    <ThemeProvider theme={theme}>
      <MobileContextProvider isServer={isServer} userAgent={userAgent}>
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
      </MobileContextProvider>
    </ThemeProvider>
  );
};

App.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
  isServer: PropTypes.bool.isRequired,
  userAgent: PropTypes.string.isRequired
};

App.getInitialProps = async ({ Component, ctx }) => {
  const isServer = !!ctx.req;
  return {
    pageProps: Component.getInitialProps
      ? await Component.getInitialProps({ ...ctx, isServer })
      : {},
    isServer,
    userAgent: isServer ? ctx.req.headers['user-agent'] : ''
  };
};

export default wrapper.withRedux(App);

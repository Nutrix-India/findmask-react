import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
};

export const logPageView = ({ page }) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

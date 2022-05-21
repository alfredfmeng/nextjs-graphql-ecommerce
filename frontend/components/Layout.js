import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <div>
      <h2>Hello from Layout.js!</h2>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

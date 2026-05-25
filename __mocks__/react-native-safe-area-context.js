const React = require('react');

const SafeAreaView = React.forwardRef(({ children, ...props }, ref) =>
  React.createElement('div', { ...props, ref }, children)
);
SafeAreaView.displayName = 'SafeAreaView';

const SafeAreaProvider = ({ children }) => children;
SafeAreaProvider.displayName = 'SafeAreaProvider';

module.exports = {
  SafeAreaView,
  SafeAreaProvider,
};

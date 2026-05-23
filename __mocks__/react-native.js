const React = require('react');

const View = React.forwardRef(({ children, ...props }, ref) =>
  React.createElement('div', { ...props, ref }, children)
);
View.displayName = 'View';

const Text = React.forwardRef(({ children, ...props }, ref) =>
  React.createElement('span', { ...props, ref }, children)
);
Text.displayName = 'Text';

const TouchableOpacity = React.forwardRef(
  ({ children, onPress, ...props }, ref) =>
    React.createElement('button', { ...props, ref, onClick: onPress }, children)
);
TouchableOpacity.displayName = 'TouchableOpacity';

const Modal = ({ children, visible, ...props }) =>
  visible ? React.createElement('div', props, children) : null;
Modal.displayName = 'Modal';

const SafeAreaView = React.forwardRef(({ children, ...props }, ref) =>
  React.createElement('div', { ...props, ref }, children)
);
SafeAreaView.displayName = 'SafeAreaView';

module.exports = {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StyleSheet: {
    create: (styles) => styles,
    hairlineWidth: 1,
  },
  Platform: {
    OS: 'ios',
    select: (obj) => obj.ios || obj.default,
  },
};

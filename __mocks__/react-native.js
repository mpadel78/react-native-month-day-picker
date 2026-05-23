const React = require('react');

const createHostComponent = (tag, displayName) => {
  const Component = React.forwardRef(({ children, ...props }, ref) =>
    React.createElement(tag, { ...props, ref }, children)
  );
  Component.displayName = displayName;
  return Component;
};

const createPressableHostComponent = (displayName) => {
  const Component = React.forwardRef(({ children, onPress, ...props }, ref) =>
    React.createElement('button', { ...props, onPress, ref }, children)
  );
  Component.displayName = displayName;
  return Component;
};

const View = createHostComponent('div', 'View');
const Text = createHostComponent('span', 'Text');
const TextInput = createHostComponent('input', 'TextInput');
const Image = createHostComponent('img', 'Image');
const Switch = createHostComponent('switch', 'Switch');
const ScrollView = createHostComponent('scrollview', 'ScrollView');
const TouchableOpacity = createPressableHostComponent('TouchableOpacity');
const SafeAreaView = createHostComponent('div', 'SafeAreaView');

const Modal = ({ children, visible = true, ...props }) =>
  React.createElement(
    'modal',
    { ...props, visible },
    visible ? children : null
  );
Modal.displayName = 'Modal';

const Button = React.forwardRef(({ title, onPress, ...props }, ref) =>
  React.createElement('button', { ...props, onPress, ref }, title)
);
Button.displayName = 'Button';

module.exports = {
  View,
  Text,
  TextInput,
  Image,
  Switch,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Button,
  StyleSheet: {
    create: (styles) => styles,
    flatten: (style) => {
      if (Array.isArray(style)) {
        return style.reduce(
          (acc, item) => Object.assign(acc, item || {}),
          {}
        );
      }

      return style || {};
    },
    hairlineWidth: 1,
  },
  Platform: {
    OS: 'ios',
    select: (obj) => obj.ios || obj.default,
  },
};

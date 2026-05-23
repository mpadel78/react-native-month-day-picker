const React = require('react');

const WheelPicker = React.forwardRef(
  ({ value, data, onValueChanged, testID, ...props }, ref) => {
    return React.createElement(
      'div',
      { ...props, testID, ref },
      React.createElement('span', { testID: `${testID}-value` }, String(value)),
      data.map((item) =>
        React.createElement(
          'button',
          {
            key: item.value,
            testID: `${testID}-item-${item.value}`,
            onPress: () => onValueChanged && onValueChanged({ item }),
          },
          item.label
        )
      )
    );
  }
);

WheelPicker.displayName = 'WheelPicker';

module.exports = {
  __esModule: true,
  default: WheelPicker,
  WheelPicker,
};

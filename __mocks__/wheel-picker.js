const React = require('react');

const WheelPicker = React.forwardRef(
  ({ value, data, onValueChanged, testID, ...props }, ref) => {
    return React.createElement(
      'div',
      { 'data-testid': testID, ref },
      React.createElement(
        'span',
        { 'data-testid': `${testID}-value` },
        String(value)
      ),
      data.map((item) =>
        React.createElement(
          'button',
          {
            key: item.value,
            'data-testid': `${testID}-item-${item.value}`,
            onClick: () => onValueChanged && onValueChanged({ item }),
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

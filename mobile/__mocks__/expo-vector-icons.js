const React = require('react');
const { Text } = require('react-native');

const Icon = (props) => React.createElement(Text, props, props.name);

module.exports = {
  Ionicons: Icon,
  AntDesign: Icon,
  MaterialIcons: Icon,
  FontAwesome: Icon,
};

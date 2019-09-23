import React from 'react';
import { Animated, Dimensions } from 'react-native';

class EnlargeShrink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementWidth: new Animated.Value(0),
      elementHeight: new Animated.Value(0),
    };
  };

  componentDidUpdate() {
    Animated.spring(
      this.state.elementWidth,
      { toValue: this.props.imageWidth },
    ).start();
    Animated.spring(
      this.state.elementHeight,
      { toValue: this.props.imageHeight },
    ).start();
  };

  render() {
    return (
      <Animated.Image
        style={[
          this.props.style,
          {
            height: this.state.elementHeight,
            width: this.state.elementWidth,
          },
        ]}
        source={ this.props.source }
      />
    );
  };

};

export default EnlargeShrink;
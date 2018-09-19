import React, { Component } from 'react';
import { 
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
//const SCREEN_HEIGHT = Dimensions.get('window').height;


class Deck extends Component {

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => { 
       //Get gesture
       position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => { 
        //Reset position
        Animated.spring(this.state.position, { toValue: { x: 0, y: 0 } }).start();
      }
    });

    this.state = { panResponder, position };
  }

  getAnimatedStyle() {
    const { position } = this.state;

    const rotate = position.x.interpolate({
        inputRange: [-(SCREEN_WIDTH / 2), 0, (SCREEN_WIDTH / 2)],
        outputRange: ['-50deg', '0deg', '50deg']
    });

    return ({
      ...position.getLayout(),
      transform: [{ rotate }]
    });
  }

  renderCards() {
    return this.props.data.map((item, i) => {
      if (i === 0) {
        return (
          <Animated.View 
          key={item.id} 
          style={this.getAnimatedStyle()}
          {...this.state.panResponder.panHandlers}
          >
           {this.props.renderCard(item)}
          </Animated.View> 
        );
      }

      return (
        <View key={item.id} >
         {this.props.renderCard(item)}
        </View> 
      );
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;

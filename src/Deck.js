import React, { Component } from 'react';
import { 
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = (SCREEN_WIDTH / 3);
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {

  //If doesn't exist define default props
  static defaultProps = {
    onSwipeRight: (item) => { console.log(item); },
    onSwipeLeft: (item) => { console.log(item); },
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => { 
       //Get gesture
       position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => { 
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.ForeSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.ForeSwipe('left');
        } else {
          //Reset position
          Animated.spring(this.position, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });

    this.state = { panResponder, index: 0 };
    this.position = position;
  }

  getAnimatedStyle() {
    const { position } = this;

    const rotate = position.x.interpolate({
        inputRange: [-(SCREEN_WIDTH / 2), 0, (SCREEN_WIDTH / 2)],
        outputRange: ['-50deg', '0deg', '50deg']
    });

    return ({
      ...position.getLayout(),
      transform: [{ rotate }]
    });
  }

  ForeSwipe(direction) {
      const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

      Animated.timing(this.position, { 
        toValue: { x, y: 0 },
        timing: SWIPE_OUT_DURATION
      }).start(() => this.OnSwipeComplete(direction));
  }

  OnSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    if (direction === 'right') {
      onSwipeRight(item);
    } else {
      onSwipeLeft(item);
    }

    this.position.setValue({ x: 0, Y: 0 });
    this.setState({ index: this.state.index + 1 }); 
  }

  renderCards() {
    return this.props.data.map((item, i) => {
      const { index } = this.state;

      if (i < index) return null;

      if (i === this.state.index) {
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

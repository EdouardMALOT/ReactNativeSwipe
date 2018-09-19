import React, { Component } from 'react';
import { 
  View,
  Animated,
  PanResponder
} from 'react-native';

class Deck extends Component {

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => { 
       position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => { console.log(gesture); }
    });

    this.state = { panResponder, position };
  }

  renderCards() {
    return this.props.data.map((item, i) => {
      if (i === 0) {
        return (
          <Animated.View 
          key={item.id} 
          style={this.state.position.getLayout()}
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

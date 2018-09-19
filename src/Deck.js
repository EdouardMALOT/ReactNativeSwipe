import React, { Component } from 'react';
import { 
  View, 
  PanResponder
} from 'react-native';

class Deck extends Component {

  constructor(props) {
    super(props);
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => { 
        console.log(gesture); 
      },
      onPanResponderRelease: (event, gesture) => { console.log(gesture); }
    });

    this.state = { panResponder };
  }

  renderCards() {
    return this.props.data.map(item => {
      return (
        <View key={item.id} {...this.state.panResponder.panHandlers}>
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

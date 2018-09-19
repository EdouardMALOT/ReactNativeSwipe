import React, { Component } from 'react';
import { View } from 'react-native';

class Deck extends Component {

  renderCards() {
    return this.props.data.map(item => {
      return (
        <View key={item.id}>
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
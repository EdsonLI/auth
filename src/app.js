import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };  

  onButtonPress() {
    firebase.auth().signOut()
      .then(function() {
        console.log('Sign-out successful!');
      })
      .catch(function(error) {
        console.log('Sign-out error:'+error);
      });
  }

  componentWillMount() {
    firebase.initializeApp({
      /* copy and paste the project Authentication snippet from Firebase */
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:      
        return (
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Log Out
            </Button>
          </CardSection>
        );

      case false:
        return <LoginForm />;

      default:
        //return <Spinner size="large" />;
        return <LoginForm />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
};

export default App;

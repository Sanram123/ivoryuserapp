import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
// import * as SecureStore from 'expo-secure-store';
import  AsyncStorage  from '@react-native-community/async-storage';

class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {
            user_id: 1,
            user_image: 'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
            user_name: "Ahmet Çağlar Durmuş",
            stories: [
                {
                    story_id: 1,
                    story_image: "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
                    swipeText:'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image: "https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg",
                }]
        },
        {
            user_id: 2,
            user_image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
            user_name: "Test User",
            stories: [
                {
                    story_id: 1,
                    story_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU",
                    swipeText:'Custom swipe text for this story',
                    onPress: () => console.log('story 1 swiped'),
                },
                {
                    story_id: 2,
                    story_image: "https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg",
                    swipeText:'Custom swipe text for this story',
                    onPress: () => console.log('story 2 swiped'),
                }]
        }]
    }
  }

  onSignout = async () => {
    console.log("clicked sign out")
    try{
      await AsyncStorage.removeItem('auth_token')
      
      .then(() => {
        this.props.navigation.navigate('Login');
      })
    }catch(e){

    }
    
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={this.onSignout}>
          <Text>Sign out!</Text>
        </TouchableOpacity>
        {/* <InstaStory data={this.state.data}
            duration={10}
            onStart={item => console.log(item)}
            onClose={item => console.log('close: ', item)}
            customSwipeUpComponent={<View>
                                <Text>Swipe</Text>
                            </View>}
            style={{marginTop: 30}}/> */}
      </View>
    );
  }

}

export default More;


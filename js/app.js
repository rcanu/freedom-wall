'use strict'

angular.module('freedom-wall', ['ngRoute', 'firebase'])
  .controller('PostsController', ['$scope','$firebaseArray','$firebaseAuth', 
    ($scope, $firebaseArray, $firebaseAuth) => {
    
  //instance for the Firebase api  
  const ref = new Firebase("https://freedomwall-app.firebaseio.com/messages")

  // create a synchronized array
  $scope.messages = $firebaseArray(ref)
  $scope.authObj = $firebaseAuth(ref)

  //Guest post info
  $scope.accountId     = "Ninja"
  $scope.accountAvatar = "http://memesvault.com/wp-content/uploads/Disappointed-Meme-Face-08.png"

  //onAuth block
  $scope.authObj.$onAuth((authData) => {
    if (authData) {

      //store the auth data
      $scope.accountId     = authData.twitter.username
      $scope.accountAvatar = authData.twitter.profileImageURL
      
      //check the return values of onAuth object
      console.log('image ' + $scope.accountAvatar)
      console.log(authData);
      
      console.log("Logged in as:", authData.uid)
    } else {
      console.log("Logged out")
    }
  });

  // add new items to the array : the message is automatically added to our Firebase database!
  $scope.post = () => {
    //push messages into the firebase api
    $scope.messages.$add({
      pic : $scope.accountAvatar,
      text: $scope.accountId + ": " + $scope.message,
      date: new Date().toString()
    })
    $scope.message = ''
  }

  //delete post from the firebase api
  $scope.delete = (index) => {

      $scope.messages.$remove(index).then(() => {
      
      console.log('Item deleted')
    }).catch(function(){
      console.log('Error deleting')
    })
  }

  //login auth api for twitter
  $scope.loginPopup = () => {

    //auth api promise for login via twitter
    $scope.authObj.$authWithOAuthPopup("twitter").then(function(authData) {
    
    //check the user auth data from the twitter api
    console.log("Logged in as:", authData.uid)
    console.log(authData)

    $scope.accountAvatar = authData.twitter.profileImageURL
    $scope.accountId     = authData.twitter.username
    
      console.log('pic' + $scope.accountAvatar)
    }).catch(function(error) {
      console.error("Authentication failed:", error)
    })
  }
}])

// Ionic App

angular.module('holomua.controllers', []);
angular.module('holomua.services', []);

angular.module('holomua', [
  'ionic',
  'ngCordova',
  'holomua.controllers',
  'holomua.services',
  'holomua.common.constants'
])

.run(function($ionicPlatform, $state, $rootScope, $ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.overlaysWebView(true);
      StatusBar.backgroundColorByHexString("#8B7C92");
      //StatusBar.styleDefault();
    }
  });

  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($state.current.name === "home" && $rootScope.searching == true) {
      $rootScope.$broadcast('back-on-searching');
    } else if ($ionicHistory.backView() !== null) {
      $ionicHistory.goBack();
    } else {
      ionic.Platform.exitApp();
    }
  }, 101);

})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(false);
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive

  .state('home', {
    url: '/home',
    templateUrl: 'templates/places.html',
    controller: 'PlacesCtrl'
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});

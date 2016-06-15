angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

angular.module('holomua.controllers', []);
angular.module('holomua.services', []);

angular.module('holomua', [
  'ionic',
  'ngCordova',
  'holomua.controllers',
  'holomua.services',
  'holomua.common.constants',
  'underscore'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.StatusBar) {

      StatusBar.styleBlackTranslucent();
      StatusBar.backgroundColorByHexString("#ff0066");
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(false);
})

.config(function($stateProvider, $urlRouterProvider) {

  $ionicConfigProvider.tabs.position('top');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.places', {
    url: '/places',
    views: {
      'tab-places': {
        templateUrl: 'templates/places.html',
        controller: 'PlacesCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/places');

});

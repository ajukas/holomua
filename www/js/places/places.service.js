angular.module('holomua.services')

  .service('PlacesService', function ($q, $http, $cordovaGeolocation, PlacesConstants, HttpConstants) {

    var _currLocation = {
      lat: 0,
      long: 0
    };
    var _currCity = null;
    var self = this;

    self.getCurrentPosition = function () {
      var deferred = $q.defer();
      //Disable high accurary to avoid plugin errors
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        _currLocation.lat  = position.coords.latitude;
        _currLocation.long = position.coords.longitude;
        deferred.resolve(_currLocation);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    self.getCurrentCity = function() {
      var deferred = $q.defer();
      self.getCurrentPosition().then(function(position){
        //Setting Location to Santa Fé do Sul
        position.lat = '-20.2150505';
        position.long = '-50.9242912';
        $http.get(HttpConstants.LOCATION_API+'/geocode/json?latlng='+position.lat+','+position.long+'&result_type=administrative_area_level_2&key='+HttpConstants.GOOGLE_API_KEY)
          .then(function(success){
            console.log(success.data);
            _currCity = success.data.results[0].formatted_address;
            deferred.resolve(_currCity);
          }, function(err){
            deferred.reject(err);
          });
      }, function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    };

    self.getNearbyPlaces = function() {
      var deferred = $q.defer();
      if (_currLocation.lat !== 0 && _currLocation.long !== 0){
        $http.get(HttpConstants.LOCATION_API+'/place/nearbysearch/json?location='+_currLocation.lat+','+_currLocation.long+'&radius='+PlacesConstants.SEARCH_RADIUS+'&key='+HttpConstants.GOOGLE_API_KEY)
          .then(function(success){
            console.log(success);
            deferred.resolve(success.data.results);
          }, function(err){
            deferred.reject(err);
          });
      } else {
        deferred.reject('missing_location');
      }
      return deferred.promise;
    };
  });

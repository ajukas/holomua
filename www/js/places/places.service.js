angular.module('holomua.services')

  .service('PlacesService', function ($q, $http, $cordovaGeolocation, HttpConstants) {

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
        // position.lat = '-20.208284';
        // position.long = '-50.9301757';
        $http.get(HttpConstants.LOCATION_API+'?latlng='+position.lat+','+position.long+'&result_type=administrative_area_level_2&key='+HttpConstants.GOOGLE_API_KEY)
          .then(function(success){
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
  });

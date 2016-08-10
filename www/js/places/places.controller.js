angular.module('holomua.controllers')
.controller('PlacesCtrl', function ($scope, $state, PlacesService, $interval,
  $ionicLoading, $rootScope) {

    $scope.banners = [
      {
        src: 'img/slides/slide1.jpeg'
      },
      {
        src: 'img/slides/slide2.jpeg'
      },
      {
        src: 'img/slides/slide3.jpeg'
      }
    ];

  $scope.searchHint = "Encontre lugares: pizzaria imobiliária";

  $scope.options = {
    loop: true,
    autoplay: 5000,
    effect: 'slide',
    continue: true,
    speed: 700,
    autoplayDisableOnInteraction: false
  }

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    //console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    //console.log('Slide change ended');
    /*$scope.activeIndex = data.activeIndex;
    $scope.previousIndex = data.previousIndex;*/
  });

  $scope.currentCity = '';

  $rootScope.searching = false;

  $scope.init = function(){

    PlacesService.getCurrentCity().then(function(city){
      $scope.currentCity = city;
      PlacesService.getNearbyPlaces();
    }, function(err){
      console.log(err);
    });
  };

  $scope.stopSearch = function() {
    $rootScope.searching = false;
    $scope.searchHint = "Encontre lugares: pizzaria imobiliária";
    $scope.keys = "";
    $scope.results = [];
  }

  $scope.setSearching = function(isSearching) {
    if(isSearching) {
      $rootScope.searching = true;
      $scope.searchHint = "Digite a busca";
    } else {
      $scope.stopSearch();
    }
  }

  $scope.$on('back-on-searching', function(event, args) {
    $scope.$apply(function () {
      $scope.stopSearch();
    });
  });

  //search bar code
  var stop;
  $scope.$watch('keys', function (newValue, oldValue) {
    $scope.stopInterval();
    if (newValue && newValue.length > 2) {
      stop = $interval(function () {
        $ionicLoading.show({
          template: '<h4 class="spinner-holomua">' +
          'Aguarde...' +
          '</h4>' +
          '<ion-spinner icon="circles"></ion-spinner>'
        });
        $scope.getResults();
      }, 800);
    }
  });

  $scope.stopInterval = function () {
    if (angular.isDefined(stop)) {
      $interval.cancel(stop);
      stop = undefined;
    }
  };

  $scope.getResults = function() {
    $interval(function () {
      $scope.results = [
        {"name": "Resultado 1"},
        {"name": "Resultado 2"},
        {"name": "Resultado 3"},
        {"name": "Resultado 4"},
        {"name": "Resultado 5 com nome grande da porra que só ele"},
      ];
      $ionicLoading.hide();
      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.stopInterval();
      console.log("done");
    }, 1000, 1);

  }
});

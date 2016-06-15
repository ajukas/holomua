angular.module('holomua.common.constants', [])

  .constant("HttpConstants", {
    LOCATION_API: "https://maps.googleapis.com/maps/api",
    GOOGLE_API_KEY: "AIzaSyBqTv9O_ITFjfmV1JN6rc6wxDtQl4asaf8"
  })
  .constant("PlacesConstants", {
    SEARCH_RADIUS: 5000,
  });

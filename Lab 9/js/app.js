var app=angular.module("app",[]);


app.controller('PhoneListController', function PhoneListController($scope,$http) {
  
  $scope.img2="https://images-na.ssl-images-amazon.com/images/M/MV5BNTk1OTUxMzIzMV5BMl5BanBnXkFtZTcwMzMxMjI0Nw@@._V1_UY317_CR8,0,214,317_AL_.jpg";

$scope.btnImageUploadClicked=function(){
        $scope.imgSrc="http://www.gettyimages.com/gi-resources/images/frontdoor/creative/PanoramicImagesRM/FD_image.jpg";    
         $http({
           url:'http://localhost:3000/GetImageContains',
           method:'POST',
         })
        .success(function(response) {
           $scope.matches=[];
           for(var i =0;i<response.outputs[0].data.concepts.length;i++){
                  $scope.matches.push(response.outputs[0].data.concepts[i].name);
           }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}

$scope.GetCelebrityName=function(){
   $http({
           url:'http://localhost:3000/getCelebrity',
           method:'GET',
           data: $scope.data,
         })
        .success(function(response) {
           $scope.celebrityName=response.outputs[0].data.regions[0].data.face.identity.concepts[0].name;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}

});
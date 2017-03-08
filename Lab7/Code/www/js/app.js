var App=angular.module("App",["ionic","ngRoute","ngMock"]);

App.service("Loginservice",[LoginSer]);

App.controller("LoginCtrl",["$scope","Loginservice",function($scope){
    $scope.Login=function(){
     
        var userData=window.localStorage.getItem("userData");    
        userData=JSON.parse(userData);  
        alert($scope.username);
      
       if($scope.username==userData.username && $scope.password==userData.password)
       {
           alert("Logged In");
           window.open("home.html");
       } 
    }
}
]);

App.controller("RegisterCtrl",["$scope",function($scope){
   
    $scope.Register=function(){
        if(($scope.confirmPassword==$scope.password)&&$scope.username!="")
        {
            var userData={
                        username:$scope.username,
                        password:$scope.password,
                    };
            window.localStorage.setItem("userData",JSON.stringify(userData)); 
            window.open("index.html");
        }
        else
        {
            alert("Password must match with confirm password and user id must not be empty");
        }
    }
        
}]);

function LoginSer(){
    this.Validate=function(){
    alert("service");
}
};

App.controller("HomeCtrl",["$scope",function($scope){
  $scope.Home= function (){
        alert("home");  
     }    
$scope.UploadImage=function(){
    alert("Upload");

        var params = {
            // Request parameters
            "mode": "spell",
            "mkt": "en-us",
        };
      
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/spellcheck/?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","b186b264bdea47be961338c6964219f2");
            },
            type: "POST",
            // Request body
            data:"Text=i lv indi",
            
        })
        .done(function(data) {
            debugger;
            var output=[];
            
            for(i=0;i<data.flaggedTokens.length;i++){
                for(j=0;j<data.flaggedTokens[i].suggestions.length;j++){
                       output.push(data.flaggedTokens[i].suggestions[j].suggestion);
                }
            }
        $scope.output=output;
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
};
$scope.AddImage=function(){
    alert("Add image");
    $scope.imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-rBIFL6XmQFuSruQmSV0WPsHDZEshNktPmAI6NVSS9r9e9A0QGCBVqo";
     var params = {
            // Request parameters
            "visualFeatures": "Tags",

            "language": "en",
        };
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","623252f90c9f4aeabb1054a9e7100687");
            },
            type: "POST",
            // Request body
            data:'{ "url":"'+$scope.imgSrc+'" }',
        })
        .done(function(data) {
            debugger;
            $scope.tags=data.tags;
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    };
}]);

describe("LoginCtrl", function() {  
  it("should call login on dinnerService", function () {
      LoginCtrl.Login();
      expect(LoginCtrl.Login).toHaveBeenCalled();
  });
});


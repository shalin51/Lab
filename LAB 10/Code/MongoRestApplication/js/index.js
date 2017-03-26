$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});




var myapp = angular.module('app',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('RegisterCtrl',function($scope,$http){
    $scope.insertData = function(){
        $scope.dataParams = {
            'fname' : $scope.firstName,
            'lname' : $scope.lastName,
            'email' : $scope.email,
            'pw' : $scope.password
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/register',$scope.dataParams);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});

myapp.controller('LoginCtrl',function($scope,$http){
    $scope.loginClick = function(){
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.get('http://127.0.0.1:8081/home');
        req.success(function(data, status, headers, config) {
                for(var i=0;i<data.length;i++){
                    if(data[i].email==$scope.emailLogin && data[i].pw==$scope.passsLogin){
                        window.open("home.html");
                    }
                }
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});

myapp.controller('HomeCtrl',function($scope,$http){

 var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        var req = $http.get('http://127.0.0.1:8081/home');
        req.success(function(data, status, headers, config) {
            $scope.users = data;         
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

$scope.uFirstname="";
$scope.uLastName="";
$scope.uEmail="";
$scope.uPw="";
  

$scope.deleteData=function(event){

$scope.name= {
    'fname':event.target.parentElement.parentElement.childNodes[1].textContent
};

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        var req = $http.post('http://127.0.0.1:8081/delete',$scope.name);
        req.success(function(data, status, headers, config) {
            $scope.users = data;
            alert(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
}

$scope.updateData=function(event){
    
$scope.data= {
        'filter':event.target.parentElement.parentElement.childNodes[1].textContent,
        'replacement':{
                        'fname':event.target.parentElement.parentElement.childNodes[1].textContent,
                        'lname':event.target.parentElement.parentElement.childNodes[3].textContent,
                        'email':event.target.parentElement.parentElement.childNodes[5].textContent,
                        'pw':event.target.parentElement.parentElement.childNodes[7].textContent,
                      }       
    };

$scope.uFirstname=$scope.data.replacement.fname;
$scope.uLastName=$scope.data.replacement.lname;
$scope.uEmail=$scope.data.replacement.email;
$scope.uPw=$scope.data.replacement.pw;
}

$scope.btnSaveClicked=function(){
    

$scope.data.replacement.fname=$scope.uFirstname;
$scope.data.replacement.lname=$scope.uLastName;
$scope.data.replacement.email=$scope.uEmail;
$scope.data.replacement.pw=$scope.uPw;


        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        var req = $http.post('http://127.0.0.1:8081/update',$scope.data);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            $scope.uFirstname="";
            $scope.uLastName="";
            $scope.uEmail="";
            $scope.uPw="";
            alert(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });


}

$scope.btnCancleClicked=function(){
$scope.uFirstname="";
$scope.uLastName="";
$scope.uEmail="";
$scope.uPw="";
}
});
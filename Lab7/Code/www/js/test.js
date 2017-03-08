describe('Controllers',function(){
var scope;

beforeEach(module('App'));

beforeEach(inject(function($rootScope,$controller){
    scope=$rootScope.$new();
    
}));

it('name should be match',function(){
   var Logincontroller = $controller('LoginCtrl', { $scope: $scope });
	expect(scope.username).toEqual('shalin');
})

it('password should be match',function(){
var RegisterController= $controller('RegisterCtrl', { $scope: $scope });
expect(scope.password).toEqual('123');
})

it('Password and Confirm password must match',function(){
var RegisterController= $controller('RegisterCtrl', { $scope: $scope });
expect(scope.password).toEqual(scope.confirmPassword);
})
});
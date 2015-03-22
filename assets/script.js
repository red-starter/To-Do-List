angular.module('app',[])
    .controller('mainCtrl', function($scope,$http,PostsSvc){
    $scope.formData={}

//    when hitting the page, get all posts and display them
    PostsSvc.getUser()
        .success(function(data){
            $scope.posts = data
            // console.log(data)
        })
        .error(function(data){
            console.log('Error: ' +data)
        })
//    when submitting, send the text to the node API
    $scope.createPost = function() {
        $http.post('/api/posts',$scope.formData)
            .success(function(data){
                $scope.formData = {}
            //  clear the form
                $scope.posts = data
                console.log(data)
            })
            .error(function(data){
                console.log('Error: '+data)
            })
    }
//    delete a _Post after checking it
    $scope.deletePost = function(id){
        $http.delete('/api/posts/' + id)
            .success(function(data){
                $scope.posts = data
                console.log(data)
            })
            .error(function(data){
                console.log('Error: ' + data)
            })
    }
})

angular.module('app')
    .service('PostsSvc',function($http){
        var svc = this
        svc.getUser = function () {
            return $http.get('/api/posts')
        }
    })



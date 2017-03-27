var testscope=null;

angular.module("mediaApp",[])

.controller("mainControl",
	['$scope',
	function($scope){
		testscope = $scope;
		$scope.test = 5;
		$scope.longList = false;
		$scope.autoRefresh = false;
		$scope.autoRefreshWait= 30000;
		$scope.mediaList = [];
		
		if(!localStorage.getItem('hideIntro')){
			$('#introModal').modal().show()
		}
		
		//Grabs new lists of media information.
		//If longList is true, appends list to old list, else overwrites. 
		$scope.refreshing = false;
		function update(){
			if(!$scope.refreshing){
				$scope.refreshing = true;
				$.get('https://nuvi-challenge.herokuapp.com/activities')
				.done(function(data){
					try{
						if(typeof(data)=="string"){
							data = JSON.parse(data);
						}
					}		
					catch(err){
						console.log(err);
						return;
					}
					if($scope.longList){
						$scope.mediaList = $.merge(data,$scope.mediaList)
					}else{
						$scope.mediaList= data;
					}
					$scope.refreshing = false;
					$scope.$apply();
				})
				.fail(function(err){
					$scope.refreshing = false;
					console.log(err);
				})
			}
		}
		update();
		
		$scope.requestRefresh = function(){
			update();
		}
		
		$scope.noIntro = function(){
			localStorage.setItem('hideIntro',true)
			$('#introModal').modal('hide');
		}
		
		function controllerLoop(){
			if($scope.autoRefresh){
				update();
			}
			setTimeout(function(){controllerLoop();},$scope.autoRefreshWait);
		}
		controllerLoop();
		
		
		//Formatting controlls
		$scope.selectIcon = function(provider){
			switch(provider){
				case 'facebook':
					return 'fa-facebook-square';
				case 'instagram':
					return 'fa-instagram';
				case 'tumblr':
					return 'fa-tumblr-square';
				case 'twitter':
					return 'fa-twitter-square';
				case 'reddit':
					return 'fa-reddit-square';
				default:
					return  'fa-user-o';
			}
		}
		
		function facebookFormat(activity,action){
			if(action == 'like'){
				
			}else if(action == 'share'){
				
			}else if(action == 'reply'){
				
			}
			return '#';
		}
		function twitterFormat(activity,action){
			if(action == 'like'){
				return 'https://twitter.com/intent/like?tweet_id='+activity.id;
			}else if(action == 'share'){
				return 'https://twitter.com/intent/retweet?tweet_id='+activity.id;
			}else if(action == 'reply'){
				return 'https://twitter.com/intent/tweet?in_reply_to='+activity.id;
			}
			return '#';
		}
		function instagramFormat(activity,action){
			if(action == 'like'){
				
			}else if(action == 'share'){
				
			}else if(action == 'reply'){
				
			}
			return '#';
		}
		function tumblrFormat(activity,action){
			if(action == 'like'){
				
			}else if(action == 'share'){
				
			}else if(action == 'reply'){
				
			}
			return '#';
		}
		function redditFormat(activity,action){
			if(action == 'like'){
				
			}else if(action == 'share'){
				
			}else if(action == 'reply'){
				
			}
			return '#';
		}
		$scope.mediaLink = function(activity,action){
			switch(activity.provider){
				case 'facebook':
					return facebookFormat(activity,action);
				case 'instagram':
					return instagramFormat(activity,action);
				case 'tumblr':
					return tumblrFormat(activity,action);
				case 'twitter':
					return twitterFormat(activity,action);
				case 'reddit':
					return redditFormat(activity,action);
				default:
					return  '#';
			}
		}
	}
]);
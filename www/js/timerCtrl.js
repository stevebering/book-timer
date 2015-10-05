(function() {
	'use strict';
	
	function TimerController($scope, $interval) {
		var interval;
  
		$scope.running = false;
		$scope.startTime = undefined;
		$scope.endTime = undefined;
		$scope.elapsed = '0:00:00';
		$scope.start = start;
		$scope.stop = stop;
		$scope.clear = clear;
		
		function tick() {
			var time = moment($scope.endTime)
						.subtract($scope.startTime);
			$scope.elapsed = time.format("H:mm:ss");
		}
		
		function start() {
			$scope.running = true;
			$scope.startTime = new Date();
			$scope.endTime = undefined;
			
			interval = $interval(function() {
			tick();
			}, 1000);  
		}
		
		function stop() {
			$scope.running = false;
			$scope.endTime = new Date();
			
			if (angular.isDefined(interval)) {
				$interval.cancel(interval);			
			}
		}  
		
		function clear() {
			$scope.startTime = undefined;
			$scope.endTime = undefined;
			$scope.elapsed = '0:00:00';
			
			if (angular.isDefined(interval)) {
				$interval.cancel(interval);
			}
		}
	}
	
	TimerController.$inject = ['$scope', '$interval'];
	
	angular
		.module('starter.controllers')
		.controller('TimerController', TimerController);
	
})();

(function () {
    'use strict';
    var app = angular.module('ngecharts', []);
    app.directive('echarts', ['$window','$compile', function ($window,$compile) {
        return {
            restrict: 'EA',
            template: '<div></div>',
            scope: {
                options: '=',
                config:'=ecConfig'
            },
            link:  buildLinkFunc($window,$compile)
        };
    }]);
    function buildLinkFunc($window) {
        return function (scope, ele, attrs) {
            var chart, options;
            var theme = (scope.config && scope.config.theme)
                        ? scope.config.theme : 'default';
            chart = echarts.init(ele[0],theme);
                    if(scope.config && scope.config.dataLoaded === false){
                        chart.showLoading();
                    }
                    if(scope.config && scope.config.dataLoaded){
                        createChart(scope.options);
                        chart.resize();
                        //chart.hideLoading();
                    }

                    if(scope.config && scope.config.event){
                        if(angular.isArray(scope.config.event)){
                            angular.forEach(scope.config.event,function(value,key){
                                for(var e in value){
                                    chart.on(e,value[e]);
                                }
                            });
                        }
                    }
            
            //chart = echarts.init(ele[0], 'macarons');
            createChart(scope.options);
            //setTimeout(function(){chart.resize()},3000);
            //chart.resize();
            function createChart(options) {
                if (!options) return;
                chart.showLoading();       
                chart.clear();          //clears the previous data
                chart.setOption(options); //sets the new data
                chart.hideLoading();
                angular.element($window).bind('resize', function(){
                    chart.resize();
                }); 
            }
            scope.$watch('options', function (newVal, oldVal) {
                if (angular.equals(newVal, oldVal)) return;
                //console.log(newVal);
                createChart(newVal);
            });
        }
    }


})(angular);
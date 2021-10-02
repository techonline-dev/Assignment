

var app = angular.module('myApp', [
    'ngecharts'
]);
app.controller('myCtrl', function($scope, $http) {
    $scope.dataCal = {
        sum:100,
        count: 0,
        average: 0
    };
    $scope.userData = [];
  $http.get("http://jsonplaceholder.typicode.com/users")
  .then(function(response) {
      $scope.userData = response.data;
        var labels = ['Latitude > 0','Latitude < 0','Longitude < 0','Longitude < 0'];
        var seriesData = [
            {
                name: 'Latitude > 0',
                value: 0
            }, {
                name: 'Latitude < 0',
                value: 0
            }, {
                name: 'Longitude > 0',
                value: 0
            }, {
                name: 'Longitude < 0',
                value: 0
            }
        ]
        $scope.dataCal = {
            sum:100,
            count: $scope.userData.length,
            average: (100/$scope.userData.length)
        };
        $scope.userData.map(function(v,i){
            if(v.address.geo.lat>0){
                seriesData[0].value +=1;
            }
            else{
                seriesData[1].value +=1;
            }
            if(v.address.geo.lng>0){
                seriesData[2].value +=1;
            }
            else{
                seriesData[3].value +=1;
            }
        });

        $scope.CharOptions = drawPieChart(seriesData,labels);
    })


  function drawPieChart(seriesData,labels,chartName='',legendY='bottom',showLabel = true){
      var newLegend = {
          orient : 'horizontal',
          y: legendY,
          data:labels
      }
      if(legendY =='left'||legendY =='right'||legendY =='Left'||legendY =='Right'){
          newLegend.orient ='vertical'
      }
      var option = {
          tooltip : {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
          },
          legend: newLegend ,
          color: ["#fc182c","#34c4c1","#fcbd49","#969bb2"],               ///chartColors,
          calculable : true,
          title:{text:chartName,show : true,textStyle : {fontSize : '14',align : 'center'}},
          series : [
              {
                  name:chartName,
                  type:'pie',
                  radius : ['0%', '50%'],
                  itemStyle : {
                      normal : {
                          label : {
                              formatter: "{b} \n({c})",
                              show : showLabel
                          },
                          labelLine : {
                              show : showLabel
                          }
                      }
                  },
                  data:seriesData
              }
          ]
      };
      return option;
  }
});
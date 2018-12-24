$(document).ready(function () {
    
var montantprevision = $("#myCanvas").data('montant');
var intituleLigne = $("#myCanvas").data('ligne');
var ctx = $("#myCanvas");

chartPrevisions("Les previsions ", montantprevision, intituleLigne, ctx,'pie');

/*
// les Globales
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontColor = '#777';
Chart.defaults.global.defaultFontSize = 18;

var myChart = new Chart(ctx, {
    type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels:['bar', 'horizontalBar', 'pie', 'line', 'doughnut'],
        datasets: [{
            label: 'Previsions',
            data: [23, 13, 9, 4, 6, 13],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            hoverBorderColor:'#777'
        }]
    },
    options: {
        title:{
            display:true,
            text:'les previsions',
            fontSize:25
        },
        legend:{
            display:true,
            position:'right',
            labels:{
                fontColor:'#777',
            }
        },
        layaout:{
            padding:{
                left:50,
                right:0,
                bottom:0,
                top:0
            }
        },
        tooltips:{
            enabled:true
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        
    }
});

*/


});

function chartPrevisions(titre, montantprevision, intituleLigne, ctx, typeChart){
    Chart.defaults.global.defaultBackgroundColor = '#777';
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontColor = '#777';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultBorderColor = '#777';
    var pieData = {
        labels:intituleLigne,
        datasets: [
          {
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ], borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
            hoverBorderColor:'#777',
            data: montantprevision
         }
       ]
     }
    
      var chartInstance = new Chart(ctx, {
        type: typeChart,
        data: pieData,
        options: {
            legend:{
                position:'bottom' 

            },
            title:{
                display:true,
                text: titre,
                fontSize:25
            },
            layaout:{
                padding:{
                    left:50,
                    right:0,
                    bottom:0,
                    top:0
                }
            },
            tooltips:{
                enabled:true
            },
        }
      });
    
    }
     


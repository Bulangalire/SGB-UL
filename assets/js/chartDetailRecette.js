$(document).ready(function () {
   
    //var montantrecette = $("#myDetailRecette").data('montantrecette');
    //var daterecette = $("#myDetailRecette").data('daterecette');
    //var ctxrecette = $("#myDetailRecette");
    //chartDetailRecette("Recette", montantrecette, daterecette, ctxrecette,'bar');
   // console.log(daterecette = $("#myDetailRecette").data('daterecette'));

    Date.prototype.formatMMDDYYYY = function() {
        return (this.getMonth() + 1) +
        "/" +  this.getFullYear();
    }
    var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    myRecettes=$("#mesRecettes").data('recettes');

        // Split timestamp and data into separate arrays
        var labels = [], data=[], couleur=[];
        myRecettes.forEach(function(recette) {
          labels.push(recette.createAt);
          data.push(parseFloat(recette.montantrecette));
          couleur.push(dynamicColors());

        });

      
        // Create the chart.js data structure using 'labels' and 'data'
        var tempData = {
            labels          : labels,
            datasets        : [{
            backgroundColor :couleur,
            borderColor     :couleur,
            borderWidth     : 1,
            hoverBorderColor:'#777',         
            data            : data
          }]
        };
    
        // Get the context of the canvas element we want to select
        var ctx = document.getElementById("mesRecettes").getContext("2d");
    
        // Instantiate a new chart
        // var myLineChart = new Chart(ctx).$(tempData);
        // Type:  bar, horizontalBar, pie, line, doughnut, radar, polarArea
        chartRecette('Recettes', tempData, ctx, 'bar')
     
});
    

function chartRecette(titre, tempData, ctx, typeChart){
    Chart.defaults.global.defaultBackgroundColor = '#777';
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontColor = '#777';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultBorderColor = '#777';
   
      var chartInstance = new Chart(ctx, {
        type: typeChart,
        data: tempData,
        options: {
            
            title:{
                display:true,
                text: titre,
                fontSize:25
            },
            legend:{
                display:false,
                position:'bottom' 
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
                    valueFormatString: "#,###",
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    valueFormatString: "MMMM YYYY" ,
                    labelAngle: -50
                }]
            },
    
        }
      });
    
    }





function chartDetailRecette(titre, montantprevision, daterecette, ctx, typeChart){
    Chart.defaults.global.defaultBackgroundColor = '#777';
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontColor = '#777';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultBorderColor = '#777';
    var recettes = {
        labels:daterecette,
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
        data: recettes,
        options: {
            title:{
                display:true,
                text: titre,
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
                    valueFormatString: "#,###"
                }],
                xAxes: [{
                    valueFormatString: "DD-MMM" ,
                }]
            },
            responsive: true,
            maintainAspectRatio: false
    
        }
      });
    
    }
     
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
    myCompteDepense=$("#myCompteDepense").data('mescomptesdepense');
        // Split timestamp and data into separate arrays
        var labels = [], data=[], couleur=[];
        myCompteDepense.forEach(function(mesdep) {
          labels.push(mesdep.createAt);
          data.push(parseFloat(mesdep.sommedepense));
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
        var ctx = document.getElementById("myCompteDepense").getContext("2d");
    
        // Instantiate a new chart
        // var myLineChart = new Chart(ctx).$(tempData);
        // Type:  bar, horizontalBar, pie, line, doughnut, radar, polarArea
        chartDepense('Depense', tempData, ctx, 'bar')
     
});
    

function chartDepense(titre, tempData, ctx, typeChart){
    Chart.defaults.global.defaultBackgroundColor = '#777';
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontColor = '#777';
    Chart.defaults.global.defaultFontSize = 12;
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
            labels: {
                render: function (args) {
                    return '$' + args.value;
                },
                precision: 0,
                showZero: true,
                textShadow: true,
                showActualPercentages: true,


            },
            tooltips:{
                callbacks: {
                    label: function(tooltipItem, data) {
                        var allData = data.datasets[tooltipItem.datasetIndex].data;
                        var tooltipLabel = data.labels[tooltipItem.index];
                        var tooltipData = allData[tooltipItem.index];
                        var total = 0;
                        for (var i in allData) {
                            total += parseFloat(allData[i]);
                        }
                        var tooltipPercentage = ((tooltipData / total) * 100 ).toFixed(2);
                        return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
    
       
    
        }
      });
      
    
    }


     
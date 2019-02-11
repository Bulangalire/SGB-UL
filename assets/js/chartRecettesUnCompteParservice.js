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
    myCompte=$("#myCompte").data('mescomptes');

        // Split timestamp and data into separate arrays
        var labels = [], data=[], couleur=[];
        myCompte.forEach(function(recette) {
          labels.push(recette.createAt);
          data.push(parseFloat(recette.montantrecette));
          couleur.push(dynamicColors());

        });

      
    
        // Create the chart.js data structure using 'labels' and 'data'
        var tempData = {
            labels          : labels.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                da=new Date(a.createAt);
                db=new Date(b.createAt);
                return  (da>db)?1:-1;
              }),
            datasets        : [{
            backgroundColor :couleur,
            borderColor     :couleur,
            borderWidth     : 1,
            hoverBorderColor:'#777',         
            data            : data
          }]
        };
    
        // Get the context of the canvas element we want to select
        var ctx = document.getElementById("myCompte").getContext("2d");
    
        // Instantiate a new chart
        // var myLineChart = new Chart(ctx).$(tempData);
        // Type:  bar, horizontalBar, pie, line, doughnut, radar, polarArea
        chartRecette('Recettes', tempData, ctx, 'pie')
     
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
       
    
        }
      });
      
    
    }


     
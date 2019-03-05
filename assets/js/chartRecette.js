$(document).ready(function () {
    
    var montantBudgetaire = $("#ligneRecette").data('montant');
    var intituleBudgetaire = $("#ligneRecette").data('ligne');
    var ctx = $("#ligneRecette");
    
    couleur=[];
    intituleBudgetaire.forEach(function() {
        couleur.push(dynamicColors());
    });
    console.log(couleur);
    console.log(intituleBudgetaire);
    console.log(montantBudgetaire);
    console.log(ctx);
    chartPrevisions("Realisation Recette ",couleur,  montantBudgetaire, intituleBudgetaire, ctx,'pie');
    });
    var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    
    function chartPrevisions(titre, couleur, montant, intitule, ctx, typeChart){
        Chart.defaults.global.defaultBackgroundColor = '#777';
        Chart.defaults.global.defaultFontFamily = 'Lato';
        Chart.defaults.global.defaultFontColor = '#777';
        Chart.defaults.global.defaultFontSize = 18;
        Chart.defaults.global.defaultBorderColor = '#777';
    
        var pieData = {
            labels:intitule,
            datasets: [
              {
                backgroundColor: couleur, 
                borderColor: '#777',
                borderWidth: 1,
                hoverBorderColor:'#777',
                data: montant
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
                }
            }
          });
        
        }
         
    
    
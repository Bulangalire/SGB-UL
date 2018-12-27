$(document).ready(function () {
    
var montantprevision = $("#myCanvas").data('montant');
var intituleLigne = $("#myCanvas").data('ligne');
var ctx = $("#myCanvas");
chartPrevisions("Les previsions ", montantprevision, intituleLigne, ctx,'pie');
});
var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

function chartPrevisions(titre, montantprevision, intituleLigne, ctx, typeChart){
    Chart.defaults.global.defaultBackgroundColor = '#777';
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontColor = '#777';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultBorderColor = '#777';
    
    couleur=[];
    intituleLigne.forEach(function() {
        couleur.push(dynamicColors());
    });
    console.log(couleur);

    var pieData = {
        labels:intituleLigne,
        datasets: [
          {
            backgroundColor: couleur, 
            borderColor: '#777',
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
     


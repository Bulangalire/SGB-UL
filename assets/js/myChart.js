var ctx = document.getElementById("myChart");

// les Globales
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontColor = '#777';
Chart.defaults.global.defaultFontSize = 18;

var myChart = new Chart(ctx, {
    type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Previsions',
            data: [12, 5, 3, 5, 2, 3],
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


$(document).ready(function () {
   
    $(".addPrevision").click(function(e) {
        myChart.data.labels.push('Noire');
        myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(45);
    });
    myChart.update();
})});
       
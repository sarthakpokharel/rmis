
function barchart(bardata,bardata1) {
	 ///////////////////bar chart/////////////////////////
            var barChartData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                        label: '# Projection',
                        data: bardata,
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
						type: 'bar'
                    },{
                        label: '# Actual',
                        data: bardata1,
                        backgroundColor: [
							'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                            
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
						type: 'bar'
                    }]


            };
            //window.onload = function() {
            var ctx = document.getElementById("canvasBar");
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    title: {
                        display: true,
                        text: " Bar Chart - Stacked"
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                                stacked: true,
                            }],
                        yAxes: [{
                                stacked: true
                            }]
                    }
                }
            });
            //  };
   };

            /////////line chart////////////
			

function linechart(linedata1,linedata2,linedata3,linedata4){
            var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var config = {
                type: 'line',
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                            label: "dataset - big points",
                            data: linedata1,
                            backgroundColor: window.chartColors.red,
                            borderColor: window.chartColors.red,
                            fill: false,
                            borderDash: [5, 5],
                            pointRadius: 15,
                            pointHoverRadius: 10,
                        }, {
                            label: "dataset - individual point sizes",
                            data: linedata2,
                            backgroundColor: window.chartColors.blue,
                            borderColor: window.chartColors.blue,
                            fill: false,
                            borderDash: [5, 5],
                            pointRadius: [2, 4, 6, 18, 0, 12, 20],
                        }, {
                            label: "dataset - large pointHoverRadius",
                            data: linedata3,
                            backgroundColor: window.chartColors.green,
                            borderColor: window.chartColors.green,
                            fill: false,
                            pointHoverRadius: 30,
                        }, {
                            label: "dataset - large pointHitRadius",
                            data: linedata4,
                            backgroundColor: window.chartColors.yellow,
                            borderColor: window.chartColors.yellow,
                            fill: false,
                            pointHitRadius: 20,
                        }]
                },
                options: {
                    responsive: true,
                    legend: {
                        position: 'bottom',
                    },
                    hover: {
                        mode: 'index'
                    },
                    scales: {
                        xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Month'
                                }
                            }],
                        yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value'
                                }
                            }]
                    },
                    title: {
                        display: true,
                        text: ' Line Chart - Different point sizes'
                    }
                }
            };

            //function cld() {
            var ctxLine = document.getElementById("canvasLine").getContext("2d");
            window.myLine = new Chart(ctxLine, config);
            // }
            // ;
};
/////////////////////////pie chart//////////////////////////////////////////
function piechart(piedata){
            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100);
            };

            var config = {
                type: 'pie',
                data: {
                    datasets: [{
                            data: piedata,
                            backgroundColor: [
                                window.chartColors.red,
                                window.chartColors.orange,
                                window.chartColors.yellow,
                                window.chartColors.green,
                                window.chartColors.blue,
                            ],
                            label: 'Dataset 1'
                        }],
                    labels: [
                        "Red",
                        "Orange",
                        "Yellow",
                        "Green",
                        "Blue"
                    ]
                },
                options: {
                    responsive: true,
                    legend: {
                        position: 'bottom'
                    }
                }
            };

            //window.onload = function () {
            var ctx = document.getElementById("chart-area").getContext("2d");
            window.myPie = new Chart(ctx, config);
            // };
};
//////////////////////area chart////////////////////////////
function areachart(areadata){
            var presets = window.chartColors;
            var utils = Samples.utils;
            var inputs = {
                min: -100,
                max: 100,
                count: 8,
                decimals: 2,
                continuity: 1
            };

            
            function generateLabels(config) {
                return utils.months(utils.merge({
                    count: inputs.count,
                    section: 3
                }, config || {}));
            }

            var options = {
                maintainAspectRatio: false,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                scales: {
                    xAxes: [{
                            ticks: {
                                autoSkip: false,
                                maxRotation: 0
                            }
                        }]
                }
            };

            //[false, 'origin', 'start', 'end'].forEach(function(boundary, index) {

            // reset the random seed to generate the same data for all charts
            utils.srand(8);

            new Chart('chart-2', {
                type: 'line',
                data: {
                    labels: generateLabels(),
                    datasets: [{
                            backgroundColor: utils.transparentize(presets.red),
                            borderColor: presets.red,
                            data:areadata, 
                            label: 'Dataset',
                            fill: 'start'
                        }]
                },
                options: utils.merge(options, {
                    title: {
                        text: 'fill: start',
                        display: true
                    }
                })
            });
     
};

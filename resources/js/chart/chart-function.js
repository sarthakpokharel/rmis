           
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
                            label: '',
                            fill: 'start'
                        }]
                },
                options: utils.merge(options, {
                    title: {
                        text: 'मासिक खर्च ',
                        display: true
                    }
                })
            });
     
};

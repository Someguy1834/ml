const util = require("./util.js");

class Neuron {
    constructor(amount, randomthres = 10) {
        this.weights = [];
        this.bias = util.minmax(-randomthres, randomthres);
        for (let i = 0; i < amount; i++) {
            this.weights.push(util.minmax(-randomthres, randomthres));
        };
    };
};

class OutputNeuron {
    constructor(amount, randomthres = 10) {
        this.weights = [];
        this.bias = util.minmax(-randomthres, randomthres);
        for (let i = 0; i < amount; i++) {
            this.weights.push(util.minmax(-randomthres, randomthres));
        };
    };
};

function run(neuron, input) {
    let output = 0;
    for (let i = 0; i < neuron.weights.length; i++) {
        output += neuron.weights[i] * input + neuron.bias;
    };
    return output;
};
function runOutput(input, neuron) {
    let output = 0;
    for (let i = 0; i < neuron.weights.length; i++) {
        output += neuron.weights[i] * input[i] + neuron.bias;
    };
    return output;
};

module.exports = {
    Neuron,
    OutputNeuron,
    run,
    runOutput
};

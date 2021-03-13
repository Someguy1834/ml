const { Neuron, OutputNeuron, run, runOutput } = require("./neuron.js");


function runNetwork(input, network) {
    if (typeof input !== "object") throw new Error("Invalid input type");
    if (input.length !== network.inputsize) throw new Error("Incorrect size");

    const hiddenresult = [];
    const output = [];

    for (let i = 0; i < input.length; i++) {
        let result = run(network.net.input[i], input[i]);
        for (const layerkey in network.net.hidden) {
            const layer = network.net.hidden[layerkey];
            let layeroutput = 0;
            for (const nodekey in layer) {
                layeroutput += run(layer[nodekey], result);
            };
            result = layeroutput;
        };
        hiddenresult.push(result);
    };

    for (const outputkey in network.net.output) {
        output.push(runOutput(hiddenresult, network.net.output[outputkey]));
    };
    return output;
};

function addlayer(network, thres) {
    const id = network.nextID++;
    network.net.hidden[id] = {};
    for (let i = 0; i < network.nodesize; i++) {
        network.net.hidden[id][i] = new Neuron(network.nodesize, 2);
    };
    return network;
};

function tojson(network) {
    return JSON.stringify(network);
};

function fromjson(json, network) {
    const input = JSON.parse(json);
    for (const variable in input) {
        network[variable] = input[variable];
    };
    return network;
};


class RawNetwork {
    constructor(nodesize, layersize, inputsize, outputsize) {
        this.nextID = 0;
        this.nodesize = nodesize;
        this.inputsize = inputsize;
        this.outputsize = outputsize;
        this.net = {
            input: {},
            hidden: {},
            output: {},
        };
        for (let i = 0; i < inputsize; i++) this.net.input[i] = new Neuron(nodesize, 2);
        for (let i = 0; i < layersize; i++) addlayer(this);
        for (let i = 0; i < outputsize; i++) this.net.output[i] = new OutputNeuron(inputsize, 2);
    };
};

module.exports = {
    RawNetwork,
    runNetwork,
    addlayer,
    tojson,
    fromjson
};

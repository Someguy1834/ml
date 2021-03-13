const networks = require("./network.js");

class NeuralNetwork {
    constructor(inputsize, outputsize, options = {
        epochs: 100,
        nodesize: 1,
        layersize: 1,
        nodethres: 2,
        batchsize: 10000,
    }) {
        this.inputsize = inputsize;
        this.outputsize = outputsize;
        this.epochs = options.epochs;
        this.nodesize = options.nodesize;
        this.layersize = options.layersize;
        this.nodethres = options.nodethres;
        this.batchsize = options.batchsize;
        this.net = new networks.RawNetwork(this.nodesize, this.layersize, this.inputsize, this.outputsize);
    };

    train(test) {
        const nets = {};
        let topplayer = 0;
        for (let i = 0; i < this.batchsize; i++) {
            nets[i] = new networks.RawNetwork(this.nodesize, this.layersize, this.inputsize, this.outputsize);
        };
        for (let trial = 0; trial < this.epochs; trial++) {
            let bestscore = -Infinity;
            let bestplayer = 0;
            for (const netkey in nets) {
                const net = nets[netkey];
                let score = 0;
                for (const testkey in test.questions) {
                    let branch = test.questions[testkey];
                    score += branch.answer / (Math.abs(Math.abs(networks.runNetwork([branch.question], net)) - Math.abs(branch.answer)));
                };
                if (score > bestscore) {
                    bestscore = score;
                    bestplayer = netkey;
                };
            };

            const bestnet = networks.tojson(nets[bestplayer]);
            for (const netkey in nets) {
                nets[netkey] = networks.fromjson(bestnet, nets[netkey]);
                nets[netkey] = networks.addlayer(nets[netkey], this.nodethres);
            };
            topplayer = bestplayer;
            console.log(trial, bestscore);
        };
        this.net = nets[topplayer];
    };

    run(input) {
        return networks.runNetwork(input, this.net);
    };

    toJSON() {

    };

    fromJSON(json) {

    };
};

module.exports = NeuralNetwork;

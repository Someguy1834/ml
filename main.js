const Holy = require("./exports.js");
const net = new Holy.NeuralNetwork(1, 1);
const test = new Holy.Test();

for (let i = 0; i < 10; i++) {
    test.add(i, i + i);
};

net.train(test);
console.log(net.run([4]));
console.log(net.run([10]));
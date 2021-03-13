class Test {
    constructor() {
        this.nextid = 0;
        this.questions = {};
    };

    getID() {
        this.nextid++;
        return this.nextid;
    };

    add(question, answer) {
        const id = this.getID();
        this.questions[id] = {
            answer: answer,
            question: question
        };
    };
    
};

module.exports = {
    Test,
};

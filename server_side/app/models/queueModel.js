class QueueModel {
    constructor() {
        this.queues = {};
    }

    addMessage(queueName, message) {
        if (!this.queues[queueName]) {
            this.queues[queueName] = [];
        }
        this.queues[queueName].push(message);
    }

    getNextMessage(queueName) {
        if (!this.queues[queueName] || this.queues[queueName].length === 0) {
            return null;
        }
        return this.queues[queueName].shift();
    }

    getQueueNames() {
        return Object.keys(this.queues).map((name) => ({
            name,
            count: this.queues[name].length
        }));
    }
}

module.exports = new QueueModel();

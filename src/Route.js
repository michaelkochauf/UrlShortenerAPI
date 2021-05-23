class Route {
    constructor(short, url, createdOn) {
        this.short = short;
        this.url = url;
        this.createdOn = createdOn;
        this.countUsages = 0;
        this.usages = [];
    }
}

module.exports = Route;
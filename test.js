var Planet = /** @class */ (function () {
    function Planet(message) {
        this.name = message;
    }
    Planet.prototype.printName = function () { console.log('name is ' + this.name); };
    return Planet;
}());
new Planet('Earth');

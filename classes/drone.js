import {Vehicle} from './vehicle';

export class Drone extends Vehicle {
    constructor(license, model, latLong) {
        super(license, model, latLong);
        this.airTimeHours = null;
        this.base = null;
    }
}

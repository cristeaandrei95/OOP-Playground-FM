import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';
import {DataError} from './data-error.js';

export class FleetDataService {
    constructor() {
        this.cars = [];
        this.drones = [];
        this.errors = [];
    }

    loadFleet(fleet) {
        for (let data of fleet) {
            switch(data.type) {
                case 'car':
                    if (this.validateCarData(data)) {
                        let car = this.loadCar(data);
                        if (car)
                            this.cars.push(car);
                    } else {
                        let e = new DataError('Invalid car data', data);
                        this.errors.push(e);
                    }
                    break;
                case 'drone':
                    this.drones.push(data);
                    break;
                default:
                    let e = new DataError('Invalid vehicle', data);
                    this.errors.push(e);
            }
        }
    }

    loadCar(car) {
        try {
            let c = new Car(car.license, car.model, car.latLong);
            c.miles = car.miles;
            c.make = car.make;
            return c;
        } catch (e) {
            this.errors.push(new DataError('Error loading car', car));
        }
        return null;
    }

    validateCarData(car) {
        let requiredProps = 'license model latLong miles make'.split(' ');
        let hasErrors = false;

        for (let field of requiredProps) {
            if (!car[field]) {
                this.errors.push(new DataErrors(`Invalid field ${field}`, car));
                hasErrors = true;
            }
        }
        if (Number.isNaN(Number.parseFloat(car.miles))) {
            this.errors.push(new DataErrors('Invalid mileage', car));
            hasErrors = true;
        }
        
        return !hasErrors;
    }

    getCarByLicense(license) {
        return this.cars.find(car => {
            return car.license === license;
        });
    }

    getCarsSortedByLicense() {
        return this.cars.sort((a, b) => {
            if (a.license < b.license)
                return -1;
            if (a.license > b.license)
                return 1;
            return 0;
        });
    }

    filterCarsByMake(filter) {
        return this.cars.filter(car => car.make.indexOf(filter) >= 0);
    }
}

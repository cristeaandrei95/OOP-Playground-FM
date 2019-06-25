import {Car} from './classes/car.js';
import {Drone} from './classes/drone.js';
import {fleet} from './fleet-data.js';
import {FleetDataService} from './services/fleet-data-services.js';

let dataService = new FleetDataService();
dataService.loadData(fleet);

for (let e of dataService.errors)
    console.log(e.message);

let carByLicense = dataService.getCarByLicense('BV123');
let sortedCars = dataService.getCarsSortedByLicense();
let carsByMake = dataService.filterCarsByMake('e');

for (let car of sortedCars)
    console.log(car.make);


for (let car of carsByMake)
    console.log(car.make);


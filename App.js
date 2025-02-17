import fleet from './fleet-data.js';
import {FleetDataService} from './services/fleet-data-service.js';

let fleetDataService = new FleetDataService();
fleetDataService.loadFleet(fleet);

for (let e of fleetDataService.errors)
    console.log(e.message);

let carByLicense = fleetDataService.getCarByLicense('BV123');
let sortedCars = fleetDataService.getCarsSortedByLicense();
let carsByMake = fleetDataService.filterCarsByMake('e');

 for (let car of sortedCars)
    console.log(car.make);


// for (let car of carsByMake)
//    console.log(car.make);


export class Customer {
    customerId: number;
    customerName: string;
    email: string;
    mobileNo: number;
    password: string;
}

export class Response {
    status: boolean;
    errorMessages: string[];
    responseData: any;
    pageable: number;
}

export class Car {
    carId: number;
    licenseNumberPlate: string;
    carType: string;
    latitude: number;
    longitude: number;
    driver: Driver;
    carStatus: any;
}

export class Driver {
    driverId: number;
    driverName: string;
    licenceNo: string;
    email: string;
    mobileNo: string;
    password: string;
    driverRating: number;
}

export class Feedback {
    feedbackId: number;
    rating: number;
    comments: string;
}

export class Ride {
    rideId: number;
    sourceLocation: string;
    destLocation: string;
    traveledDistance: number;
    date: string;
    fare: number;
    car: Car;
    customer: Customer;
    feedback: Feedback;
    rideStatus: any;
}

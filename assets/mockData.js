// mockData.js

export const rentalItems = [
  {
    id: 1,
    name: 'Product 1',
    price: 20,
    startDate: '10-02-24',
    endDate: '15-02-24',
    details: 'This is the first product for rent.',
    owner: 'John',
    distanceFromMe: 5, // Distance in km
  },
  {
    id: 2,
    name: 'Product 2',
    price: 25,
    startDate: '12-02-24',
    endDate: '18-02-24',
    details: 'This is the second product for rent.',
    owner: 'Jane',
    distanceFromMe: 8, // Distance in km
  },
  {
    id: 3,
    name: 'Product 3',
    price: 30,
    startDate: '14-02-24',
    endDate: '20-02-24',
    details: 'This is the third product for rent.',
    owner: 'Bob',
    distanceFromMe: 12, // Distance in km
  },
  {
    id: 4,
    name: 'Product 4',
    price: 18,
    startDate: '16-02-24',
    endDate: '22-02-24',
    details: 'This is the fourth product for rent.',
    owner: 'Alice',
    distanceFromMe: 15, // Distance in km
  },
  {
    id: 5,
    name: 'Product 5',
    price: 22,
    startDate: '18-02-24',
    endDate: '24-02-24',
    details: 'This is the fifth product for rent.',
    owner: 'Charlie',
    distanceFromMe: 20, // Distance in km
  },
  {
    id: 6,
    name: 'Product 6',
    price: 27,
    startDate: '20-02-24',
    endDate: '26-02-24',
    details: 'This is the sixth product for rent.',
    owner: 'Diana',
    distanceFromMe: 25, // Distance in km
  },
  {
    id: 7,
    name: 'Product 7',
    price: 35,
    startDate: '22-02-24',
    endDate: '28-02-24',
    details: 'This is the seventh product for rent.',
    owner: 'Ethan',
    distanceFromMe: 30, // Distance in km
  },
  {
    id: 8,
    name: 'Product 8',
    price: 19,
    startDate: '24-02-24',
    endDate: '01-03-24',
    details: 'This is the eighth product for rent.',
    owner: 'Fiona',
    distanceFromMe: 35, // Distance in km
  },
  {
    id: 9,
    name: 'Product 9',
    price: 28,
    startDate: '26-02-24',
    endDate: '04-03-24',
    details: 'This is the ninth product for rent.',
    owner: 'George',
    distanceFromMe: 40, // Distance in km
  },
  {
    id: 10,
    name: 'Product 10',
    price: 32,
    startDate: '28-02-24',
    endDate: '06-03-24',
    details: 'This is the tenth product for rent.',
    owner: 'Holly',
    distanceFromMe: 45, // Distance in km
  },
  {
    id: 11,
    name: 'Product 11',
    price: 21,
    startDate: '01-03-24',
    endDate: '08-03-24',
    details: 'This is the eleventh product for rent.',
    owner: 'Isaac',
    distanceFromMe: 50, // Distance in km
  },
  {
    id: 12,
    name: 'Product 12',
    price: 24,
    startDate: '03-03-24',
    endDate: '10-03-24',
    details: 'This is the twelfth product for rent.',
    owner: 'Jenna',
    distanceFromMe: 55, // Distance in km
  },
  {
    id: 13,
    name: 'Product 13',
    price: 31,
    startDate: '05-03-24',
    endDate: '12-03-24',
    details: 'This is the thirteenth product for rent.',
    owner: 'Kevin',
    distanceFromMe: 60, // Distance in km
  },
  {
    id: 14,
    name: 'Product 14',
    price: 26,
    startDate: '07-03-24',
    endDate: '14-03-24',
    details: 'This is the fourteenth product for rent.',
    owner: 'Laura',
    distanceFromMe: 65, // Distance in km
  },
  {
    id: 15,
    name: 'Product 15',
    price: 29,
    startDate: '09-03-24',
    endDate: '16-03-24',
    details: 'This is the fifteenth product for rent.',
    owner: 'Josh',
    distanceFromMe: 70, // Distance in km
  },
];

export const orderedRentalItems = [...rentalItems].sort(
  (a, b) => new Date(a.startDate) - new Date(b.startDate)
);

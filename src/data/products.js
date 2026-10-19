export const categories = [
  {
    name: 'Samsung',
    short: 'SAMSUNG',
    description: 'Reliable parts for your home appliances',
    image: 'photo-1593642632823-8f785ba67e45',
    appliances: [
      { name: 'AC' },
      { name: 'Washing Machine' },
      { name: 'Fridge' },
    ],
  },
  {
    name: 'LG',
    short: 'LG',
    description: 'Dependable components, built to last',
    image: 'photo-1581091226825-a6a2a5aee158',
    appliances: [
      { name: 'AC' },
      { name: 'Washing Machine' },
      { name: 'Fridge' },
    ],
  },
  {
    name: 'Daikin',
    short: 'DAIKIN',
    description: 'Engineered for efficient cooling',
    image: 'photo-1581092160562-40aa08e78837',
    appliances: [{ name: 'AC' }],
  },
  {
    name: 'Voltas',
    short: 'VOLTAS',
    description: 'Quality spares for Indian homes',
    image: 'photo-1581092795360-fd1ca04f0952',
    appliances: [
      { name: 'AC' },
      { name: 'Fridge' },
    ],
  },
  {
    name: 'Universal',
    short: 'UNIVERSAL',
    description: 'Versatile parts for everyday repairs',
    image: 'photo-1518770660439-4636190af475',
    appliances: [
      { name: 'AC' },
      { name: 'Washing Machine' },
      { name: 'Fridge' },
    ],
  },
]

export const products = [
  { id: 'ME-SAM-1042', name: 'Inverter AC Main Control PCB', model: 'ME-SAM-1042', brand: 'Samsung', appliance: 'AC', partCategory: 'Main Control PCB', price: 2450, oldPrice: 2990, image: 'photo-1518770660439-4636190af475', tag: 'BESTSELLER' },
  { id: 'ME-LG-2088', name: 'Dual Inverter AC Control Board', model: 'ME-LG-2088', brand: 'LG', appliance: 'AC', partCategory: 'Main Control PCB', price: 3180, oldPrice: 3790, image: 'photo-1581091226825-a6a2a5aee158', tag: 'POPULAR' },
  { id: 'ME-DAI-3105', name: 'Daikin AC Indoor Display Board', model: 'ME-DAI-3105', brand: 'Daikin', appliance: 'AC', partCategory: 'Display Board', price: 1850, oldPrice: 2290, image: 'photo-1581092160562-40aa08e78837', tag: null },
  { id: 'ME-VOL-4160', name: 'Voltas Window AC Power Module', model: 'ME-VOL-4160', brand: 'Voltas', appliance: 'AC', partCategory: 'Power Module', price: 1250, oldPrice: 1590, image: 'photo-1581092795360-fd1ca04f0952', tag: 'VALUE PICK' },
  { id: 'ME-UNI-5024', name: 'Universal AC Control Board', model: 'ME-UNI-5024', brand: 'Universal', appliance: 'AC', partCategory: 'Universal Control PCB', price: 980, oldPrice: 1250, image: 'photo-1518770660439-4636190af475', tag: null },
  { id: 'ME-SAM-6117', name: 'Samsung Outdoor Inverter PCB', model: 'ME-SAM-6117', brand: 'Samsung', appliance: 'AC', partCategory: 'Main Control PCB', price: 4250, oldPrice: 4990, image: 'photo-1593642632823-8f785ba67e45', tag: 'NEW ARRIVAL' },
  { id: 'ME-LG-7203', name: 'LG Washing Machine Control Board', model: 'ME-LG-7203', brand: 'LG', appliance: 'Washing Machine', partCategory: 'Main Control Board', price: 2750, oldPrice: 3290, image: 'photo-1581091226825-a6a2a5aee158', tag: null },
  { id: 'ME-DAI-8346', name: 'Daikin AC Power Supply PCB', model: 'ME-DAI-8346', brand: 'Daikin', appliance: 'AC', partCategory: 'Inverter Board', price: 3650, oldPrice: 4290, image: 'photo-1581092160562-40aa08e78837', tag: 'TESTED QC' },
  { id: 'ME-SAM-9012', name: 'Samsung Washer Motor Controller', model: 'ME-SAM-9012', brand: 'Samsung', appliance: 'Washing Machine', partCategory: 'Motor Controller', price: 2190, oldPrice: 2590, image: 'photo-1581092795360-fd1ca04f0952', tag: null },
  { id: 'ME-LG-9210', name: 'LG Refrigerator Display Board', model: 'ME-LG-9210', brand: 'LG', appliance: 'Fridge', partCategory: 'Display Board', price: 1680, oldPrice: 1990, image: 'photo-1581092160562-40aa08e78837', tag: 'POPULAR' },
  { id: 'ME-SAM-9274', name: 'Samsung Fridge Main Control PCB', model: 'ME-SAM-9274', brand: 'Samsung', appliance: 'Fridge', partCategory: 'Main Control PCB', price: 2890, oldPrice: 3390, image: 'photo-1518770660439-4636190af475', tag: null },
  { id: 'ME-VOL-9345', name: 'Voltas Refrigerator Power Board', model: 'ME-VOL-9345', brand: 'Voltas', appliance: 'Fridge', partCategory: 'Power Board', price: 1490, oldPrice: 1790, image: 'photo-1581092795360-fd1ca04f0952', tag: null },
  { id: 'ME-UNI-9462', name: 'Universal Washing Machine Controller', model: 'ME-UNI-9462', brand: 'Universal', appliance: 'Washing Machine', partCategory: 'Universal Control Board', price: 1350, oldPrice: 1650, image: 'photo-1518770660439-4636190af475', tag: 'VALUE PICK' },
  { id: 'ME-LG-9531', name: 'LG AC Indoor Display Panel', model: 'ME-LG-9531', brand: 'LG', appliance: 'AC', partCategory: 'Display Board', price: 1190, oldPrice: 1450, image: 'photo-1581091226825-a6a2a5aee158', tag: null },
  { id: 'ME-UNI-9648', name: 'Universal Refrigerator Control PCB', model: 'ME-UNI-9648', brand: 'Universal', appliance: 'Fridge', partCategory: 'Universal Control PCB', price: 1090, oldPrice: 1390, image: 'photo-1518770660439-4636190af475', tag: null },
]

export const imageUrl = (photo, width = 720) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=85`

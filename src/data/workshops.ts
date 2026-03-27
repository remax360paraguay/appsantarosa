export interface Workshop {
  id: string;
  name: string;
  brandId: string;
  type: 'oficial' | 'autorizado';
  address: string;
  city: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export const workshops: Workshop[] = [
  {
    id: 'w1',
    name: 'Taller Oficial Renault Asunción',
    brandId: 'renault',
    type: 'oficial',
    address: 'Av. Mariscal López 1234',
    city: 'Asunción',
    phone: '021-123456',
    latitude: -25.2867,
    longitude: -57.6478,
  },
  {
    id: 'w2',
    name: 'Taller Oficial Jetour Central',
    brandId: 'jetour',
    type: 'oficial',
    address: 'Av. Eusebio Ayala 567',
    city: 'Asunción',
    phone: '021-234567',
    latitude: -25.3012,
    longitude: -57.6234,
  },
  {
    id: 'w3',
    name: 'Taller Autorizado GWM San Lorenzo',
    brandId: 'gwm',
    type: 'autorizado',
    address: 'Ruta 2 km 12',
    city: 'San Lorenzo',
    phone: '021-345678',
    latitude: -25.3392,
    longitude: -57.5167,
  },
  {
    id: 'w4',
    name: 'Taller Oficial JAC Luque',
    brandId: 'jac',
    type: 'oficial',
    address: 'Av. Las Residentas 890',
    city: 'Luque',
    phone: '021-456789',
    latitude: -25.2659,
    longitude: -57.4864,
  },
  {
    id: 'w5',
    name: 'Taller Autorizado Leapmotor',
    brandId: 'leapmotor',
    type: 'autorizado',
    address: 'Av. Aviadores del Chaco 2345',
    city: 'Asunción',
    phone: '021-567890',
    latitude: -25.2789,
    longitude: -57.6612,
  },
  {
    id: 'w6',
    name: 'Taller Oficial DFSK Fernando de la Mora',
    brandId: 'dfsk',
    type: 'oficial',
    address: 'Ruta 1 km 5',
    city: 'Fernando de la Mora',
    phone: '021-678901',
    latitude: -25.3456,
    longitude: -57.6089,
  },
];

export interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
  brandId?: string;
}

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Nueva oferta Jetour Dashing',
    body: 'Aprovecha el bono especial de USD 500 en el Jetour Dashing por tiempo limitado.',
    date: '2026-03-27',
    read: false,
    brandId: 'jetour',
  },
  {
    id: '2',
    title: 'Lanzamiento GWM Haval H6 2026',
    body: 'El nuevo Haval H6 2026 ya está disponible. Agenda tu test drive ahora.',
    date: '2026-03-25',
    read: false,
    brandId: 'gwm',
  },
  {
    id: '3',
    title: 'Servicio técnico programado',
    body: 'Recuerda que tu vehículo tiene un servicio técnico pendiente. Agenda tu cita.',
    date: '2026-03-20',
    read: true,
  },
  {
    id: '4',
    title: 'Promoción Renault marzo',
    body: 'Cuotas desde USD 180 en toda la gama Renault durante marzo 2026.',
    date: '2026-03-15',
    read: true,
    brandId: 'renault',
  },
  {
    id: '5',
    title: 'Taller oficial JAC habilitado',
    body: 'Nuevo taller oficial JAC habilitado en Asunción. Servicio con repuestos originales.',
    date: '2026-03-10',
    read: true,
    brandId: 'jac',
  },
];

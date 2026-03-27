export interface MaintenanceItem {
  km: number;
  priceGs: number;
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  isNew: boolean;
  priceContado: number;
  priceCuota: number;
  versions: string[];
  plans: string[];
  maintenance: MaintenanceItem[];
}

export interface Brand {
  id: string;
  name: string;
  logoType: 'renault' | 'jetour' | 'gwm' | 'se_paraguay' | 'jac' | 'leapmotor' | 'dfsk' | 'byd';
  darkBackground: boolean;
  tagline?: string;
  vehicles: Vehicle[];
}

export const brands: Brand[] = [
  {
    id: 'renault',
    name: 'Renault',
    logoType: 'renault',
    darkBackground: false,
    vehicles: [
      {
        id: 'renault_kwid',
        name: 'Kwid',
        category: 'HATCHBACK',
        isNew: true,
        priceContado: 12990,
        priceCuota: 180,
        versions: ['OUTSIDER - MECÁNICO', 'ZEN - MECÁNICO'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 450000 },
          { km: 10000, priceGs: 680000 },
          { km: 15000, priceGs: 450000 },
          { km: 20000, priceGs: 950000 },
        ],
      },
      {
        id: 'renault_duster',
        name: 'Duster',
        category: 'SUV',
        isNew: true,
        priceContado: 21990,
        priceCuota: 290,
        versions: ['INTENS - CVT', 'ZEN - MECÁNICO'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 520000 },
          { km: 10000, priceGs: 780000 },
          { km: 15000, priceGs: 520000 },
          { km: 20000, priceGs: 1100000 },
        ],
      },
      {
        id: 'renault_stepway',
        name: 'Stepway',
        category: 'HATCHBACK',
        isNew: false,
        priceContado: 15990,
        priceCuota: 210,
        versions: ['INTENS', 'ZEN'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 460000 },
          { km: 10000, priceGs: 700000 },
          { km: 15000, priceGs: 460000 },
          { km: 20000, priceGs: 980000 },
        ],
      },
    ],
  },
  {
    id: 'jetour',
    name: 'Jetour',
    logoType: 'jetour',
    darkBackground: false,
    tagline: 'Drive Your Future',
    vehicles: [
      {
        id: 'jetour_dashing',
        name: 'Dashing',
        category: 'SUV',
        isNew: true,
        priceContado: 25990,
        priceCuota: 350,
        versions: ['LUXURY', 'PREMIUM'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 580000 },
          { km: 10000, priceGs: 850000 },
          { km: 15000, priceGs: 580000 },
        ],
      },
      {
        id: 'jetour_x70',
        name: 'X70',
        category: 'SUV',
        isNew: false,
        priceContado: 19990,
        priceCuota: 260,
        versions: ['COMFORT', 'LUXURY'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 540000 },
          { km: 10000, priceGs: 800000 },
          { km: 15000, priceGs: 540000 },
        ],
      },
      {
        id: 'jetour_x70plus',
        name: 'X70 Plus',
        category: 'SUV',
        isNew: true,
        priceContado: 24990,
        priceCuota: 320,
        versions: ['LUXURY', 'PREMIUM'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 560000 },
          { km: 10000, priceGs: 820000 },
          { km: 15000, priceGs: 560000 },
        ],
      },
      {
        id: 'jetour_x90plus',
        name: 'X90 Plus',
        category: 'SUV',
        isNew: true,
        priceContado: 32990,
        priceCuota: 450,
        versions: ['LUXURY 7P', 'PREMIUM 7P'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 620000 },
          { km: 10000, priceGs: 920000 },
          { km: 15000, priceGs: 620000 },
        ],
      },
    ],
  },
  {
    id: 'gwm',
    name: 'GWM',
    logoType: 'gwm',
    darkBackground: false,
    vehicles: [
      {
        id: 'gwm_haval_h6',
        name: 'Haval H6',
        category: 'SUV',
        isNew: true,
        priceContado: 28990,
        priceCuota: 390,
        versions: ['ELITE', 'ULTRA'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 600000 },
          { km: 10000, priceGs: 900000 },
          { km: 15000, priceGs: 600000 },
        ],
      },
      {
        id: 'gwm_haval_jolion',
        name: 'Haval Jolion',
        category: 'SUV',
        isNew: false,
        priceContado: 22990,
        priceCuota: 310,
        versions: ['ELITE', 'PREMIUM'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 550000 },
          { km: 10000, priceGs: 820000 },
          { km: 15000, priceGs: 550000 },
        ],
      },
    ],
  },
  {
    id: 'se_paraguay',
    name: 'SE Paraguay',
    logoType: 'se_paraguay',
    darkBackground: false,
    vehicles: [
      {
        id: 'se_emgrand',
        name: 'Emgrand',
        category: 'SEDAN',
        isNew: true,
        priceContado: 18990,
        priceCuota: 250,
        versions: ['COMFORT', 'PREMIUM'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 480000 },
          { km: 10000, priceGs: 720000 },
          { km: 15000, priceGs: 480000 },
        ],
      },
    ],
  },
  {
    id: 'jac',
    name: 'JAC',
    logoType: 'jac',
    darkBackground: true,
    vehicles: [
      {
        id: 'jac_js4',
        name: 'JS4',
        category: 'SUV',
        isNew: true,
        priceContado: 21990,
        priceCuota: 290,
        versions: ['COMFORT', 'LUXURY'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 520000 },
          { km: 10000, priceGs: 780000 },
          { km: 15000, priceGs: 520000 },
        ],
      },
      {
        id: 'jac_js6',
        name: 'JS6',
        category: 'SUV',
        isNew: true,
        priceContado: 26990,
        priceCuota: 360,
        versions: ['LUXURY', 'ELITE'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 570000 },
          { km: 10000, priceGs: 840000 },
          { km: 15000, priceGs: 570000 },
        ],
      },
    ],
  },
  {
    id: 'leapmotor',
    name: 'Leapmotor',
    logoType: 'leapmotor',
    darkBackground: true,
    vehicles: [
      {
        id: 'leapmotor_c10',
        name: 'C10',
        category: 'SUV ELÉCTRICO',
        isNew: true,
        priceContado: 35990,
        priceCuota: 490,
        versions: ['STANDARD', 'LONG RANGE'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 10000, priceGs: 350000 },
          { km: 20000, priceGs: 520000 },
          { km: 30000, priceGs: 350000 },
        ],
      },
    ],
  },
  {
    id: 'dfsk',
    name: 'DFSK',
    logoType: 'dfsk',
    darkBackground: false,
    vehicles: [
      {
        id: 'dfsk_glory500',
        name: 'Glory 500',
        category: 'SUV',
        isNew: false,
        priceContado: 17990,
        priceCuota: 240,
        versions: ['COMFORT', 'LUXURY'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas'],
        maintenance: [
          { km: 5000, priceGs: 460000 },
          { km: 10000, priceGs: 690000 },
          { km: 15000, priceGs: 460000 },
        ],
      },
    ],
  },
  {
    id: 'byd',
    name: 'BYD',
    logoType: 'byd',
    darkBackground: true,
    vehicles: [
      {
        id: 'byd_atto3',
        name: 'Atto 3',
        category: 'SUV ELÉCTRICO',
        isNew: true,
        priceContado: 38990,
        priceCuota: 530,
        versions: ['STANDARD', 'EXTENDED RANGE'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas', 'Plan 60 cuotas'],
        maintenance: [
          { km: 10000, priceGs: 320000 },
          { km: 20000, priceGs: 490000 },
          { km: 30000, priceGs: 320000 },
        ],
      },
      {
        id: 'byd_dolphin',
        name: 'Dolphin',
        category: 'HATCHBACK ELÉCTRICO',
        isNew: true,
        priceContado: 29990,
        priceCuota: 410,
        versions: ['COMFORT', 'DESIGN'],
        plans: ['Plan 36 cuotas', 'Plan 48 cuotas'],
        maintenance: [
          { km: 10000, priceGs: 290000 },
          { km: 20000, priceGs: 450000 },
          { km: 30000, priceGs: 290000 },
        ],
      },
    ],
  },
];

export const brandNames = brands.map((b) => b.name);

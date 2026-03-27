export type RootDrawerParamList = {
  MainTabs: undefined;
  Urgencias: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  PostventaTab: undefined;
  NotificacionesTab: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  BrandDetail: { brandId: string };
  VehicleDetail: { brandId: string; vehicleId: string };
};

export type PostventaStackParamList = {
  PostventaMain: undefined;
  Agendamiento: undefined;
  Talleres: undefined;
  Tarifario: undefined;
};

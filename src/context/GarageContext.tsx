import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Platform } from 'react-native';

export type VehicleStatus = 'ACTIVE' | 'CHARGING' | 'IDLE' | 'OFFLINE' | 'PENDING';
export type PaymentType = 'DIGITAL' | 'CASH';

export interface Vehicle {
  id: string;
  garageId: string;
  model: string;
  driverId: string | null;
  status: VehicleStatus;
  paymentType: PaymentType;
  battery: number;
  revenue: number | null;
  dailyRent: number | null;
  paymentStatus: 'PAID' | 'UNPAID' | null;
  location: { top: string; left: string };
  speed: number;
  todayKm: number;
}

export interface Driver {
  id: string;
  garageId: string;
  name: string;
  phone: string;
  nid: string;
  assignedVehicleId: string | null;
  avatar: string | null;
  image: string | null;
  status: 'ASSIGNED' | 'UNASSIGNED';
}

export interface Garage {
  id: string;
  name: string;
}

export const GARAGES: Garage[] = [
  { id: 'G-MIR', name: 'Mirpur Garage' },
  { id: 'G-UTT', name: 'Uttara Garage' },
  { id: 'G-DHA', name: 'Dhanmondi Garage' },
  { id: 'G-MOT', name: 'Motijheel Garage' },
];

interface GarageContextData {
  allVehicles: Vehicle[];
  allDrivers: Driver[];
  vehicles: Vehicle[];
  drivers: Driver[];
  currentGarageId: string | null;
  currentGarage: Garage | null;
  setCurrentGarageId: (id: string) => void;
  assignDriver: (vehicleId: string, driverId: string) => void;
  unassignDriver: (vehicleId: string) => void;
  isLoading: boolean;
}

const INITIAL_DRIVERS: Driver[] = [
  {
    "id": "D-001",
    "name": "Rahman Ali",
    "phone": "+880 1711-223344",
    "nid": "1234567890123",
    "assignedVehicleId": "VH-001",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-002",
    "name": "Karim Uddin",
    "phone": "+880 1712-345678",
    "nid": "1234567890124",
    "assignedVehicleId": "VH-002",
    "avatar": null,
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA_Afnx3bCijJVZeqK7ljp7tWCnHNxowHSewSy_e5SOCNpqCMlDGnmS8KVSIYLtwMe9VOGYmk5Gm2UI3lbzWtGu6B8M_Ey3CmWHWHOBjIaL9jMIpYTUIpC7oyHCkNgzVA5xtEUEiC9zEFoI7HctUWdIg_qZKdYlffFB8T1zvpjSJCnYU3cLwk_YJLuba7rE_e4-H91ouNxDAxBSU0MxktKSi17vUXY9buNtBNqUWQxn0LkY6q-eAfA5VudbT4LB-0z0yG9mitfRfZ0k",
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-003",
    "name": "Hossain Mia",
    "phone": "+880 1713-456789",
    "nid": "1234567890125",
    "assignedVehicleId": null,
    "avatar": null,
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-004",
    "name": "Jamal Khan",
    "phone": "+880 1714-567890",
    "nid": "1234567890126",
    "assignedVehicleId": "VH-004",
    "avatar": "J",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-005",
    "name": "Tareq",
    "phone": "+880 1715-678901",
    "nid": "1234567890127",
    "assignedVehicleId": "VH-005",
    "avatar": "T",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-006",
    "name": "Mizanur",
    "phone": "+880 1716-789012",
    "nid": "1234567890128",
    "assignedVehicleId": null,
    "avatar": "M",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-007",
    "name": "Shafiq",
    "phone": "+880 1717-890123",
    "nid": "1234567890129",
    "assignedVehicleId": "VH-007",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-008",
    "name": "Kamal",
    "phone": "+880 1718-901234",
    "nid": "1234567890130",
    "assignedVehicleId": "VH-008",
    "avatar": "K",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-009",
    "name": "Faruk",
    "phone": "+880 1719-012345",
    "nid": "1234567890131",
    "assignedVehicleId": "VH-009",
    "avatar": "F",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-010",
    "name": "Raju",
    "phone": "+880 1720-123456",
    "nid": "1234567890132",
    "assignedVehicleId": "VH-010",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-011",
    "name": "Selim",
    "phone": "+880 1721-234567",
    "nid": "1234567890133",
    "assignedVehicleId": null,
    "avatar": "S",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-012",
    "name": "Mamun",
    "phone": "+880 1722-345678",
    "nid": "1234567890134",
    "assignedVehicleId": "VH-012",
    "avatar": "M",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-013",
    "name": "Sujon",
    "phone": "+880 1723-456789",
    "nid": "1234567890135",
    "assignedVehicleId": "VH-013",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-014",
    "name": "Liton",
    "phone": "+880 1724-567890",
    "nid": "1234567890136",
    "assignedVehicleId": "VH-014",
    "avatar": "L",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-015",
    "name": "Babul",
    "phone": "+880 1725-678901",
    "nid": "1234567890137",
    "assignedVehicleId": "VH-015",
    "avatar": "B",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MIR"
  },
  {
    "id": "D-G-UTT-1",
    "name": "Mizanur",
    "phone": "+880 1716-789012",
    "nid": "1234567890128",
    "assignedVehicleId": null,
    "avatar": "M",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-2",
    "name": "Shafiq",
    "phone": "+880 1717-890123",
    "nid": "1234567890129",
    "assignedVehicleId": "VH-G-UTT-2",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-3",
    "name": "Kamal",
    "phone": "+880 1718-901234",
    "nid": "1234567890130",
    "assignedVehicleId": "VH-G-UTT-3",
    "avatar": "K",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-4",
    "name": "Faruk",
    "phone": "+880 1719-012345",
    "nid": "1234567890131",
    "assignedVehicleId": "VH-G-UTT-4",
    "avatar": "F",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-5",
    "name": "Raju",
    "phone": "+880 1720-123456",
    "nid": "1234567890132",
    "assignedVehicleId": "VH-G-UTT-5",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-6",
    "name": "Selim",
    "phone": "+880 1721-234567",
    "nid": "1234567890133",
    "assignedVehicleId": null,
    "avatar": "S",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-7",
    "name": "Mamun",
    "phone": "+880 1722-345678",
    "nid": "1234567890134",
    "assignedVehicleId": "VH-G-UTT-7",
    "avatar": "M",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-8",
    "name": "Sujon",
    "phone": "+880 1723-456789",
    "nid": "1234567890135",
    "assignedVehicleId": "VH-G-UTT-8",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-9",
    "name": "Liton",
    "phone": "+880 1724-567890",
    "nid": "1234567890136",
    "assignedVehicleId": "VH-G-UTT-9",
    "avatar": "L",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-10",
    "name": "Babul",
    "phone": "+880 1725-678901",
    "nid": "1234567890137",
    "assignedVehicleId": "VH-G-UTT-10",
    "avatar": "B",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-11",
    "name": "Rahman Ali",
    "phone": "+880 1711-223344",
    "nid": "1234567890123",
    "assignedVehicleId": "VH-G-UTT-11",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-12",
    "name": "Karim Uddin",
    "phone": "+880 1712-345678",
    "nid": "1234567890124",
    "assignedVehicleId": "VH-G-UTT-12",
    "avatar": null,
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA_Afnx3bCijJVZeqK7ljp7tWCnHNxowHSewSy_e5SOCNpqCMlDGnmS8KVSIYLtwMe9VOGYmk5Gm2UI3lbzWtGu6B8M_Ey3CmWHWHOBjIaL9jMIpYTUIpC7oyHCkNgzVA5xtEUEiC9zEFoI7HctUWdIg_qZKdYlffFB8T1zvpjSJCnYU3cLwk_YJLuba7rE_e4-H91ouNxDAxBSU0MxktKSi17vUXY9buNtBNqUWQxn0LkY6q-eAfA5VudbT4LB-0z0yG9mitfRfZ0k",
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-13",
    "name": "Hossain Mia",
    "phone": "+880 1713-456789",
    "nid": "1234567890125",
    "assignedVehicleId": null,
    "avatar": null,
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-14",
    "name": "Jamal Khan",
    "phone": "+880 1714-567890",
    "nid": "1234567890126",
    "assignedVehicleId": "VH-G-UTT-14",
    "avatar": "J",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-15",
    "name": "Tareq",
    "phone": "+880 1715-678901",
    "nid": "1234567890127",
    "assignedVehicleId": "VH-G-UTT-15",
    "avatar": "T",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-16",
    "name": "Mizanur",
    "phone": "+880 1716-789012",
    "nid": "1234567890128",
    "assignedVehicleId": null,
    "avatar": "M",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-17",
    "name": "Shafiq",
    "phone": "+880 1717-890123",
    "nid": "1234567890129",
    "assignedVehicleId": "VH-G-UTT-17",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-18",
    "name": "Kamal",
    "phone": "+880 1718-901234",
    "nid": "1234567890130",
    "assignedVehicleId": "VH-G-UTT-18",
    "avatar": "K",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-19",
    "name": "Faruk",
    "phone": "+880 1719-012345",
    "nid": "1234567890131",
    "assignedVehicleId": "VH-G-UTT-19",
    "avatar": "F",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-20",
    "name": "Raju",
    "phone": "+880 1720-123456",
    "nid": "1234567890132",
    "assignedVehicleId": "VH-G-UTT-20",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-21",
    "name": "Selim",
    "phone": "+880 1721-234567",
    "nid": "1234567890133",
    "assignedVehicleId": null,
    "avatar": "S",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-22",
    "name": "Mamun",
    "phone": "+880 1722-345678",
    "nid": "1234567890134",
    "assignedVehicleId": "VH-G-UTT-22",
    "avatar": "M",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-23",
    "name": "Sujon",
    "phone": "+880 1723-456789",
    "nid": "1234567890135",
    "assignedVehicleId": "VH-G-UTT-23",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-UTT-24",
    "name": "Liton",
    "phone": "+880 1724-567890",
    "nid": "1234567890136",
    "assignedVehicleId": "VH-G-UTT-24",
    "avatar": "L",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-UTT"
  },
  {
    "id": "D-G-DHA-1",
    "name": "Selim",
    "phone": "+880 1721-234567",
    "nid": "1234567890133",
    "assignedVehicleId": null,
    "avatar": "S",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-2",
    "name": "Mamun",
    "phone": "+880 1722-345678",
    "nid": "1234567890134",
    "assignedVehicleId": "VH-G-DHA-2",
    "avatar": "M",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-3",
    "name": "Sujon",
    "phone": "+880 1723-456789",
    "nid": "1234567890135",
    "assignedVehicleId": "VH-G-DHA-3",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-4",
    "name": "Liton",
    "phone": "+880 1724-567890",
    "nid": "1234567890136",
    "assignedVehicleId": "VH-G-DHA-4",
    "avatar": "L",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-5",
    "name": "Babul",
    "phone": "+880 1725-678901",
    "nid": "1234567890137",
    "assignedVehicleId": "VH-G-DHA-5",
    "avatar": "B",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-6",
    "name": "Rahman Ali",
    "phone": "+880 1711-223344",
    "nid": "1234567890123",
    "assignedVehicleId": "VH-G-DHA-6",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-7",
    "name": "Karim Uddin",
    "phone": "+880 1712-345678",
    "nid": "1234567890124",
    "assignedVehicleId": "VH-G-DHA-7",
    "avatar": null,
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA_Afnx3bCijJVZeqK7ljp7tWCnHNxowHSewSy_e5SOCNpqCMlDGnmS8KVSIYLtwMe9VOGYmk5Gm2UI3lbzWtGu6B8M_Ey3CmWHWHOBjIaL9jMIpYTUIpC7oyHCkNgzVA5xtEUEiC9zEFoI7HctUWdIg_qZKdYlffFB8T1zvpjSJCnYU3cLwk_YJLuba7rE_e4-H91ouNxDAxBSU0MxktKSi17vUXY9buNtBNqUWQxn0LkY6q-eAfA5VudbT4LB-0z0yG9mitfRfZ0k",
    "status": "ASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-8",
    "name": "Hossain Mia",
    "phone": "+880 1713-456789",
    "nid": "1234567890125",
    "assignedVehicleId": null,
    "avatar": null,
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-9",
    "name": "Jamal Khan",
    "phone": "+880 1714-567890",
    "nid": "1234567890126",
    "assignedVehicleId": "VH-G-DHA-9",
    "avatar": "J",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-10",
    "name": "Tareq",
    "phone": "+880 1715-678901",
    "nid": "1234567890127",
    "assignedVehicleId": "VH-G-DHA-10",
    "avatar": "T",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-11",
    "name": "Mizanur",
    "phone": "+880 1716-789012",
    "nid": "1234567890128",
    "assignedVehicleId": null,
    "avatar": "M",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-DHA-12",
    "name": "Shafiq",
    "phone": "+880 1717-890123",
    "nid": "1234567890129",
    "assignedVehicleId": "VH-G-DHA-12",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-DHA"
  },
  {
    "id": "D-G-MOT-1",
    "name": "Jamal Khan",
    "phone": "+880 1714-567890",
    "nid": "1234567890126",
    "assignedVehicleId": "VH-G-MOT-1",
    "avatar": "J",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-2",
    "name": "Tareq",
    "phone": "+880 1715-678901",
    "nid": "1234567890127",
    "assignedVehicleId": "VH-G-MOT-2",
    "avatar": "T",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-3",
    "name": "Mizanur",
    "phone": "+880 1716-789012",
    "nid": "1234567890128",
    "assignedVehicleId": null,
    "avatar": "M",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-4",
    "name": "Shafiq",
    "phone": "+880 1717-890123",
    "nid": "1234567890129",
    "assignedVehicleId": "VH-G-MOT-4",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-5",
    "name": "Kamal",
    "phone": "+880 1718-901234",
    "nid": "1234567890130",
    "assignedVehicleId": "VH-G-MOT-5",
    "avatar": "K",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-6",
    "name": "Faruk",
    "phone": "+880 1719-012345",
    "nid": "1234567890131",
    "assignedVehicleId": "VH-G-MOT-6",
    "avatar": "F",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-7",
    "name": "Raju",
    "phone": "+880 1720-123456",
    "nid": "1234567890132",
    "assignedVehicleId": "VH-G-MOT-7",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-8",
    "name": "Selim",
    "phone": "+880 1721-234567",
    "nid": "1234567890133",
    "assignedVehicleId": null,
    "avatar": "S",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-9",
    "name": "Mamun",
    "phone": "+880 1722-345678",
    "nid": "1234567890134",
    "assignedVehicleId": "VH-G-MOT-9",
    "avatar": "M",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-10",
    "name": "Sujon",
    "phone": "+880 1723-456789",
    "nid": "1234567890135",
    "assignedVehicleId": "VH-G-MOT-10",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-11",
    "name": "Liton",
    "phone": "+880 1724-567890",
    "nid": "1234567890136",
    "assignedVehicleId": "VH-G-MOT-11",
    "avatar": "L",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-12",
    "name": "Babul",
    "phone": "+880 1725-678901",
    "nid": "1234567890137",
    "assignedVehicleId": "VH-G-MOT-12",
    "avatar": "B",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-13",
    "name": "Rahman Ali",
    "phone": "+880 1711-223344",
    "nid": "1234567890123",
    "assignedVehicleId": "VH-G-MOT-13",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-14",
    "name": "Karim Uddin",
    "phone": "+880 1712-345678",
    "nid": "1234567890124",
    "assignedVehicleId": "VH-G-MOT-14",
    "avatar": null,
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA_Afnx3bCijJVZeqK7ljp7tWCnHNxowHSewSy_e5SOCNpqCMlDGnmS8KVSIYLtwMe9VOGYmk5Gm2UI3lbzWtGu6B8M_Ey3CmWHWHOBjIaL9jMIpYTUIpC7oyHCkNgzVA5xtEUEiC9zEFoI7HctUWdIg_qZKdYlffFB8T1zvpjSJCnYU3cLwk_YJLuba7rE_e4-H91ouNxDAxBSU0MxktKSi17vUXY9buNtBNqUWQxn0LkY6q-eAfA5VudbT4LB-0z0yG9mitfRfZ0k",
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-15",
    "name": "Hossain Mia",
    "phone": "+880 1713-456789",
    "nid": "1234567890125",
    "assignedVehicleId": null,
    "avatar": null,
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-16",
    "name": "Jamal Khan",
    "phone": "+880 1714-567890",
    "nid": "1234567890126",
    "assignedVehicleId": "VH-G-MOT-16",
    "avatar": "J",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-17",
    "name": "Tareq",
    "phone": "+880 1715-678901",
    "nid": "1234567890127",
    "assignedVehicleId": "VH-G-MOT-17",
    "avatar": "T",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-18",
    "name": "Mizanur",
    "phone": "+880 1716-789012",
    "nid": "1234567890128",
    "assignedVehicleId": null,
    "avatar": "M",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-19",
    "name": "Shafiq",
    "phone": "+880 1717-890123",
    "nid": "1234567890129",
    "assignedVehicleId": "VH-G-MOT-19",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-20",
    "name": "Kamal",
    "phone": "+880 1718-901234",
    "nid": "1234567890130",
    "assignedVehicleId": "VH-G-MOT-20",
    "avatar": "K",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-21",
    "name": "Faruk",
    "phone": "+880 1719-012345",
    "nid": "1234567890131",
    "assignedVehicleId": "VH-G-MOT-21",
    "avatar": "F",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-22",
    "name": "Raju",
    "phone": "+880 1720-123456",
    "nid": "1234567890132",
    "assignedVehicleId": "VH-G-MOT-22",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-23",
    "name": "Selim",
    "phone": "+880 1721-234567",
    "nid": "1234567890133",
    "assignedVehicleId": null,
    "avatar": "S",
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-24",
    "name": "Mamun",
    "phone": "+880 1722-345678",
    "nid": "1234567890134",
    "assignedVehicleId": "VH-G-MOT-24",
    "avatar": "M",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-25",
    "name": "Sujon",
    "phone": "+880 1723-456789",
    "nid": "1234567890135",
    "assignedVehicleId": "VH-G-MOT-25",
    "avatar": "S",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-26",
    "name": "Liton",
    "phone": "+880 1724-567890",
    "nid": "1234567890136",
    "assignedVehicleId": "VH-G-MOT-26",
    "avatar": "L",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-27",
    "name": "Babul",
    "phone": "+880 1725-678901",
    "nid": "1234567890137",
    "assignedVehicleId": "VH-G-MOT-27",
    "avatar": "B",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-28",
    "name": "Rahman Ali",
    "phone": "+880 1711-223344",
    "nid": "1234567890123",
    "assignedVehicleId": "VH-G-MOT-28",
    "avatar": "R",
    "image": null,
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-29",
    "name": "Karim Uddin",
    "phone": "+880 1712-345678",
    "nid": "1234567890124",
    "assignedVehicleId": "VH-G-MOT-29",
    "avatar": null,
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA_Afnx3bCijJVZeqK7ljp7tWCnHNxowHSewSy_e5SOCNpqCMlDGnmS8KVSIYLtwMe9VOGYmk5Gm2UI3lbzWtGu6B8M_Ey3CmWHWHOBjIaL9jMIpYTUIpC7oyHCkNgzVA5xtEUEiC9zEFoI7HctUWdIg_qZKdYlffFB8T1zvpjSJCnYU3cLwk_YJLuba7rE_e4-H91ouNxDAxBSU0MxktKSi17vUXY9buNtBNqUWQxn0LkY6q-eAfA5VudbT4LB-0z0yG9mitfRfZ0k",
    "status": "ASSIGNED",
    "garageId": "G-MOT"
  },
  {
    "id": "D-G-MOT-30",
    "name": "Hossain Mia",
    "phone": "+880 1713-456789",
    "nid": "1234567890125",
    "assignedVehicleId": null,
    "avatar": null,
    "image": null,
    "status": "UNASSIGNED",
    "garageId": "G-MOT"
  }
];

const INITIAL_VEHICLES: Vehicle[] = [
  {
    "id": "VH-001",
    "model": "ZenGo Alfa",
    "driverId": "D-001",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 82,
    "revenue": 670,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "30%",
      "left": "40%"
    },
    "speed": 42,
    "todayKm": 67,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-002",
    "model": "ZenGo Alfa",
    "driverId": "D-002",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 24,
    "revenue": 350,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "32%",
      "left": "42%"
    },
    "speed": 0,
    "todayKm": 80,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-003",
    "model": "Kargo Alfa",
    "driverId": null,
    "status": "IDLE",
    "paymentType": "CASH",
    "battery": 12,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "28%",
      "left": "45%"
    },
    "speed": 0,
    "todayKm": 12,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-004",
    "model": "Kargo Alfa",
    "driverId": "D-004",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 45,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "50%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 110,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-005",
    "model": "ZenGo Pro",
    "driverId": "D-005",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 88,
    "revenue": 120,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "65%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 15,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-006",
    "model": "ZenGo Pro",
    "driverId": null,
    "status": "OFFLINE",
    "paymentType": "CASH",
    "battery": 0,
    "revenue": null,
    "dailyRent": 450,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "20%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-007",
    "model": "ZenGo Alfa",
    "driverId": "D-007",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 65,
    "revenue": 450,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "40%",
      "left": "20%"
    },
    "speed": 30,
    "todayKm": 45,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-008",
    "model": "ZenGo Alfa",
    "driverId": "D-008",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 50,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "45%",
      "left": "60%"
    },
    "speed": 35,
    "todayKm": 55,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-009",
    "model": "Kargo Pro",
    "driverId": "D-009",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 15,
    "revenue": 800,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "10%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 120,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-010",
    "model": "ZenGo Alfa",
    "driverId": "D-010",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 70,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "55%",
      "left": "40%"
    },
    "speed": 25,
    "todayKm": 30,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-011",
    "model": "ZenGo Alfa",
    "driverId": null,
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 100,
    "revenue": 0,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "60%",
      "left": "50%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-012",
    "model": "Kargo Alfa",
    "driverId": "D-012",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 60,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "70%",
      "left": "25%"
    },
    "speed": 40,
    "todayKm": 90,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-013",
    "model": "ZenGo Pro",
    "driverId": "D-013",
    "status": "OFFLINE",
    "paymentType": "DIGITAL",
    "battery": 5,
    "revenue": 150,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "80%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 25,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-014",
    "model": "ZenGo Alfa",
    "driverId": "D-014",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 90,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "35%",
      "left": "65%"
    },
    "speed": 50,
    "todayKm": 15,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-015",
    "model": "Kargo Pro",
    "driverId": "D-015",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 75,
    "revenue": 550,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "25%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 70,
    "garageId": "G-MIR"
  },
  {
    "id": "VH-G-UTT-1",
    "model": "Kargo Alfa",
    "driverId": null,
    "status": "IDLE",
    "paymentType": "CASH",
    "battery": 12,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "28%",
      "left": "45%"
    },
    "speed": 0,
    "todayKm": 12,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-2",
    "model": "Kargo Alfa",
    "driverId": "D-G-UTT-2",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 45,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "50%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 110,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-3",
    "model": "ZenGo Pro",
    "driverId": "D-G-UTT-3",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 88,
    "revenue": 120,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "65%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 15,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-4",
    "model": "ZenGo Pro",
    "driverId": "D-G-UTT-4",
    "status": "OFFLINE",
    "paymentType": "CASH",
    "battery": 0,
    "revenue": null,
    "dailyRent": 450,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "20%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-5",
    "model": "ZenGo Alfa",
    "driverId": "D-G-UTT-5",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 65,
    "revenue": 450,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "40%",
      "left": "20%"
    },
    "speed": 30,
    "todayKm": 45,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-6",
    "model": "ZenGo Alfa",
    "driverId": null,
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 50,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "45%",
      "left": "60%"
    },
    "speed": 35,
    "todayKm": 55,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-7",
    "model": "Kargo Pro",
    "driverId": "D-G-UTT-7",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 15,
    "revenue": 800,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "10%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 120,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-8",
    "model": "ZenGo Alfa",
    "driverId": "D-G-UTT-8",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 70,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "55%",
      "left": "40%"
    },
    "speed": 25,
    "todayKm": 30,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-9",
    "model": "ZenGo Alfa",
    "driverId": "D-G-UTT-9",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 100,
    "revenue": 0,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "60%",
      "left": "50%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-10",
    "model": "Kargo Alfa",
    "driverId": "D-G-UTT-10",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 60,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "70%",
      "left": "25%"
    },
    "speed": 40,
    "todayKm": 90,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-11",
    "model": "ZenGo Pro",
    "driverId": "D-G-UTT-11",
    "status": "OFFLINE",
    "paymentType": "DIGITAL",
    "battery": 5,
    "revenue": 150,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "80%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 25,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-12",
    "model": "ZenGo Alfa",
    "driverId": "D-G-UTT-12",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 90,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "35%",
      "left": "65%"
    },
    "speed": 50,
    "todayKm": 15,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-13",
    "model": "Kargo Pro",
    "driverId": null,
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 75,
    "revenue": 550,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "25%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 70,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-14",
    "model": "ZenGo Alfa",
    "driverId": "D-G-UTT-14",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 82,
    "revenue": 670,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "30%",
      "left": "40%"
    },
    "speed": 42,
    "todayKm": 67,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-15",
    "model": "ZenGo Alfa",
    "driverId": "D-G-UTT-15",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 24,
    "revenue": 350,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "32%",
      "left": "42%"
    },
    "speed": 0,
    "todayKm": 80,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-16",
    "model": "Kargo Alfa",
    "driverId": null,
    "status": "IDLE",
    "paymentType": "CASH",
    "battery": 12,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "28%",
      "left": "45%"
    },
    "speed": 0,
    "todayKm": 12,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-17",
    "model": "Kargo Alfa",
    "driverId": "D-G-UTT-17",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 45,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "50%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 110,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-18",
    "model": "ZenGo Pro",
    "driverId": "D-G-UTT-18",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 88,
    "revenue": 120,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "65%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 15,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-19",
    "model": "ZenGo Pro",
    "driverId": "D-G-UTT-19",
    "status": "OFFLINE",
    "paymentType": "CASH",
    "battery": 0,
    "revenue": null,
    "dailyRent": 450,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "20%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-20",
    "model": "ZenGo Alfa",
    "driverId": "D-G-UTT-20",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 65,
    "revenue": 450,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "40%",
      "left": "20%"
    },
    "speed": 30,
    "todayKm": 45,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-21",
    "model": "ZenGo Alfa",
    "driverId": null,
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 50,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "45%",
      "left": "60%"
    },
    "speed": 35,
    "todayKm": 55,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-22",
    "model": "Kargo Pro",
    "driverId": "D-G-UTT-22",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 15,
    "revenue": 800,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "10%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 120,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-23",
    "model": "ZenGo Alfa",
    "driverId": "D-G-UTT-23",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 70,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "55%",
      "left": "40%"
    },
    "speed": 25,
    "todayKm": 30,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-UTT-24",
    "model": "ZenGo Alfa",
    "driverId": "D-G-UTT-24",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 100,
    "revenue": 0,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "60%",
      "left": "50%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-UTT"
  },
  {
    "id": "VH-G-DHA-1",
    "model": "ZenGo Alfa",
    "driverId": null,
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 50,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "45%",
      "left": "60%"
    },
    "speed": 35,
    "todayKm": 55,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-2",
    "model": "Kargo Pro",
    "driverId": "D-G-DHA-2",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 15,
    "revenue": 800,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "10%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 120,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-3",
    "model": "ZenGo Alfa",
    "driverId": "D-G-DHA-3",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 70,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "55%",
      "left": "40%"
    },
    "speed": 25,
    "todayKm": 30,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-4",
    "model": "ZenGo Alfa",
    "driverId": "D-G-DHA-4",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 100,
    "revenue": 0,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "60%",
      "left": "50%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-5",
    "model": "Kargo Alfa",
    "driverId": "D-G-DHA-5",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 60,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "70%",
      "left": "25%"
    },
    "speed": 40,
    "todayKm": 90,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-6",
    "model": "ZenGo Pro",
    "driverId": "D-G-DHA-6",
    "status": "OFFLINE",
    "paymentType": "DIGITAL",
    "battery": 5,
    "revenue": 150,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "80%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 25,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-7",
    "model": "ZenGo Alfa",
    "driverId": "D-G-DHA-7",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 90,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "35%",
      "left": "65%"
    },
    "speed": 50,
    "todayKm": 15,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-8",
    "model": "Kargo Pro",
    "driverId": null,
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 75,
    "revenue": 550,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "25%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 70,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-9",
    "model": "ZenGo Alfa",
    "driverId": "D-G-DHA-9",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 82,
    "revenue": 670,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "30%",
      "left": "40%"
    },
    "speed": 42,
    "todayKm": 67,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-10",
    "model": "ZenGo Alfa",
    "driverId": "D-G-DHA-10",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 24,
    "revenue": 350,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "32%",
      "left": "42%"
    },
    "speed": 0,
    "todayKm": 80,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-11",
    "model": "Kargo Alfa",
    "driverId": null,
    "status": "IDLE",
    "paymentType": "CASH",
    "battery": 12,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "28%",
      "left": "45%"
    },
    "speed": 0,
    "todayKm": 12,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-DHA-12",
    "model": "Kargo Alfa",
    "driverId": "D-G-DHA-12",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 45,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "50%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 110,
    "garageId": "G-DHA"
  },
  {
    "id": "VH-G-MOT-1",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-1",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 82,
    "revenue": 670,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "30%",
      "left": "40%"
    },
    "speed": 42,
    "todayKm": 67,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-2",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-2",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 24,
    "revenue": 350,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "32%",
      "left": "42%"
    },
    "speed": 0,
    "todayKm": 80,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-3",
    "model": "Kargo Alfa",
    "driverId": null,
    "status": "IDLE",
    "paymentType": "CASH",
    "battery": 12,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "28%",
      "left": "45%"
    },
    "speed": 0,
    "todayKm": 12,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-4",
    "model": "Kargo Alfa",
    "driverId": "D-G-MOT-4",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 45,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "50%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 110,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-5",
    "model": "ZenGo Pro",
    "driverId": "D-G-MOT-5",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 88,
    "revenue": 120,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "65%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 15,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-6",
    "model": "ZenGo Pro",
    "driverId": "D-G-MOT-6",
    "status": "OFFLINE",
    "paymentType": "CASH",
    "battery": 0,
    "revenue": null,
    "dailyRent": 450,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "20%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-7",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-7",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 65,
    "revenue": 450,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "40%",
      "left": "20%"
    },
    "speed": 30,
    "todayKm": 45,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-8",
    "model": "ZenGo Alfa",
    "driverId": null,
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 50,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "45%",
      "left": "60%"
    },
    "speed": 35,
    "todayKm": 55,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-9",
    "model": "Kargo Pro",
    "driverId": "D-G-MOT-9",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 15,
    "revenue": 800,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "10%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 120,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-10",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-10",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 70,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "55%",
      "left": "40%"
    },
    "speed": 25,
    "todayKm": 30,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-11",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-11",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 100,
    "revenue": 0,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "60%",
      "left": "50%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-12",
    "model": "Kargo Alfa",
    "driverId": "D-G-MOT-12",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 60,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "70%",
      "left": "25%"
    },
    "speed": 40,
    "todayKm": 90,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-13",
    "model": "ZenGo Pro",
    "driverId": "D-G-MOT-13",
    "status": "OFFLINE",
    "paymentType": "DIGITAL",
    "battery": 5,
    "revenue": 150,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "80%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 25,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-14",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-14",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 90,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "35%",
      "left": "65%"
    },
    "speed": 50,
    "todayKm": 15,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-15",
    "model": "Kargo Pro",
    "driverId": null,
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 75,
    "revenue": 550,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "25%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 70,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-16",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-16",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 82,
    "revenue": 670,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "30%",
      "left": "40%"
    },
    "speed": 42,
    "todayKm": 67,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-17",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-17",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 24,
    "revenue": 350,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "32%",
      "left": "42%"
    },
    "speed": 0,
    "todayKm": 80,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-18",
    "model": "Kargo Alfa",
    "driverId": null,
    "status": "IDLE",
    "paymentType": "CASH",
    "battery": 12,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "28%",
      "left": "45%"
    },
    "speed": 0,
    "todayKm": 12,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-19",
    "model": "Kargo Alfa",
    "driverId": "D-G-MOT-19",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 45,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "50%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 110,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-20",
    "model": "ZenGo Pro",
    "driverId": "D-G-MOT-20",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 88,
    "revenue": 120,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "65%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 15,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-21",
    "model": "ZenGo Pro",
    "driverId": "D-G-MOT-21",
    "status": "OFFLINE",
    "paymentType": "CASH",
    "battery": 0,
    "revenue": null,
    "dailyRent": 450,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "20%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-22",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-22",
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 65,
    "revenue": 450,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "40%",
      "left": "20%"
    },
    "speed": 30,
    "todayKm": 45,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-23",
    "model": "ZenGo Alfa",
    "driverId": null,
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 50,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "45%",
      "left": "60%"
    },
    "speed": 35,
    "todayKm": 55,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-24",
    "model": "Kargo Pro",
    "driverId": "D-G-MOT-24",
    "status": "CHARGING",
    "paymentType": "DIGITAL",
    "battery": 15,
    "revenue": 800,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "10%",
      "left": "30%"
    },
    "speed": 0,
    "todayKm": 120,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-25",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-25",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 70,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "55%",
      "left": "40%"
    },
    "speed": 25,
    "todayKm": 30,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-26",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-26",
    "status": "IDLE",
    "paymentType": "DIGITAL",
    "battery": 100,
    "revenue": 0,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "60%",
      "left": "50%"
    },
    "speed": 0,
    "todayKm": 0,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-27",
    "model": "Kargo Alfa",
    "driverId": "D-G-MOT-27",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 60,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "UNPAID",
    "location": {
      "top": "70%",
      "left": "25%"
    },
    "speed": 40,
    "todayKm": 90,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-28",
    "model": "ZenGo Pro",
    "driverId": "D-G-MOT-28",
    "status": "OFFLINE",
    "paymentType": "DIGITAL",
    "battery": 5,
    "revenue": 150,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "80%",
      "left": "70%"
    },
    "speed": 0,
    "todayKm": 25,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-29",
    "model": "ZenGo Alfa",
    "driverId": "D-G-MOT-29",
    "status": "ACTIVE",
    "paymentType": "CASH",
    "battery": 90,
    "revenue": null,
    "dailyRent": 400,
    "paymentStatus": "PAID",
    "location": {
      "top": "35%",
      "left": "65%"
    },
    "speed": 50,
    "todayKm": 15,
    "garageId": "G-MOT"
  },
  {
    "id": "VH-G-MOT-30",
    "model": "Kargo Pro",
    "driverId": null,
    "status": "ACTIVE",
    "paymentType": "DIGITAL",
    "battery": 75,
    "revenue": 550,
    "dailyRent": null,
    "paymentStatus": null,
    "location": {
      "top": "25%",
      "left": "55%"
    },
    "speed": 45,
    "todayKm": 70,
    "garageId": "G-MOT"
  }
];

const STORAGE_KEY = 'garage_mock_data_v2';

const GarageContext = createContext<GarageContextData | undefined>(undefined);

const sanitizeVehicles = (list: Vehicle[]): Vehicle[] => {
  return list.map(v => {
    if (!v.driverId && v.status === 'ACTIVE') {
      return { ...v, status: 'IDLE' };
    }
    return v;
  });
};

export const GarageProvider = ({ children }: { children: ReactNode }) => {
  const [allVehicles, setVehicles] = useState<Vehicle[]>(() => sanitizeVehicles(INITIAL_VEHICLES));
  const [allDrivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [currentGarageId, setCurrentGarageId] = useState<string | null>('G-MIR');
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage
  useEffect(() => {
    const loadData = async () => {
      try {
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const data = JSON.parse(stored);
            if (data.vehicles && data.drivers) {
              setVehicles(sanitizeVehicles(data.vehicles));
              setDrivers(data.drivers);
            }
          }
        }
      } catch (e) {
        console.error('Failed to load garage data', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (isLoading) return; 
    
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const data = JSON.stringify({ vehicles: allVehicles, drivers: allDrivers });
        localStorage.setItem(STORAGE_KEY, data);
      }
    } catch (e) {
      console.error('Failed to save garage data', e);
    }
  }, [allVehicles, allDrivers, isLoading]);

  const assignDriver = (vehicleId: string, driverId: string) => {
    setVehicles(prev => prev.map(v => {
      if (v.id === vehicleId) return { ...v, driverId, status: v.status === 'IDLE' ? 'ACTIVE' : v.status };
      if (v.driverId === driverId) return { ...v, driverId: null, status: 'IDLE' }; 
      return v;
    }));

    setDrivers(prev => prev.map(d => {
      if (d.id === driverId) return { ...d, assignedVehicleId: vehicleId, status: 'ASSIGNED' };
      if (d.assignedVehicleId === vehicleId) return { ...d, assignedVehicleId: null, status: 'UNASSIGNED' };
      return d;
    }));
  };

  const unassignDriver = (vehicleId: string) => {
    setVehicles(prev => prev.map(v => 
      v.id === vehicleId ? { ...v, driverId: null, status: 'IDLE' } : v
    ));
    
    setDrivers(prev => prev.map(d => 
      d.assignedVehicleId === vehicleId ? { ...d, assignedVehicleId: null, status: 'UNASSIGNED' } : d
    ));
  };

  const currentGarage = GARAGES.find(g => g.id === currentGarageId) || null;
  const vehicles = allVehicles.filter(v => v.garageId === currentGarageId);
  const drivers = allDrivers.filter(d => d.garageId === currentGarageId);

  return (
    <GarageContext.Provider value={{ 
      allVehicles, 
      allDrivers, 
      vehicles, 
      drivers, 
      currentGarageId, 
      setCurrentGarageId,
      currentGarage,
      assignDriver, 
      unassignDriver, 
      isLoading 
    }}>
      {children}
    </GarageContext.Provider>
  );
};

export const useGarageContext = () => {
  const context = useContext(GarageContext);
  if (context === undefined) {
    throw new Error('useGarageContext must be used within a GarageProvider');
  }
  return context;
};

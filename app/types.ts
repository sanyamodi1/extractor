// app/types.ts
export type UserData = {
  email: string;
  password: string;
  phone: string;

  // Identity Card
  id_number: string;
  name: string;
  date_of_birth: string;
  nationality: string;
  issuing_date: string;
  expiry_date: string;
  sex: string;
  authority: string;
  card_number: string;
  occupation: string;
  employer: string;
  issuing_place: string;

  // Vehicle License
  traffic_plate_number: string;
  vehicle_place_of_issue: string;
  vehicle_owner: string;
  vehicle_tc_number: string;
  vehicle_card_expiry_date: string;
  insurance_expiry_date: string;
  policy_number: string;
  registration_date: string;

  // Driving License
  license_number: string;
  license_place_of_issue: string;
  licensing_authority_number: string;
};

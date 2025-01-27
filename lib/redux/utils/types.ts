export type Response<TData> = {
  status: string;
  message: string;
  data: TData;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegistrationPayload = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type ProfileData = {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  profile_image: string;
};

export type BalanceData = {
  balance: number;
};

export type BannerData = {
  banner_name: string;
  banner_image: string;
  description: string;
};

export type ServiceData = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

export type TransactionData = {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
};

export type TransactionHistoryData = {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
};

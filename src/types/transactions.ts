export type CardType = 'visa' | 'mastercard' | 'amex';
export type PaymentMethodType = 'link' | 'qr' | 'mpos' | 'pospro';

export interface Transaction {
  id: string;
  amount: number;
  card: CardType;
  installments: number;
  createdAt: string;
  updatedAt: string;
  paymentMethod: PaymentMethodType;
}

export interface MetadataItem {
  value: string;
  label: string;
}

export interface Metadata {
  cards: MetadataItem[];
  paymentMethods: MetadataItem[];
}

export interface TransactionsResponse {
  transactions: Transaction[];
  metadata: Metadata;
}

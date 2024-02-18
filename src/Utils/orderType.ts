//type annotations for incoming webhook payload

export interface Order {
  id : number ;
    app_id: number;
    billing_address: {
      address1: string;
      address2?: string;
      city: string;
      company?: string | null;
      country: string;
      first_name: string;
      last_name: string;
      phone: string;
      province: string;
      zip: string;
      name: string;
      province_code: string;
      country_code: string;
      latitude: number;
      longitude: number;
    };
    browser_ip: string;
    buyer_accepts_marketing: boolean;
    cancel_reason?: string;
    cancelled_at?: Date | null;
    cart_token: string;
    checkout_token: string;
    client_details: {
      accept_language: string;
      browser_height: number;
      browser_ip: string;
      browser_width: number;
      session_hash: string;
      user_agent: string;
    };
    closed_at: Date;
    company: {
      id: number;
      location_id: number;
    };
    confirmation_number: string;
    created_at: Date;
    currency: string;
    current_total_additional_fees_set: {
      shop_money: {
        amount: number;
        currency_code: string;
      };
      presentment_money: {
        amount: number;
        currency_code: string;
      };
    };
    current_total_discounts: string;
    current_total_discounts_set: {
      current_total_discounts_set: {
        shop_money: {
          amount: number;
          currency_code: string;
        };
        presentment_money: {
          amount: number;
          currency_code: string;
        };
      };
    };
    current_total_duties_set: {
      current_total_duties_set: {
        shop_money: {
          amount: number;
          currency_code: string;
        };
        presentment_money: {
          amount: number;
          currency_code: string;
        };
      };
    };
    current_total_price: string;
    current_total_price_set: {
      current_total_price_set: {
        shop_money: {
          amount: number;
          currency_code: string;
        };
        presentment_money: {
          amount: number;
          currency_code: string;
        };
      };
    };
    current_subtotal_price: string;
    current_subtotal_price_set: {
      current_subtotal_price_set: {
        shop_money: {
          amount: number;
          currency_code: string;
        };
        presentment_money: {
          amount: number;
          currency_code: string;
        };
      };
    };
    current_total_tax: string;
}
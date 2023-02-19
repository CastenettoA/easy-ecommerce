export interface Collection {
    body_html: string;
    collection_id: number;
    default_product_image: {
      id: number;
      created_at: string;
      position: number;
      updated_at: string;
      product_id: number;
      src: string;
    };
    handle: string;
    image: any;
    published_at: string;
    sort_order: string;
    title: string;
    updated_at: string;
  }
type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'DISCONTINUED';

export interface IProduct {
    _id?: string;   // BASIC PRODUCT INFORMATION
    name: string;
    sku: string;
    slug: string;
    description: string;
    shortDescription: string;

    mrp: number;  // PRICING & TAX INFORMATION
    sellingPrice: number;
    costPrice?: number;
    taxRate?: number;
    hsnCode?: string;

    brandId?: string; // BRAND 
    categoryIds: string[]; // CATEGORY & CLASSIFICATION
    tags: string[];
    attributes?: IProductAttribute[];

    images: IProductImage[]; // PRODUCT IMAGES

    weight?: number; //  PHYSICAL ATTRIBUTES
    dimensions?:IProductDimensions[];

    hasVariants?: boolean; // PRODUCT VARIANTS
    variants?: IProductVariant[];

    stockStatus: StockStatus  //  INVENTORY
    warehouseInventory: IWarehouseInventory[];

    isReturnable?: boolean;   // RETURN POLICY
    returnPeriodDays?: number;
    returnPolicyNote: string;

    status: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'; // STATUS & PUBLISHING
    publishedAt?: string;

    createdAt: string;
    updatedAt: string;
}


export interface IProductImage {
    url: string;
    thumbnailUrl?: string;
    alt?: string;
    caption?: string;
    isPrimary?: boolean;
    displayOrder?: number;
}

export interface IProductAttribute {
  attributeTypeId: string;
  attributeName: string;
  dataType: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'ENUM';
  isRequired: boolean;
  value: string | number | boolean | Date;
}

export interface IWarehouseInventory {
  availableQuantity: number;
  // minStockLevel?: number;
  // maxStockLevel?: number;
  // reorderPoint?: number;
  addQuantity: number;
  location?: {
    rack?: string;
    shelf?: string;
    bin?: string;
  };
}
export interface IProductVariant {
  variantSku: string;
  variantName: string;
  attributes: IProductAttribute[];
  pricingOverride?: boolean;
  mrp?: number;
  sellingPrice?: number;
  images?: IProductImage[];
  isActive?: boolean;
}
export interface IProductDimensions {
  length?: number;
  width?: number;
  height?: number;
  unit?: 'cm' | 'inches' | 'mm';
}
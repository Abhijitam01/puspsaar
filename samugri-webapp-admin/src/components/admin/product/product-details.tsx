'use client'
import React, { useState } from 'react';
import { IProduct } from "@/model/product";
import {
    ChevronLeft, ChevronRight, Star, Minus, Plus,
    TrendingUp,
    Heart,
    Share2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0
    }).format(price);
};

interface ProductDetailsProps {
    product: IProduct;
}

const getStockStatusConfig = (status: string) => {
    switch (status) {
        case 'IN_STOCK':
            return { label: 'In Stock', className: 'bg-green-100 text-green-800 dark:bg-green-900/30' };
        case 'LOW_STOCK':
            return { label: 'Low Stock', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30' };
        case 'OUT_OF_STOCK':
            return { label: 'Out of Stock', className: 'bg-red-100 text-red-800 dark:bg-red-900/30' };
        case 'DISCONTINUED':
            return { label: 'Discontinued', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30' };
        default:
            return { label: 'Unknown', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30' };
    }
};

// Expandable Section Component
const ExpandableSection = ({
    title,
    children,
    isExpanded,
    onToggle
}: {
    title: string;
    children: React.ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
}) => {
    return (
        <div className=" dark:border-gray-700 pb-4">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={onToggle}
            >
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
                {isExpanded ? (
                    <Minus className="text-gray-600 dark:text-gray-400" size={20} />
                ) : (
                    <Plus className="text-gray-500 dark:text-gray-400" size={20} />
                )}
            </div>
            {isExpanded && (
                <div className="mt-3">
                    {children}
                </div>
            )}
        </div>
    );
};

export function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [expandedSections, setExpandedSections] = useState({
        description: false,
        specifications: false,
        service: false
    });

    const calculateDiscount = (mrp: number, sellingPrice: number) => {
        return Math.round(((mrp - sellingPrice) / mrp) * 100);
    };

    const discountPercentage = calculateDiscount(product.mrp, product.sellingPrice);

    const nextImage = () => {
        setSelectedImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className={`max-w-6xl mx-auto p-4 min-h-screen`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="relative rounded-lg p-4 flex items-center bg-gray-100 border-muted-foreground/50 justify-center dark:bg-muted-foreground/10 dark:shadow-sm">
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-muted-foreground/30 p-1 rounded-full shadow-md" >
                            <ChevronLeft size={24} />
                        </button>
                        <img
                            src={product.images[selectedImageIndex].url}
                            alt={product.images[selectedImageIndex].alt}
                            className="max-h-72 object-contain"
                        />
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white  dark:bg-muted-foreground/30 p-1 rounded-full shadow-md"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    <div className="flex justify-center gap-2 overflow-x-auto py-3 bg-gray-100 dark:bg-muted-foreground/5 ">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={`border-1 rounded-md p-1 cursor-pointer transition-all ${selectedImageIndex === index ? 'border border-orange-500 dark:border-orange-400' : 'border-gray-300 dark:border-gray-600'}`}
                                onClick={() => setSelectedImageIndex(index)} >
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className="h-16 w-16 object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between items-start">
                            <Badge variant="outline" className="text-orange-500 dark:text-orange-400 bg-orange-100 dark:bg-orange-900 uppercase rounded-full">
                                {product.brandId?.replace('brand_', '') || 'No Brand'}
                            </Badge>
                            <div className="flex gap-6">
                                <button className="flex items-center text-muted-foreground dark:text-red-500 ">
                                    <Heart size={20} className="mr-1" />
                                </button>
                                <button className="flex items-center text-muted-foreground">
                                    <Share2 size={20} className="mr-1" />
                                    <span className='text-sm'>SHARE</span>
                                </button>
                            </div>
                        </div>
                        <h1 className="text-xl font-bold mt-1">{product.name}</h1>
                        <p className="text-muted-foreground text-sm">{product.shortDescription}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                            <span className="text-blue-700 dark:text-blue-300 font-medium">4.3</span>
                            <Star size={16} className="fill-blue-700 dark:fill-blue-300 text-blue-700 dark:text-blue-300 ml-1" />
                        </div>
                        <div className='flex items-center'>
                            <span className="text-sm text-gray-600 dark:text-gray-400">72,342 Ratings & 8,734 Reviews</span>
                            <TrendingUp size={16} className="text-green-600 dark:text-gray-500 ml-1" />
                        </div>
                    </div>
                    <Separator />

                    <div className=" dark:border-gray-700 ">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">₹{formatPrice(product.sellingPrice)}</span>
                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">₹{formatPrice(product.mrp)}</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">{discountPercentage}% off</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">inclusive of all taxes</p>
                    </div>

                    {/* Variants Selection */}
                    {product.hasVariants && (
                        <div className=" dark:border-gray-700 pb-4">
                            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Select Variant:</h3>
                            <div className="flex gap-2">
                                {product.variants?.map((variant, index) => (
                                    <div
                                        key={index}
                                        className={`border-2 rounded-md p-2 cursor-pointer transition-colors ${selectedVariant === index ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                                        onClick={() => setSelectedVariant(index)}
                                    >
                                        <span>{String(variant.attributes[0]?.value ?? '')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className=" dark:border-gray-700 pb-4">
                        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Quantity:</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-lg dark:border-gray-600">
                                <button
                                    onClick={decreaseQuantity}
                                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="px-4 py-2">{quantity}</span>
                                <button
                                    onClick={increaseQuantity}
                                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {product.stockStatus === "IN_STOCK" ? (
                                    <span className="text-green-600 dark:text-green-400">In Stock</span>
                                ) : product.stockStatus === "LOW_STOCK" ? (
                                    <span className="text-orange-500 dark:text-orange-400">Low Stock</span>
                                ) : (
                                    <span className="text-red-500 dark:text-red-400">Out of Stock</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <Separator />

                    {/* Highlights */}
                    <div className="pb-4">
                        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Highlights</h3>
                        <ul className="text-sm list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                            {product.attributes?.map((attr, index) => (
                                <li key={index}>
                                    <span className="font-medium">{attr.attributeName}:</span> {String(attr.value)} {attr.dataType === "NUMBER" ? (attr.attributeName === "Battery Life" ? "hours" : "inches") : ""}
                                </li>
                            ))}
                            <li>Voice Assistant Support</li>
                            <li>Premium Build Quality</li>
                        </ul>
                    </div>
                    <Separator />
                    {/* Expandable Sections */}
                    <ExpandableSection
                        title="Product Description"
                        isExpanded={expandedSections.description}
                        onToggle={() => toggleSection('description')}>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{product.description}</p>
                    </ExpandableSection>

                    <ExpandableSection
                        title="Product Specifications"
                        isExpanded={expandedSections.specifications}
                        onToggle={() => toggleSection('specifications')}
                    >
                        <div className="text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-gray-600 dark:text-gray-400">Product Name</div>
                                <div className="font-medium">{product.name}</div>

                                <div className="text-gray-600 dark:text-gray-400">HSN Code</div>
                                <p>{product.hsnCode}</p>

                                <div className="text-gray-600 dark:text-gray-400">Brand</div>
                                <p>{product.brandId}</p>

                                <div className="text-gray-600 dark:text-gray-400">Category</div>
                                <p>{product.categoryIds.join(", ")}</p>

                                <div className="text-gray-600 dark:text-gray-400">SKU</div>
                                <p>{product.sku}</p>

                                <div className="text-gray-600 dark:text-gray-400">Slug</div>
                                <p>{product.slug}</p>

                                <div className="text-gray-600 dark:text-gray-400">Tax Rate</div>
                                <p>{product.taxRate}</p>

                                <div className="text-gray-600 dark:text-gray-400">Tags</div>
                                <p>{product.tags.join(", ")}</p>

                                <div className="text-gray-600 dark:text-gray-400">Stock Status</div>
                                <p>{product.stockStatus}</p>

                                <div className="text-gray-600 dark:text-gray-400">Product Status</div>
                                <p>{product.status}</p>

                                <div className="text-gray-600 dark:text-gray-400">Weight</div>
                                <div className="font-medium">{product.weight}g</div>

                                <div className="text-gray-600 dark:text-gray-400">Dimensions</div>
                                 <div className="font-medium">
                                    {product.dimensions?.[0]?.length ?? '-'} × {product.dimensions?.[0]?.width ?? '-'} × {product.dimensions?.[0]?.height ?? '-'} {product.dimensions?.[0]?.unit ?? ''}
                                </div>
                            </div>
                        </div>
                    </ExpandableSection>

                    <ExpandableSection
                        title="Service & Support"
                        isExpanded={expandedSections.service}
                        onToggle={() => toggleSection('service')}
                    >
                        <div className="text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-gray-600 dark:text-gray-400">Return Period</div>
                                <p className="font-medium text-green-600">{product.returnPeriodDays} Days Return Policy</p>

                                <div className="text-gray-600 dark:text-gray-400">Return Policy Note</div>
                                <p className="text-gray-600 dark:text-gray-400">{product.returnPolicyNote}</p>

                                <div className="text-gray-600 dark:text-gray-400">Created At</div>
                                <p className="">{new Date(product.createdAt).toLocaleDateString()}</p>

                                <div className="text-gray-600 dark:text-gray-400">Updated At</div>
                                <p className="">{new Date(product.updatedAt).toLocaleDateString()}</p>

                            </div>
                        </div>

                    </ExpandableSection>
                </div>
            </div >
        </div >
    );
}

export default ProductDetails;
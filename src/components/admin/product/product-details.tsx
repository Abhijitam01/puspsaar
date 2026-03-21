'use client'
import React, { useState } from 'react';
import { IProduct } from "@/model/product";
import {
    ChevronLeft, ChevronRight, Star, Minus, Plus,
    Heart,
    Share2,
    Gauge,
    MapPin,
    ShieldCheck,
    BadgeCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0
    }).format(price);
};

interface ProductDetailsProps {
    product: IProduct;
}

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
                        <div className="flex justify-between items-start gap-4 flex-wrap">
                            <Badge variant="outline" className="text-orange-500 dark:text-orange-400 bg-orange-100 dark:bg-orange-900 uppercase rounded-full">
                                {product.year} • {product.make}
                            </Badge>
                            <Badge className="bg-emerald-600 text-white rounded-full">
                                {product.vehicleStatus}
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
                        <p className="text-muted-foreground text-sm flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {product.location.city} • {product.location.hub}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                            <span className="text-blue-700 dark:text-blue-300 font-medium">4.3</span>
                            <Star size={16} className="fill-blue-700 dark:fill-blue-300 text-blue-700 dark:text-blue-300 ml-1" />
                        </div>
                        <div className='flex items-center text-sm text-gray-600 dark:text-gray-400 gap-2'>
                            <Gauge className="h-4 w-4" />
                            {product.mileage.toLocaleString()} km • Grade {product.conditionGrade}
                        </div>
                        <div className='flex items-center text-sm text-gray-600 dark:text-gray-400 gap-1'>
                            <ShieldCheck size={16} className="text-green-600" />
                            {product.certification?.inspector ? `Certified by ${product.certification?.inspector}` : "Certification pending"}
                        </div>
                    </div>
                    <Separator />

                    <div className=" dark:border-gray-700 ">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">₹{formatPrice(product.sellingPrice)}</span>
                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">₹{formatPrice(product.mrp)}</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">{discountPercentage}% below benchmark</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                            Acquisition cost ₹{formatPrice(product.costPrice ?? 0)} • Financing from {product.financingApr}% APR
                        </p>
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

                    {/* Availability */}
                    <div className=" dark:border-gray-700 pb-4">
                        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Availability & Test Drives</h3>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <p>
                                    Next slot:{" "}
                                    {product.nextAvailability
                                        ? new Date(product.nextAvailability).toLocaleString()
                                        : "Immediate"}
                                </p>
                                {product.reservedBy ? (
                                    <p className="text-amber-600">Reserved by {product.reservedBy}</p>
                                ) : (
                                    <p className="text-emerald-600">Open for reservations</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Gauge className="w-4 h-4" />
                                    Schedule Test Drive
                                </Button>
                                <Button className="bg-secondary text-white">
                                    Reserve Vehicle
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Separator />

                    {/* Highlights */}
                    {product.featuredHighlights && product.featuredHighlights.length > 0 && (
                        <div className="pb-4">
                            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Highlights</h3>
                            <ul className="text-sm list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                                {product.featuredHighlights.map((highlight, index) => (
                                    <li key={index}>{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-gray-600 dark:text-gray-400">VIN</div>
                                <div className="font-medium">{product.vin}</div>

                                <div className="text-gray-600 dark:text-gray-400">Make / Model</div>
                                <p>{product.make} {product.model}</p>

                                <div className="text-gray-600 dark:text-gray-400">Trim</div>
                                <p>{product.trim ?? "-"}</p>

                                <div className="text-gray-600 dark:text-gray-400">Fuel & Transmission</div>
                                <p>{product.fuelType} • {product.transmission}</p>

                                <div className="text-gray-600 dark:text-gray-400">Drivetrain</div>
                                <p>{product.drivetrain ?? "NA"}</p>

                                <div className="text-gray-600 dark:text-gray-400">Registration</div>
                                <p>{product.hsnCode}</p>

                                <div className="text-gray-600 dark:text-gray-400">Ownership Count</div>
                                <p>{product.ownershipCount ?? 1}</p>

                                <div className="text-gray-600 dark:text-gray-400">Body / Tags</div>
                                <p>{product.categoryIds.join(", ")}</p>

                                <div className="text-gray-600 dark:text-gray-400">Mileage</div>
                                <div className="font-medium">{product.mileage.toLocaleString()} km</div>

                                <div className="text-gray-600 dark:text-gray-400">Condition Grade</div>
                                <p>{product.conditionGrade}</p>

                                <div className="text-gray-600 dark:text-gray-400">Location</div>
                                <p>{product.location.city} • {product.location.hub}</p>

                                <div className="text-gray-600 dark:text-gray-400">Dimensions</div>
                                <div className="font-medium">
                                    {product.dimensions?.[0]?.length ?? '-'} × {product.dimensions?.[0]?.width ?? '-'} × {product.dimensions?.[0]?.height ?? '-'} {product.dimensions?.[0]?.unit ?? ''}
                                </div>
                            </div>
                        </div>
                    </ExpandableSection>

                    <ExpandableSection
                        title="Ownership & Financing"
                        isExpanded={expandedSections.service}
                        onToggle={() => toggleSection('service')}
                    >
                        <div className="text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-gray-600 dark:text-gray-400">Acquired From</div>
                                <p className="">{product.ownership.acquiredFrom}</p>

                                <div className="text-gray-600 dark:text-gray-400">Acquisition Cost</div>
                                <p className="">₹{formatPrice(product.ownership.acquisitionCost)}</p>

                                <div className="text-gray-600 dark:text-gray-400">Owner On Paper</div>
                                <p className="">{product.ownership.ownerName}</p>

                                <div className="text-gray-600 dark:text-gray-400">Certification</div>
                                <p className="">
                                    {product.certification?.inspectionDate
                                        ? `Completed on ${new Date(product.certification.inspectionDate).toLocaleDateString()}`
                                        : "Pending scheduling"}
                                </p>

                                <div className="text-gray-600 dark:text-gray-400">Financing Program</div>
                                <p>{product.financingApr ? `${product.financingApr}% APR • ${product.financingTenureMonths} months` : "Custom quote"}</p>

                                <div className="text-gray-600 dark:text-gray-400">Test Drives Completed</div>
                                <p className="flex items-center gap-1"><BadgeCheck className="w-3 h-3" />{product.testDriveCount ?? 0}</p>

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
// 'use client'

// import * as React from "react"
// import Link from "next/link"
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu"

// const components: { title: string; href: string; description: string }[] = [
//     {
//         title: "Puja Items",
//         href: "/product/category/puja-items",
//         description: "Essential items for daily puja and religious ceremonies",
//     },
//     {
//         title: "Spiritual Items",
//         href: "/product/category/spiritual-items",
//         description: "Sacred and spiritual items for your divine connection",
//     },
//     {
//         title: "Festival Decor",
//         href: "/product/category/festival-decor",
//         description: "Beautiful decorative items for festive occasions",
//     },
//     {
//         title: "Religious Artifacts",
//         href: "/product/category/religious-artifacts",
//         description: "Traditional and authentic religious artifacts",
//     },
//     {
//         title: "Holy Books",
//         href: "/product/category/holy-books",
//         description: "Sacred texts and religious literature",
//     },
//     {
//         title: "Prasad Items",
//         href: "/product/category/prasad-items",
//         description: "Items for offering and distributing prasad",
//     },
// ]

// export function NavigationMenuDemo() {
//     return (
//         <NavigationMenu viewport={false}>
//             <NavigationMenuList>
//                 <NavigationMenuItem>
//                     <NavigationMenuLink asChild>
//                         <Link href="/" className="inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium">
//                             Home
//                         </Link>
//                     </NavigationMenuLink>
//                 </NavigationMenuItem>

//                 <NavigationMenuItem>
//                     <NavigationMenuTrigger>Shop by Category</NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                         <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4">
//                             {components.map((component) => (
//                                 <ListItem
//                                     key={component.title}
//                                     title={component.title}
//                                     href={component.href}
//                                 >
//                                     {component.description}
//                                 </ListItem>
//                             ))}
//                         </ul>
//                     </NavigationMenuContent>
//                 </NavigationMenuItem>

//                 <NavigationMenuItem>
//                     <NavigationMenuTrigger>Festival</NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                         <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                             <li className="row-span-3">
//                                 <NavigationMenuLink asChild>
//                                     <Link
//                                         className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                                         href="/festival"
//                                     >
//                                         <div className="mt-4 mb-2 text-lg font-medium">
//                                             Festival Collection
//                                         </div>
//                                         <p className="text-sm leading-tight text-muted-foreground">
//                                             Explore our curated collection for all major festivals and celebrations.
//                                         </p>
//                                     </Link>
//                                 </NavigationMenuLink>
//                             </li>
//                             <ListItem href="/festival/upcoming" title="Upcoming Festivals">
//                                 View upcoming festivals and prepare in advance
//                             </ListItem>
//                             <ListItem href="/festival/special" title="Special Collections">
//                                 Curated items for special occasions
//                             </ListItem>
//                             <ListItem href="/festival/calendar" title="Festival Calendar">
//                                 Complete calendar of festivals and events
//                             </ListItem>
//                         </ul>
//                     </NavigationMenuContent>
//                 </NavigationMenuItem>

//                 <NavigationMenuItem>
//                     <NavigationMenuTrigger>Daily Pooja</NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                         <ul className="grid w-[400px] gap-2 p-4">
//                             <ListItem href="/daily-pooja/essentials" title="Daily Essentials">
//                                 Essential items for daily worship
//                             </ListItem>
//                             <ListItem href="/daily-pooja/guide" title="Pooja Guide">
//                                 Step-by-step guide for daily rituals
//                             </ListItem>
//                             <ListItem href="/daily-pooja/packages" title="Complete Packages">
//                                 Curated packages for different needs
//                             </ListItem>
//                         </ul>
//                     </NavigationMenuContent>
//                 </NavigationMenuItem>

//                 <NavigationMenuItem>
//                     <NavigationMenuLink asChild>
//                         <Link href="/order" className="inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium">
//                             Order
//                         </Link>
//                     </NavigationMenuLink>
//                 </NavigationMenuItem>
//             </NavigationMenuList>
//         </NavigationMenu>
//     )
// }

// function ListItem({
//     title,
//     children,
//     href,
//     ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//     return (
//         <li {...props}>
//             <NavigationMenuLink asChild>
//                 <Link href={href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
//                     <div className="text-sm font-medium leading-none">{title}</div>
//                     <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
//                         {children}
//                     </p>
//                 </Link>
//             </NavigationMenuLink>
//         </li>
//     )
// }

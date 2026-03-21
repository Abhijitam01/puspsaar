'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const helpCategories = [
  {
    title: 'Order Management',
    description: 'How to handle order issues, cancellations, and modifications',
    articles: 12,
    icon: '📦'
  },
  {
    title: 'Payment & Refunds',
    description: 'Processing payments, handling refund requests',
    articles: 8,
    icon: '💳'
  },
  {
    title: 'Account Issues',
    description: 'Login problems, account verification, password resets',
    articles: 15,
    icon: '👤'
  },
  {
    title: 'Product Information',
    description: 'Product specifications, availability, recommendations',
    articles: 20,
    icon: '🛍️'
  },
  {
    title: 'Shipping & Delivery',
    description: 'Delivery issues, tracking, shipping policies',
    articles: 10,
    icon: '🚚'
  },
  {
    title: 'Technical Support',
    description: 'Website issues, app problems, technical troubleshooting',
    articles: 6,
    icon: '⚙️'
  }
]

// 🎨 Gradient backgrounds
const gradients = [
  "from-green-300 to-green-950",
  "from-blue-300 to-blue-950",
  "from-purple-300 to-purple-950",
  "from-purple-300 to-purple-950"
]

export default function KnowledgeCategoryPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {helpCategories.map((category, index) => {
        const bg = gradients[index % gradients.length] // ✅ compute here
        return (
          <Card 
            key={index} 
            className={`cursor-pointer hover:shadow-md transition-shadow  border shadow-none`}
          >
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{category.icon}</div>
                <div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription className="">
                    {category.articles} articles
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm ">
                {category.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Briefcase, MapPin, Clock, ChevronRight, Users, Heart, Zap, Coffee, GraduationCap, Sparkles, Search, Building, Rocket, Globe, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const benefits = [
  { icon: Heart, title: 'Health Coverage', description: 'Comprehensive health insurance for you and your family', iconBg: 'bg-rose-500' },
  { icon: GraduationCap, title: 'Learning Budget', description: '₹50,000 annual budget for courses and certifications', iconBg: 'bg-violet-500' },
  { icon: Coffee, title: 'Flexible Work', description: 'Hybrid work options and flexible hours', iconBg: 'bg-amber-500' },
  { icon: Zap, title: 'Performance Bonus', description: 'Quarterly bonuses based on performance', iconBg: 'bg-teal-500' },
  { icon: Users, title: 'Team Events', description: 'Regular team outings and annual retreats', iconBg: 'bg-cyan-500' },
  { icon: Building, title: 'Modern Office', description: 'State-of-the-art workspace with all amenities', iconBg: 'bg-indigo-500' },
]

const openPositions = [
  {
    id: 1,
    title: 'Senior Product Manager',
    department: 'Product',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '5-8 years',
    description: 'Lead product strategy and roadmap for our digital platforms. Work closely with engineering and design teams to deliver exceptional user experiences.',
    requirements: [
      '5+ years of product management experience',
      'Experience with automotive or e-commerce platforms',
      'Strong analytical and communication skills',
      'Experience with Agile methodologies',
    ],
    badgeBg: 'bg-violet-500',
    badgeText: 'text-white',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Mumbai / Remote',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'Build and maintain our web applications using React, Node.js, and modern technologies. Collaborate with cross-functional teams to deliver high-quality features.',
    requirements: [
      '3+ years of experience with React and Node.js',
      'Experience with TypeScript and modern JavaScript',
      'Knowledge of database systems (PostgreSQL, MongoDB)',
      'Understanding of CI/CD pipelines',
    ],
    badgeBg: 'bg-cyan-500',
    badgeText: 'text-white',
  },
  {
    id: 3,
    title: 'Vehicle Curator',
    department: 'Operations',
    location: 'Bengaluru',
    type: 'Full-time',
    experience: '4-6 years',
    description: 'Source and evaluate premium pre-owned vehicles. Ensure quality standards and manage relationships with sellers and dealers.',
    requirements: [
      '4+ years in automotive industry',
      'Deep knowledge of luxury vehicles',
      'Strong negotiation skills',
      'Valid driving license with clean record',
    ],
    badgeBg: 'bg-teal-500',
    badgeText: 'text-white',
  },
  {
    id: 4,
    title: 'Customer Experience Lead',
    department: 'Customer Success',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '3-5 years',
    description: 'Lead our customer experience team and ensure every customer interaction exceeds expectations. Drive initiatives to improve customer satisfaction.',
    requirements: [
      '3+ years in customer service leadership',
      'Experience in luxury retail or automotive',
      'Strong problem-solving abilities',
      'Excellent communication skills',
    ],
    badgeBg: 'bg-rose-500',
    badgeText: 'text-white',
  },
  {
    id: 5,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Mumbai',
    type: 'Full-time',
    experience: '4-7 years',
    description: 'Develop and execute marketing strategies to build brand awareness and drive customer acquisition. Manage campaigns across digital and traditional channels.',
    requirements: [
      '4+ years of marketing experience',
      'Experience with luxury brands preferred',
      'Strong understanding of digital marketing',
      'Creative thinking and analytical skills',
    ],
    badgeBg: 'bg-amber-500',
    badgeText: 'text-white',
  },
]

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const departments = ['all', ...new Set(openPositions.map(p => p.department))]

  const filteredPositions = openPositions.filter(position => {
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || position.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>
        
        {/* Subtle Background Accents */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/30 mb-8 backdrop-blur-sm">
              <Rocket className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Join Our Team</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Build the Future of{' '}
              <span className="text-violet-600 dark:text-violet-400">Automotive Retail</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto">
              Join a team of passionate individuals who are revolutionizing how people buy and sell luxury vehicles.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { icon: Users, label: '50+ Team Members', iconBg: 'bg-teal-500' },
                { icon: Globe, label: '5 Cities', iconBg: 'bg-violet-500' },
                { icon: Star, label: '4.8 Glassdoor', iconBg: 'bg-amber-500' },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                  <div className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/50 dark:bg-muted" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 mb-6">
              <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span className="text-sm font-medium text-rose-700 dark:text-rose-300">Perks & Benefits</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Work{' '}
              <span className="text-rose-600 dark:text-rose-400">With Us?</span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              We offer competitive benefits to help you thrive
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const IconComponent = benefit.icon
              return (
                <Card 
                  key={benefit.title} 
                  className="group border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl ${benefit.iconBg} flex items-center justify-center mb-5 shadow-md`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2 text-lg">{benefit.title}</h3>
                    <p className="text-sm text-foreground/70">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 mb-6">
              <Briefcase className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Open Roles</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Open{' '}
              <span className="text-teal-600 dark:text-teal-400">Positions</span>
            </h2>
            <p className="text-lg text-foreground/80">Find your next opportunity</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <Input
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-card border-border"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDepartment(dept)}
                  className={`whitespace-nowrap ${selectedDepartment === dept ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'border-border hover:border-teal-500/50'}`}
                >
                  {dept === 'all' ? 'All Departments' : dept}
                </Button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredPositions.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-16 text-center">
                  <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-foreground/40" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No positions found</h3>
                  <p className="text-foreground/70">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            ) : (
              filteredPositions.map((position) => (
                <Card key={position.id} className="group border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-foreground">{position.title}</h3>
                          <Badge className={`${position.badgeBg} ${position.badgeText} border-0 text-xs`}>
                            {position.department}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {position.type}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            {position.experience}
                          </span>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className={`gap-2 ${position.badgeBg} hover:opacity-90 text-white border-0 shadow-md`}>
                            View Details
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{position.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 pt-4">
                            <div className="flex flex-wrap gap-2">
                              <Badge className={`${position.badgeBg} ${position.badgeText} border-0`}>
                                {position.department}
                              </Badge>
                              <Badge variant="outline">{position.location}</Badge>
                              <Badge variant="outline">{position.type}</Badge>
                              <Badge variant="outline">{position.experience}</Badge>
                            </div>

                            <div>
                              <h4 className="font-bold text-foreground mb-2">About the Role</h4>
                              <p className="text-foreground/80">{position.description}</p>
                            </div>

                            <div>
                              <h4 className="font-bold text-foreground mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {position.requirements.map((req, index) => (
                                  <li key={index} className="flex items-start gap-3">
                                    <div className={`w-5 h-5 rounded-full ${position.badgeBg} flex items-center justify-center mt-0.5 flex-shrink-0`}>
                                      <Sparkles className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-foreground/80">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <Button className={`w-full ${position.badgeBg} hover:opacity-90 text-white border-0 shadow-md`}>
                              Apply Now
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/50 dark:bg-muted" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 lg:p-14 rounded-2xl bg-card border border-border">
            <div className="w-16 h-16 rounded-xl bg-violet-500 flex items-center justify-center mx-auto mb-6 shadow-md">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Don't See the Right Role?</h2>
            <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll reach out when we have a position that matches your skills.
            </p>
            <Button size="lg" variant="outline" className="border-2 border-violet-500/40 hover:border-violet-500/60 hover:bg-violet-500/10 text-violet-700 dark:text-violet-400 gap-2">
              Send Your Resume
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { Star, User, Mail, Send, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { FaWhatsapp } from 'react-icons/fa'
import { PageHeader } from '@/components/layout/page-header'

export default function FeedbackReviews() {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [feedback, setFeedback] = useState('')

    const handleSubmit = () => {
        if (!name || !email || !feedback || rating === 0) {
            alert('Please fill in all fields and provide a rating')
            return
        }
        console.log({ name, email, feedback, rating })
        setName('')
        setEmail('')
        setFeedback('')
        setRating(0)
        alert('Thank you for your feedback!')
    }

    const handleCancel = () => {
        setName('')
        setEmail('')
        setFeedback('')
        setRating(0)
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden ">

            {/* ✨ Background Bubbles */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Bubble 1 */}
                <div className="absolute w-40 h-40 bg-gradient-to-r from-rose-500 via-orange-400 to-purple-500 opacity-70 rounded-full blur-3xl left-20 top-1/3 animate-bounce-slow"></div>

                {/* Bubble 2 */}
                <div className="absolute w-32 h-32 bg-gradient-to-r from-orange-400 via-purple-500 to-rose-500 opacity-50 rounded-full blur-2xl bottom-20 right-16 animate-pulse-slow"></div>

                {/* Bubble 3 */}
                <div className="absolute w-40 h-40 bg-gradient-to-r from-purple-500 via-rose-400 to-orange-400 opacity-40 rounded-full blur-2xl top-20 right-10 animate-float-slow"></div>
            </div>


            {/* Feedback Card Section */}
            <div className="relative w-full max-w-2xl z-10">
                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center py-6">
                    <div className="inline-flex relative items-center gap-2 bg-white rounded-full px-6 py-2 shadow-lg mb-8">
                        <Sparkles className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-semibold text-gray-700">
                            Share your experience
                        </span>
                        <FaWhatsapp className="w-8 h-8 -top-3 -right-2 text-tertiary absolute" />
                    </div>
                    <PageHeader title="Feedback & Reviews" />
                </div>

                {/* Feedback Form Card */}
                <Card className="border shadow-none backdrop-blur bg-white/80 mb-5">
                    <CardContent className="p-8 ">
                        {/* Star Rating */}
                        <div className="mb-8">
                            <Label className="text-center block text-lg font-semibold text-slate-900 mb-4">
                                Rate your experience:
                            </Label>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star
                                            className={`w-12 h-12 transition-colors ${star <= (hoveredRating || rating)
                                                ? 'fill-bg-secondary text-secondary'
                                                : 'fill-slate-200 text-slate-300'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Inputs */}
                        <div className="mb-6 relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                            <Input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-12 h-14 border  rounded-full   "
                            />
                        </div>

                        <div className="mb-6 relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
                            <Input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-12 h-14 border rounded-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-slate-900 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="mb-8">
                            <textarea
                                placeholder="Share your feedback, suggestions, or review..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={5}
                                className="w-full px-4 py-4 border  rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200  resize-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button
                                onClick={handleSubmit}
                                className="py-6 bg-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                Submit Feedback
                            </Button>
                            <Button
                                onClick={handleCancel}
                                variant="outline"
                                className=" rounded-full py-6 font-semibold  transition-all text-lg hover:text-white hover:bg-secondary"
                            >

                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                {/* Footer Note */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    Your feedback helps us improve our service and provide better experiences
                </p>
            </div>

            {/* ✨ Bubble Animations */}
            <style jsx>{`
        @keyframes float-slow {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 10s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}

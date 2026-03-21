'use client'
import { useState } from 'react'
import { Star, User, Mail, Send } from 'lucide-react'

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
        <div className="border border-[#E0E0E0] bg-white">
            <div className="px-6 py-5 border-b border-[#E0E0E0]">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#6B6B6B] mb-1">Puspsaar</p>
                <h3 className="text-base font-bold text-[#1C1C1C] uppercase tracking-[0.05em]">
                    Feedback & Reviews
                </h3>
                <p className="text-sm text-[#6B6B6B] mt-1">Share your experience with us</p>
            </div>

            <div className="p-6 space-y-5">
                {/* Star Rating */}
                <div>
                    <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] block mb-3">
                        Rate your experience
                    </label>
                    <div className="flex gap-2">
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
                                    className={`w-8 h-8 transition-colors ${
                                        star <= (hoveredRating || rating)
                                            ? 'fill-[#FFAF00] text-[#FFAF00]'
                                            : 'fill-[#E0E0E0] text-[#E0E0E0]'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ABABAB]" />
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-[#E0E0E0] text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ABABAB]" />
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-[#E0E0E0] text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
                </div>

                {/* Feedback */}
                <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">
                        Your Feedback
                    </label>
                    <textarea
                        placeholder="Share your feedback, suggestions, or review..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-[#E0E0E0] text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors resize-none"
                    />
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        onClick={handleSubmit}
                        className="py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors flex items-center justify-center gap-2"
                    >
                        <Send className="w-3.5 h-3.5" />
                        Submit
                    </button>
                    <button
                        onClick={handleCancel}
                        className="py-3 border border-[#E0E0E0] text-[#1C1C1C] text-xs font-bold uppercase tracking-[0.15em] hover:border-black transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

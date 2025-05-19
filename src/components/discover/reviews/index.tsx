"use client"
import { Button } from "@/components/ui/button"
import { Quote, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import Bg1 from "@/assets/discover/rimg1.jpg"
import Bg2 from "@/assets/discover/rimg2.jpg"
import Bg3 from "@/assets/discover/rimg3.jpg"
import Bg4 from "@/assets/discover/rimg4.jpg"
import { motion, AnimatePresence } from "framer-motion"

const bgImages = [Bg1, Bg2, Bg3, Bg4]
const bannerContent = [
  {
    title: "Think beyond the stars.",
    subtitle: "Greatness begins when you allow yourself to dream without limits.",
  },
  {
    title: "Pause. Breathe. Reflect.",
    subtitle: "Sometimes, wisdom is found in stillness. Ask the minds who mastered their moments.",
  },
  {
    title: "Curiosity fuels change.",
    subtitle: "Every great thinker once asked questions. So can you — right here, right now.",
  },
  {
    title: "Dare to build your legacy.",
    subtitle: "The world's most iconic doers once started with a single bold thought.",
  },
]
const reviews = [
  [
    {
      name: "Ayaan Mishra",
      initial: "A",
      text: "Chatting with the Einstein replica gave me an idea for my science fair project. Truly mind-blowing!",
    },
    {
      name: "Ishika Kapoor",
      initial: "I",
      text: "I felt like I was talking to the universe. So inspiring and motivating!",
    },
  ],
  [
    {
      name: "Ravi Verma",
      initial: "R",
      text: "When I spoke to the Gandhi replica, I got clarity about a personal dilemma. This is powerful.",
    },
    {
      name: "Tanya Sethi",
      initial: "T",
      text: "It's like journaling, but better. Talking to APJ Abdul Kalam's replica grounded me.",
    },
  ],
  [
    {
      name: "Neel Roy",
      initial: "N",
      text: "Bill Gates replica gave me real insights on productivity. This platform feels like a secret weapon.",
    },
    {
      name: "Harshita Joshi",
      initial: "H",
      text: "Felt like I was in a library talking to legends. Helped me frame answers for my interview.",
    },
  ],
  [
    {
      name: "Karan Malhotra",
      initial: "K",
      text: "Had a deep chat with Steve Jobs' replica. Motivated me to pitch my startup idea next week!",
    },
    {
      name: "Sneha Desai",
      initial: "S",
      text: "This is next level. I talk to different minds every day — from leaders to thinkers. 5/5.",
    },
  ],
]
const initialColors = ["bg-pink-500", "bg-purple-500", "bg-emerald-500", "bg-blue-500", "bg-yellow-500"]

const Banner = () => {
  const [bgIndex, setBgIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  const handleRefresh = () => {
    setIsFading(true)
    setTimeout(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length)
      setIsFading(false)
    }, 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh()
    }, 5000)

    return () => clearInterval(interval) // cleanup on unmount
  }, [])

  // Animation variants for banner content
  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  }

  // Animation variants for review cards
  const reviewCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  }

  // Staggered animation for review card content
  const reviewContentVariants = {
    hidden: { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        delay: custom * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <div className="relative flex justify-end w-full min-h-72">
      {/* Left panel - cosmic banner */}
      <div className="w-[65%] left-0 top-auto bottom-auto absolute">
        <div className="relative h-full min-h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-black/70 via-black/20 to-black">
          <div className="absolute w-full h-full bg-gradient-to-r from-black/70 via-black/20 to-black/70 z-10"></div>
          <Image
            src={bgImages[bgIndex] || "/placeholder.svg"}
            alt="Background"
            fill
            className={`object-cover object-center z-0 transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            style={{ backgroundBlendMode: "overlay" }}
          />
          <div className="absolute inset-0 flex flex-col p-6 z-10">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${bgIndex}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={bannerVariants}
                className="text-2xl md:text-3xl font-bold mb-4"
              >
                {bannerContent[bgIndex].title}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`subtitle-${bgIndex}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={bannerVariants}
                className="text-gray-200 mb-2 max-w-xl"
              >
                {bannerContent[bgIndex].subtitle}
              </motion.div>
            </AnimatePresence>

            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              className="absolute bottom-6 left-6 hover:cursor-pointer rounded-full bg-black/30 border-gray-700 w-10 h-10"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 z-50 w-[50%] my-auto items-center h-full">
        <AnimatePresence mode="wait">
          {reviews[bgIndex].map((review, i) => (
            <motion.div
              key={`review-${bgIndex}-${i}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={reviewCardVariants}
              className="bg-[#080808] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_75%)] 
                h-[17rem] flex flex-col justify-between rounded-3xl p-5 w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  custom={0}
                  variants={reviewContentVariants}
                  className={`h-7 w-7 text-sm text-white flex items-center justify-center font-semibold rounded-full ${
                    initialColors[(bgIndex + i) % initialColors.length]
                  }`}
                >
                  {review.initial}
                </motion.div>
                <motion.h3 custom={1} variants={reviewContentVariants} className="font-medium text-lg">
                  {review.name}
                </motion.h3>
              </div>
              <motion.p custom={2} variants={reviewContentVariants} className="text-gray-300 text-sm mb-6">
                <Quote className="h-4 w-4 mt-1 text-green-500 shrink-0" />
                {review.text}
              </motion.p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Banner

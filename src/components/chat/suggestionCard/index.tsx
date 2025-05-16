"use client"

import { motion } from "framer-motion"

interface SuggestionCardProps {
  title: string
  subtitle: string
  onClick: () => void
  delay: number
}

export default function SuggestionCard({ title, subtitle, onClick, delay }: SuggestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 cursor-pointer"
    >
      <h3 className="text-white font-medium">{title}</h3>
      <p className="text-gray-400">{subtitle}</p>
    </motion.div>
  )
}

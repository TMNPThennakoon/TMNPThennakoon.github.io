'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800 dark:border-gray-700 mt-20 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <motion.p 
            className="text-gray-400 dark:text-gray-500 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
          >
            Developed by{' '}
            <motion.span 
              className="text-white dark:text-white font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% auto"
              }}
            >
              Nayana Pabasara
            </motion.span>
          </motion.p>
          
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4"
          />
        </motion.div>
      </div>
    </footer>
  )
}


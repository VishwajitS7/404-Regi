import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
            className={`glass-panel ${className}`}
            style={{ padding: '24px' }}
        >
            {children}
        </motion.div>
    );
}

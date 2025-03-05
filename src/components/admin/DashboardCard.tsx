'use client';

import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  onClick?: () => void;
}

const DashboardCard = ({ title, value, icon, color, onClick }: DashboardCardProps) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
    className={`bg-zinc-800/70 rounded-lg p-6 border-l-4 ${color} cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className={`text-2xl ${color.replace('border-', 'text-')}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

export default DashboardCard;
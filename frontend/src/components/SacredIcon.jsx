import { motion } from 'framer-motion';

const TrishulIcon = () => (
    <div className="relative group">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 text-heritage-red opacity-90 filter drop-shadow-[0_0_8px_rgba(139,0,0,0.5)]"
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M12 2L9 6M12 2l3 4M6 8c0-2 1-4 6-4s6 2 6 4M6 8v4c0 3 2.5 5 6 5s6-2 6-5V8" />
                <circle cx="12" cy="2" r="0.5" fill="currentColor" />
            </svg>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-heritage-red/10 rounded-full blur-xl"
            />
        </div>
    </div>
);

const WisdomEyes = () => (
    <div className="flex flex-col items-center">
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.98, 1, 0.98] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-32 h-16 text-indigo-900 drop-shadow-lg"
        >
            <svg viewBox="0 0 100 40" fill="currentColor">
                {/* Left Eye */}
                <path d="M15 20 Q30 5 45 20 Q30 35 15 20" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <motion.circle
                    animate={{ r: [3, 4, 3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    cx="30" cy="20" r="3.5"
                />

                {/* Right Eye */}
                <path d="M55 20 Q70 5 85 20 Q70 35 55 20" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <motion.circle
                    animate={{ r: [3, 4, 3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    cx="70" cy="20" r="3.5"
                />

                {/* The "Question Mark" like nose symbol (Urna) */}
                <path d="M50 22 Q50 32 45 35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

                {/* Third Eye (Tilak) */}
                <path d="M50 12 Q50 2 50 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
        </motion.div>
        <span className="text-[10px] font-bold tracking-widest text-indigo-400 mt-1">PEACE & WISDOM</span>
    </div>
);

const ArchitectureIcon = () => (
    <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
            <motion.div
                key={i}
                animate={{
                    y: [0, -10, 0],
                    backgroundColor: ['#B5651D', '#8B4513', '#B5651D']
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="w-6 h-10 border-2 border-orange-900/20 rounded-sm shadow-sm"
                style={{ backgroundColor: '#B5651D' }}
            />
        ))}
    </div>
);

export default function SacredIcon({ type, name }) {
    const lowercaseName = name?.toLowerCase() || '';
    const lowercaseType = type?.toLowerCase() || '';

    if (lowercaseName.includes('shiva') || lowercaseName.includes('pashupatinath') || lowercaseName.includes('mahadev')) {
        return <TrishulIcon />;
    }
    if (lowercaseType.includes('stupa') || lowercaseName.includes('boudha') || lowercaseName.includes('swayambhu') || lowercaseName.includes('monastery')) {
        return <WisdomEyes />;
    }
    if (lowercaseType.includes('durbar') || lowercaseType.includes('square') || lowercaseType.includes('palace') || lowercaseType.includes('museum')) {
        return <ArchitectureIcon />;
    }

    return (
        <motion.div
            animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl filter drop-shadow-md"
        >
            🛕
        </motion.div>
    );
}

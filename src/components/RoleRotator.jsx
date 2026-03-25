import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Dither from './Dither'

const roles = ['Frontend', 'Backend', 'Full Stack']
const longestRole = 'Full Stack'
const rowHeight = '2.2em'

export default function RoleRotator() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length)
        }, 2200)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center justify-center uppercase font-light text-[11px] sm:text-sm md:text-base lg:text-lg tracking-[0.14em]">
            <div className="relative inline-block">
                {/* Width/height sizer */}
                <div className="invisible px-4 whitespace-nowrap text-white" style={{ lineHeight: rowHeight, height: rowHeight }}>
                    {longestRole} Developer
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-[8px] border border-[#a955f77c] shadow-[0_0_24px_rgba(169,85,247,0.18)]">
                    <div className="absolute inset-[-1px] z-0 rounded-[8px] overflow-hidden">
                        <Dither
                            waveSpeed={0.05}
                            waveFrequency={3}
                            waveAmplitude={0.3}
                            waveColor={[0.3, 0.3, 0.4]}
                            colorNum={4}
                            pixelSize={2}
                            enableMouseInteraction={false}
                            mouseRadius={1}
                        />
                    </div>

                    <div className="absolute inset-[-1px] z-[1] rounded-[8px] bg-[#05030a]/38" />

                    <div
                        className="absolute inset-[-1px] z-[2] rounded-[8px]"
                        style={{
                            background:
                                'linear-gradient(135deg, rgba(169,85,247,0.08), rgba(169,85,247,0.12), rgba(169,85,247,0.06))',
                        }}
                    />

                    <div
                        className="absolute inset-[-1px] z-[3] rounded-[8px] pointer-events-none"
                        style={{
                            boxShadow:
                                'inset 0 0 20px rgba(0,0,0,0.18), inset 0 0 44px rgba(0,0,0,0.20), inset 0 0 72px rgba(0,0,0,0.14)',
                            backdropFilter: 'blur(1px)',
                            WebkitBackdropFilter: 'blur(1px)',
                        }}
                    />

                    <div
                        className="absolute inset-0 z-[4] rounded-[8px] pointer-events-none"
                        style={{
                            boxShadow:
                                'inset 0 0 0 1px rgba(169,85,247,0.22), inset 0 0 0 2px rgba(255,255,255,0.02)',
                        }}
                    />

                    <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-white">
                        <div
                            className="flex items-center justify-center whitespace-nowrap"
                            style={{ height: rowHeight, lineHeight: rowHeight }}
                        >
                            {/* Rotating role area */}
                            <div
                                className="relative flex items-center justify-center"
                                style={{ height: rowHeight }}
                            >
                                <span className="invisible" style={{ lineHeight: rowHeight }}>
                                    {longestRole}
                                </span>

                                <div className="absolute inset-0 overflow-hidden">
                                    <motion.div
                                        animate={{ y: `-${index * 2.2}em` }}
                                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                        className="absolute inset-x-0 top-0"
                                    >
                                        {roles.map((role) => (
                                            <div
                                                key={role}
                                                className="flex items-center justify-center whitespace-nowrap"
                                                style={{ height: rowHeight, lineHeight: rowHeight }}
                                            >
                                                {role}
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>

                            <span className="mx-[0.55ch]"> </span>

                            <div
                                className="flex items-center whitespace-nowrap"
                                style={{ height: rowHeight, lineHeight: rowHeight }}
                            >
                                Developer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
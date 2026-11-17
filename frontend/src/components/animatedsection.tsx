import { motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

function AnimatedSection({
    children,
    delay = 0,
    className,
}: AnimatedSectionProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 0.65,
                delay,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
}

export default AnimatedSection;
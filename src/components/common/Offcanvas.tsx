"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OffcanvasProps {
    isOpen: boolean;
    onClose: () => void;
    position?: "start" | "end"; // vị trí xuất hiện
    children: React.ReactNode;
}

export default function Offcanvas({
    isOpen,
    onClose,
    position = "end",
    children,
}: OffcanvasProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="offcanvas-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        className={`offcanvas offcanvas-${position} show`}
                        initial={{ x: position === "end" ? "100%" : "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: position === "end" ? "100%" : "-100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

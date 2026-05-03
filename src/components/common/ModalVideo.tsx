"use client";

import React, { useCallback } from "react";

type ModalVideoProps = {
    videoId?: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    src?: string;
};

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
    position: "relative",
    width: "90%",
    maxWidth: "1100px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
};

const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "30px",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    zIndex: 1001,
};

const responsiveIframeContainerStyle: React.CSSProperties = {
    position: "relative",
    paddingBottom: "56.25%", // 16:9 aspect ratio
    height: 0,
    overflow: "hidden",
};

const iframeStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
};

const ModalVideo: React.FC<ModalVideoProps> = ({
    videoId,
    isOpen,
    setIsOpen,
    src,
}) => {
    const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    const handleModalClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    return (
        <>
            {isOpen && (
                <div style={overlayStyle} onClick={closeModal}>
                    <div style={modalStyle} onClick={handleModalClick}>
                        <div onClick={closeModal} style={closeButtonStyle}>
                            ×
                        </div>
                        <div style={responsiveIframeContainerStyle}>
                            <iframe
                                src={
                                    src
                                        ? src
                                        : videoId
                                        ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
                                        : undefined
                                }
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={iframeStyle}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalVideo;

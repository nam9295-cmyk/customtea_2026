import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TeaPreviewCard from './TeaPreviewCard';
import { TeaDetail } from '../data/teaDetails';

interface TeaDetailModalProps {
    tea: TeaDetail;
    onClose: () => void;
}

const TeaDetailModal: React.FC<TeaDetailModalProps> = ({ tea, onClose }) => {
    const [canCloseByBackdrop, setCanCloseByBackdrop] = useState(false);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const interactiveTimer = window.setTimeout(() => {
            setCanCloseByBackdrop(true);
        }, 0);
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.clearTimeout(interactiveTimer);
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    return createPortal(
        // Centered modal with internal scrolling for smaller viewports
        <div
            className="fixed inset-0 z-[9999] bg-[#FDFCFB]/70 backdrop-blur-md animate-fade-in"
            onMouseDown={(e) => {
                if (!canCloseByBackdrop) return;
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
                <div
                    className="relative w-full max-w-[720px] max-h-[90vh] overflow-y-auto animate-slide-up"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors z-50 text-xl leading-none"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>

                    <TeaPreviewCard tea={tea} compact={false} showChart={true} />
                </div>
            </div>
        </div>,
        document.body
    );
};

export default TeaDetailModal;

import React, { useEffect } from 'react';
import TeaPreviewCard from './TeaPreviewCard';
import { TeaDetail } from '../data/teaDetails';

interface TeaDetailModalProps {
    tea: TeaDetail;
    onClose: () => void;
}

const TeaDetailModal: React.FC<TeaDetailModalProps> = ({ tea, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    return (
        // Outer backdrop scrolls so modal top is never clipped
        <div
            className="fixed inset-0 z-[9999] bg-[#FDFCFB]/70 backdrop-blur-md overflow-y-auto animate-fade-in"
            onClick={onClose}
        >
            <div className="flex items-start justify-center min-h-screen py-10 px-4">
                <div
                    className="relative w-full max-w-[720px] animate-slide-up"
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

                    <TeaPreviewCard tea={tea} compact={false} />
                </div>
            </div>
        </div>
    );
};

export default TeaDetailModal;

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Modal Component
 * Reusable modal with portal, overlay, animations, and accessibility features
 */
export default function Modal({ isOpen, onClose, children, maxWidth = '960px' }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Store current scroll position
    const scrollY = window.scrollY;

    // Lock scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      // Restore scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Store the element that had focus before the modal opened
    previousActiveElement.current = document.activeElement;

    // Focus the modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      // Restore focus when modal closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative max-h-[90vh] overflow-y-auto bg-bg-dark rounded-[36px] shadow-lg animate-scale-in"
        style={{
          maxWidth,
          width: '100%',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
        }}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

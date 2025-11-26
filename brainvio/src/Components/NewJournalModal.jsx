import React, { useEffect, useRef } from 'react';

export default function NewJournalModal({ open, onClose }) {
    const overlayRef = useRef(null);
    const textareaRef = useRef(null);
    const previouslyFocused = useRef(null);

    useEffect(() => {
        if (!open) return;
        previouslyFocused.current = document.activeElement;

        // focus the textarea when modal opens
        const focusTarget = textareaRef.current;
        focusTarget?.focus();

        function onKey(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
            if (e.key === 'Tab') {
                // trap focus inside modal
                const focusable = overlayRef.current.querySelectorAll('button, textarea, [href], input, select, [tabindex]:not([tabindex="-1"])');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        }

        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            // restore focus
            previouslyFocused.current?.focus?.();
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="new-journal-title" ref={overlayRef}>
            <div className="modal-card" role="document">
                <h3 id="new-journal-title">New Journal Entry</h3>
                <p className="muted-small">This is a stub. I'll add full journaling UI later.</p>
                <textarea ref={textareaRef} placeholder="Write how you're feeling..." style={{width:'100%', minHeight:120, marginTop:12, padding:12, borderRadius:8, border:'1px solid rgba(0,0,0,0.06)'}} />
                <div className="modal-actions">
                    <button className="btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={onClose}>Save</button>
                </div>
            </div>
        </div>
    );
}

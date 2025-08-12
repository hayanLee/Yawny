import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
}: AlertModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const modalContent = (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>
            <AlertTriangle className='w-5 h-5 text-red-600' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
        </div>

        <p className='text-gray-600 mb-6'>{message}</p>

        <div className='grid grid-cols-2 gap-2'>
          <Button variant='outline' onClick={onClose}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AlertModal;

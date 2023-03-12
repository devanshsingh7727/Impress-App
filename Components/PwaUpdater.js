import { Button, Modal } from '@mui/material';
import { useEffect } from 'react';

const PwaUpdater = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onConfirmActivate = () => wb.messageSkipWaiting();

  useEffect(() => {
    wb.addEventListener('controlling', () => {
      window.location.reload();
    });

    wb.addEventListener('waiting', () => setIsOpen(true));
    wb.register();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      heading={'New version available!'}
    >
      <div>Hey, a new version is available! Please click below to update.</div>

      <Button onClick={onConfirmActivate}>Reload and update</Button>
      <Button oncClick={() => setIsOpen(false)}>Cancel</Button>
    </Modal>
  );
};

export default PwaUpdater;

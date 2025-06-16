import React, { useEffect, useState } from 'react';
import { Modal, Typography, Input, message, Button, Space } from 'antd';

interface InviteModalProps {
  visible: boolean;
  onClose: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({ visible, onClose }) => {
  const [inviteCode, setInviteCode] = useState('');

  useEffect(() => {
    if (visible) {
      // 📡 Пример запроса к API
      /*
      fetch('/api/group/invite-code')
        .then(res => res.json())
        .then(data => {
          setInviteCode(data.code);
        })
        .catch(() => {
          message.error('Не удалось получить код приглашения');
        });
      */

      // 🧪 Мок
      setInviteCode('ABC123');
    }
  }, [visible]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      message.success('Код скопирован');
    } catch (err) {
      message.error('Не удалось скопировать');
    }
  };

  return (
    <Modal
      title="Приглашение в группу"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Typography.Paragraph>
        Отправьте этот код пользователю, чтобы он мог присоединиться к вашей группе:
      </Typography.Paragraph>

      <Space.Compact style={{ width: '100%' }}>
        <Input value={inviteCode} readOnly />
        <Button onClick={handleCopy}>Скопировать</Button>
      </Space.Compact>
    </Modal>
  );
};

import React, { useEffect, useState } from 'react';
import { Modal, List, Avatar, Typography } from 'antd';

interface GroupMembersModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Member {
  id: string;
  name: string;
  role: string;
}

export const GroupMembersModal: React.FC<GroupMembersModalProps> = ({ visible, onClose }) => {
  const [groupName, setGroupName] = useState('Название группы');
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (visible) {
      // 📡 Пример запроса на бек
      /*
      fetch('/api/group/members')
        .then(res => res.json())
        .then(data => {
          setGroupName(data.groupName);
          setMembers(data.members); // [{ id, name, role }]
        })
        .catch(console.error);
      */

      // 🧪 Моковые участники
      setGroupName('Jar');
      setMembers([
        { id: '1', name: 'Алексей Смирнов', role: 'Создатель' },
        { id: '2', name: 'Ирина Ковалева', role: 'Участник' },
        { id: '3', name: 'Михаил Дорофеев', role: 'Участник' },
      ]);
    }
  }, [visible]);

  return (
    <Modal
      title={`Участники группы: ${groupName}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <List
        itemLayout="horizontal"
        dataSource={members}
        renderItem={(member) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{member.name[0]}</Avatar>}
              title={<Typography.Text>{member.name}</Typography.Text>}
              description={member.role}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

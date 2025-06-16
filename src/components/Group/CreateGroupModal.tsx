import React from 'react';
import { Modal, Form, Input } from 'antd';

interface CreateGroupModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (groupName: string) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onCreate(values.groupName);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Создать группу"
      open={visible}
      centered
      onOk={handleOk}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      okText="Создать"
      cancelText="Отмена"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="groupName"
          label="Название группы"
          rules={[{ required: true, message: 'Введите название группы' }]}
        >
          <Input placeholder="Например, Команда А" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

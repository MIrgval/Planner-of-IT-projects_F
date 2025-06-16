import React from 'react';
import { Modal, Form, Input } from 'antd';

interface JoinGroupModalProps {
  visible: boolean;
  onCancel: () => void;
  onJoin: (code: string) => void;
}

export const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ visible, onCancel, onJoin }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onJoin(values.groupCode);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Вступить в группу"
      open={visible}
      centered
      onOk={handleOk}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      okText="Вступить"
      cancelText="Отмена"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="groupCode"
          label="Код группы"
          rules={[{ required: true, message: 'Введите код группы' }]}
        >
          <Input placeholder="Например, ABC123" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

import React from 'react';
import { Modal, Form, Select, Button, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

interface UserGroupProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (values: { participant: string }) => void;
  groupName: string;
  participants: string[];
}

export const UserGroup: React.FC<UserGroupProps> = ({
  visible,
  onCancel,
  onAdd,
  groupName,
  participants,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onAdd(values);
        form.resetFields();
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={visible}
      title={<Title level={4} style={{ margin: 0 }}>{groupName}</Title>}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      centered
    >
      <Form
        form={form}
        layout="vertical"
        name="user_group"
        onFinish={handleOk}
        style={{ marginTop: 16 }}
      >
        <Form.Item
          name="participant"
          label="Выберите участника"
          rules={[{ required: true, message: 'Пожалуйста, выберите участника!' }]}
        >
          <Select
            placeholder="Участник"
            showSearch
            filterOption={(input, option) =>
              (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {participants.map((name) => (
              <Option key={name} value={name}>{name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" block>
            Добавить участника
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="button" onClick={handleCancel} block>
            Отмена
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserGroup;

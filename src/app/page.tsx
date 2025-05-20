'use client'
import { Form, Input, Button, Select, message } from 'antd';

const { TextArea } = Input;
export default function Home() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values: any) => {
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      if (res.ok) {
        messageApi.open({
          type: 'success',
          content: 'Feedback sent, thank you',
        });
        form.resetFields()
      } else {
        messageApi.open({
          type: 'error',
          content: 'Something went wrong, please try again',
        });
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong, please try again',
      });
    }
  };
  return (
    <section className="section-wrapper">
      {contextHolder}
      <h1 className="text-center font-bold text-2xl">Khiem Dinh's feedback collection</h1>
      <div className="intro">
        <p>Hello, and thank you for visiting this page. I'm Khiem. I've had the privilege of working at Corsair and Elgato for nearly three years, and now, I'm preparing to begin an exciting new chapter in my career.</p>
        <p>I created this page to kindly ask for your feedback on our time working together. Your insights and reflections are incredibly valuable to me, and they will play a meaningful role in helping me grow and improve as I move forward.</p>
        <p>Thank you again for your time and support — I truly appreciate it.</p>
      </div>
      <div>
      <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}
      form={form}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        label="Position"
        name="position"
        rules={[{ required: true, message: 'Please enter your position' }]}
      >
        <Input placeholder="e.g. Manager, Developer, Designer" />
      </Form.Item>
      <Form.Item
        label="Working at"
        name="workingAt"
        rules={[{ required: true, message: 'Please select where you worked with me' }]}
      >
        <Select placeholder="Select a company">
          <Option value="Corsair">Corsair</Option>
          <Option value="Elgato">Elgato</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Feedback"
        name="feedback"
        rules={[{ required: true, message: 'Please enter your feedback' }]}
      >
        <TextArea rows={4} placeholder="Share your thoughts..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send Feedback
        </Button>
      </Form.Item>
    </Form>
      </div>
    </section>
  );
}

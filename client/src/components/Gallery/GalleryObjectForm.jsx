import React, { useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
import createGalleryObject from "../../views/Gallery/CreateGalleryObject";
import "./GalleryObjectForm.less";
import { useGlobalState } from '../../Utils/userState';

const { Option } = Select;

function GalleryObjectForm(props) {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleCreateGalleryObject = () => {
    setModalVisible(true); // Show the modal
  };
  
   

  const handleFormSubmit = async (values) => {
    //NEED TO CHECK FOR IF LOGGED IN

    //const [value] = useGlobalState('currUser');
    //const userName = value.name;

    // DEFAULT USERNAME FOR NOW
    if (values.visibility == null) {
      values.visibility = "Public";
    }
	//alert("Type:"+ typeof props.workspaceRef);
    createGalleryObject(values.title, "test student", 0, 0, values.visibility, 'Project','1',props.workspaceRef);
    console.log("Submitted values:", values);
    form.resetFields();
    setModalVisible(false); // Hide the modal after submission
  };

  return (
    <div className="GalleryObjectFormWrapper">
      <Button onClick={handleCreateGalleryObject}>Publish to Gallery</Button>
      <Modal
        title="Publish to Gallery"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <div className="GalleryObjectForm">
            <Form.Item
              label="Project Name"
              name="title"
              rules={[{ required: true, message: "Please enter a project name!" }]}
            >
              <Input placeholder="Name the project" />
            </Form.Item>
            <Form.Item label="Visibility" name="visibility">
              <Select defaultValue="Public">
                <Option value="Public">Public</Option>
                <Option value="Organization">Organization</Option>
                <Option value="Classroom">Classroom</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Publish
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default GalleryObjectForm;

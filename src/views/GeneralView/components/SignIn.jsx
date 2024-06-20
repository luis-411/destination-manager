import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Input,
    Row,
    Spin,
    Typography,
  } from "antd";
  import React, { Fragment } from "react";
  import { Link } from "react-router-dom";
import useLoadUser from "../../../api/useLoadUser";
  
  const SignIn = () => {
    const { isDesktopView } = true;
    const {
      error,
      isLoading,
      setError,
      onLoad: onFinish
    } = useLoadUser(false);
  
    return (
      <Fragment>
        <Row align="middle">
          <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
            <Card title="SignIn">
              {error ? (
                <Alert
                  className="alert_error"
                  message={error}
                  type="error"
                  closable
                  afterClose={() => setError("")}
                />
              ) : null}
              <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="Email address" />
                </Form.Item>
  
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
  
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login_submit_btn"
                  >
                    Login {isLoading && <Spin size="small" />}
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Paragraph className="form_help_text">
                New to Social Cards? <Link to="/signup">Sign Up</Link>
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  };
  
  export default SignIn;
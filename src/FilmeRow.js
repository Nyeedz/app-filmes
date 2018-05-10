import React, { Component } from "react";
import "./App.css";
import { Row, Col, Form, Layout, Button } from "antd";

const FormItem = Form.Item;
const { Content } = Layout;

class FilmeRow extends Component {
  viewMovie = () => {
    const filme = this.props.filme;
    const url = "https://www.themoviedb.org/movie/";
    window.location.href = url + filme.id;
  };

  render() {
    const filme = this.props.filme;
    return (
      <Content className="content">
        <div className="conteudo">
          <Row key={filme.id} gutter={16}>
            <Col xs={2} sm={6} md={10} lg={8} xl={8}>
              <img
                width="120"
                height="220"
                alt={filme.title}
                src={filme.poster_src}
              />
            </Col>
            <Col xs={22} sm={18} md={14} lg={16} xl={14}>
              <FormItem style={{ textAlign: "left" }}>
                <h3>
                  <strong>{filme.title}</strong>
                </h3>
              </FormItem>
              <p style={{ textAlign: "left" }}>{filme.overview}</p>
              <Button onClick={this.viewMovie.bind(this)} type="primary">
                Ver
              </Button>
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

export default FilmeRow;

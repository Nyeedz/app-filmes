import React, { Component } from "react";
import "./App.css";
import { Layout, Input, Icon, Spin } from "antd";
import axios from "axios";
import FilmeRow from "./FilmeRow.js";

const { Header, Footer, Content } = Layout;

class App extends Component {
  state = { visible: true, loading: false };

  componentDidMount = () => {
    this.performSearch();
  };

  performSearch = searchTerm => {
    this.setState({ loading: true });
    const url =
      `http://api.themoviedb.org/4/search/movie?l&api_key=78e3055eca03df0bfefc03d001fd3afe&query=` +
      searchTerm;
    axios
      .get(url)
      .then(res => {
        const results = res.data.results;

        const filmeRows = [];
        results.map(filme => {
          filme.poster_src =
            "https://image.tmdb.org/t/p/w185" + filme.poster_path;
          const filmeRow = <FilmeRow key={filme.id} filme={filme} />;
          return filmeRows.push(filmeRow);
        });
        this.setState({
          filmes: filmeRows,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        return <p>Filme Não encontrado</p>;
      });
  };

  searchChangeHandler = e => {
    if (e.target.value.toString().length >= 3) {
      this.setState({
        visible: false
      });
      const searchTerm = e.target.value;
      this.performSearch(searchTerm);
    } else if (e.target.value.toString().length === 0) {
      this.setState({ visible: true, loading: true });
    }
  };

  render() {
    return (
      <Layout className="layout">
        <Header className="header">
          <div className="logo">
            <img alt="app logo" width="50" src="filme.svg" />
          </div>
          <h1>Pesquisa de Filmes</h1>
        </Header>
        <Input
          placeholder="Pesquisar Filme"
          prefix={
            <Icon
              className="icon-search"
              type="search"
              style={{ color: "rgba(0,0,0,.25)" }}
            />
          }
          className="input-search"
          size="large"
          onChange={this.searchChangeHandler.bind(this)}
        />

        {this.state.visible ? (
          <div style={{ textAlign: "center" }}>
            <Content className="content">
              <div className="conteudo">
                <p style={{ paddingTop: 15 }}>
                  Entre com o nome do filme na barra de pesquisa{" "}
                </p>
              </div>
            </Content>
          </div>
        ) : (
          <Spin spinning={this.state.loading} delay={500}>
            {this.state.filmes}
          </Spin>
        )}

        <Footer className="footer">Ant Design ©2016 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default App;

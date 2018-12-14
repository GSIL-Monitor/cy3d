import React from "react";
import { Router, Route, IndexRoute, Link, browserHistory } from "react-router";
import { Layout, Menu, Breadcrumb, Dropdown, Icon } from "antd";
import EnchancedComponent from "common/EnchancedComponent";
import HeaderMenu from 'mod/Header';
import styles from "./MainLayout.less";
import Loading from "mod/Loading";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends EnchancedComponent {
  constructor(props) {
    super(props);

    var locationpath = props.location.pathname;
    this.state = {
      selectedKeys: locationpath == "/quickStart" ? "/quickStart" : locationpath,
      openKeys: [],
      loading: false
    };

    this._bindEvts();
  }

  _bindEvts() {
    this.event.on("showLoading", () => {
      this.refs.loadingObj && this.refs.loadingObj.setLoading(true);
    });

    this.event.on("hideLoading", () => {
      this.refs.loadingObj && this.refs.loadingObj.setLoading(false);
    });
  }

  handleClick(e) {
    browserHistory.push(e.key);
    // console.log("handleClick", e.key, e.keyPath);
    this.setState({
      selectedKeys: e.key,
      openKeys: e.keyPath.slice(1)
      // subMenuTitle: this.getFristTitle(e.key)
    });
    $(".ant-layout-content").scrollTop(0);
  }

  render() {
    return (
      <div className={styles.normal}>
        <HeaderMenu selected="docs" />
        <div className={styles.contentWrapper}>
          <Layout style={{height: "100%"}}>
            <Sider width={200} style={{ background: "#fff", paddingTop: 30 }}>
              <Menu
                mode="inline"
                selectedKeys={[this.state.selectedKeys]}
                onClick={this.handleClick.bind(this)}
                defaultOpenKeys={["chart"]}
              >
                <Menu.Item key="/quickStart">快速上手</Menu.Item>
                <Menu.Item key="/doc">接口文档</Menu.Item>
                <SubMenu key="chart" title={
                    <span>
                        图表示例
                    </span>}>
                    <Menu.Item key="/chart-bar">
                        <span className={styles.subMenuItem}>柱状图</span>
                    </Menu.Item>
                    <Menu.Item key="/chart-line">
                        <span className={styles.subMenuItem}>折线图</span>
                    </Menu.Item>
                    <Menu.Item key="/chart-pie">
                        <span className={styles.subMenuItem}>饼图</span>
                    </Menu.Item>
                    <Menu.Item key="/chart-relation">
                        <span className={styles.subMenuItem}>关系图</span>
                    </Menu.Item>
                    <Menu.Item key="/chart-linebar">
                        <span className={styles.subMenuItem}>线柱混合图</span>
                    </Menu.Item>
                    <Menu.Item key="/chart-radar">
                        <span className={styles.subMenuItem}>雷达图</span>
                    </Menu.Item>
                    <Menu.Item key="/chart-tagcloud">
                        <span className={styles.subMenuItem}>标签云图</span>
                    </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content>
              <div className={styles.main} id="mainContent">
                {this.props.children}
              </div>
            </Content>
          </Layout>
        </div>
        <Loading ref="loadingObj" zIndex={2000} />
      </div>
    );
  }
}

export default MainLayout;

import React, { createRef, Component } from 'react';
import cns from 'classnames';
import { Card, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ApprovalSelectComp from '../components/ApprovalSelectComp'

const OPTIONS = [
  { value: 'Pink', name: 'Pink' },
  { value: 'Red', name: 'Red' },
  { value: 'Pink1', name: 'Pink1' },
  { value: 'Red1', name: 'Red1' },
]

export default class ApprovalSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: OPTIONS,
      list: [],
    }
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
  }

  onChange(value, item) {
    // console.log('value', value)
    // console.log('item', item)
    // this.setState({ list: value })
  }

  render() {
    const { options, list } = this.state;
    const props = {
      options,
      list,
      onChange: this.onChange
    }
    return (
      <PageHeaderWrapper>
        <Card>
          <Alert
            message="umi ui 现已发布，欢迎使用 npm run ui 启动体验。"
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />
          <ApprovalSelectComp {...props}/>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

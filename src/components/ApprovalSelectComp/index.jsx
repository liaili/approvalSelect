import React, { createRef, Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import cns from 'classnames';
import { cloneDeep } from 'lodash';
import styles from './index.less'

const MenuItem = Menu.Item;

export default class ApprovalSelectComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      list: props.list || [],
    }
    this.inputRef = createRef();
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.renderOptions = this.renderOptions.bind(this);
    this.onClickOptions1 = this.onClickOptions1.bind(this);
    this.getValue2Array = this.getValue2Array.bind(this);
    this.cancelSelectedOption = this.cancelSelectedOption.bind(this);
  }
  componentDidMount() {
    var str = 'antd-pro-components-approval-select-comp-index-approval-select';
    document.addEventListener('click', (e) => {
      var target = e.target;
      var select = document.querySelector('.antd-pro-components-approval-select-comp-index-approval-select');
      if (target.className == str || select.contains(target)) {
        // 在select里面
        // this.onFocus();
      } else {
        // 外面
        this.onBlur();
      }
    });
  }
  onBlur() {
    this.setState({ focus: false })
  }

  onFocus() {
    if (this.inputRef.current) {
      this.inputRef.current.focus()
    }
    this.setState({ focus: true })
  }

  onClickOptions1({ key, domEvent }) {
    domEvent.stopPropagation();
    this.setState({ focus: true });
    const { options = [], onChange } = this.props;
    const activeItem = (options.find(item => item.value === key));
    const list = cloneDeep(this.state.list)
    const index = list.length ? list.findIndex(item => item.value === key) : -1;

    if (!list.length || index === -1) {
      // 添加选中
      list.push(activeItem);

    } else {
      // 取消选中
      list.splice(index, 1)
      
    }
    this.setState({ list })
    onChange(list, activeItem)
  }

  cancelSelectedOption(index, item) {
    const list = cloneDeep(this.state.list)
    list.splice(index, 1)
    this.setState({ list })
    this.props.onChange(list, item);
  }

  getValue2Array(list = []) {
    if (!Array.isArray(list)) {
      throw new TypeError('need an array')
    }
    return list.map(item => item.value);
  }

  renderOptions() {
    const { options = [] } = this.props;
    const selectedKeys = this.getValue2Array(this.state.list)
    let arr = [];

    if (options.length) {
      arr = options.map(option => (
        <MenuItem key={option.value}>
          { option.name }
          { selectedKeys.includes(option.value) && <Icon type="check" className={styles['check-icon']}/> }
        </MenuItem>
      ))
    } else {
      arr.push(<MenuItem key="noData">没有数据</MenuItem>)
    }
    return(
      <Menu
        selectedKeys={selectedKeys}
        onClick={this.onClickOptions1}
      >{ arr }</Menu>
    )
  }

  render() {
    const { focus, list } = this.state;
    return(
      <div className={styles['approval-select']}>
        <Dropdown
          visible={focus}
          overlay={this.renderOptions()}
          getPopupContainer={() => document.getElementsByClassName(styles['approval-select'])[0]}
          overlayClassName={styles['drop-down']}
        >
          <div
            className={cns(
              styles['approval-select-section'],
              styles['clear'],
              styles['ant-select-selection--multiple'], 
              {
                [styles['approval-select-enabled']]: focus
              }
            )}
            onClick={this.onFocus}
          >
            {
              list.length === 0 && <div className={styles['approval-select-placeholder']}>placeholder</div>
            }
            <ul className={styles['approval-select-list']}>
              {
                list.map((item, index) => (
                  <li
                    className={cns(styles['approval-select-item'], styles.clear)}
                    key={item.value}
                  >
                    {
                      (index !== 0 && index !== list.length) && (
                        <div className={styles['approval-select-item-arrow']}>
                          <Icon type="arrow-right" />
                        </div>
                      )
                    }
                    <div className={styles['approval-select-item-section']}>
                      <span className={styles.mr10}>{item.name}</span>
                      <Icon type="close" onClick={(index) => this.cancelSelectedOption(index, item)}/>
                    </div>
                  </li>
                ))
              }
              <li className={styles['approval-select-input']}>
                <input ref={this.inputRef}/>
              </li>
            </ul>
          </div>
        </Dropdown>
      </div>
    )
  }
}



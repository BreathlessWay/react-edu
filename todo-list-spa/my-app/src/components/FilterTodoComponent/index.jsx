import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

// 首先创建一个筛选项目的数组, 之所以把这个数组放在外面, 是因为这个数据是固定的, 不会改变, 对于不会改变的固定数据我们不需要把它放在组件内部
const filterList = [
  {
    id: 0,
    type: 'all',
    label: '全部'
  },
  {
    id: 1,
    type: 'complete',
    label: '已完成'
  },
  {
    id: 2,
    type: 'uncomplete',
    label: '未完成'
  }
];

const FilterTodoComponent = memo((props) => {
  const { currentFilter, onFilterTodo } = props;

  return <section className='todo-filter'>
    {/*
      我们用map遍历数组, 返回一个jsx, 上一章提到过, jsx中变量要用{}包起来, 这种对数据的循环操作一样也要在{}中, 依次设置htmlFor id label
      关于key， react对于渲染循环列表，要求为每一项添加惟一值key来做渲染优化， 所以要求key是确定且唯一的值， 可以用id，不推荐用循环的索引值
      对于checked我们只要判断当前的currentFilter是否和数组中的某一项的type相等
      对于onChange事件我们通过使用一个箭头函数, 对处理函数handleFilter传参, 传入循环项的type, 也可以写成this.handleFilter.bind(this, item.type)
      不能直接写成this.handleFilter(item.type), 这样事件处理就直接执行了
      */}
    {
      // 这里我们遍历的是筛选出来的数组filterTodoList
      filterList.map(item => <label htmlFor={item.type} className='todo-filter_item' key={item.id}>
        <input type="checkbox" checked={currentFilter === item.type} id={item.type} onChange={() => onFilterTodo(item.type)} className='todo-filter_item-checkbox nes-checkbox'/>
        <span className='todo-filter_item-label'>{item.label}</span>
      </label>)
    }
  </section>;
});

FilterTodoComponent.propTypes = {
  currentFilter: PropTypes.oneOf(['all', 'complete', 'uncomplete']).isRequired,
  onFilterTodo: PropTypes.func.isRequired
};

export default FilterTodoComponent;

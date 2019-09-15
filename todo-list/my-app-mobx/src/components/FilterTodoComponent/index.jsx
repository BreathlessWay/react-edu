import React from 'react';
import { inject, observer } from 'mobx-react';

const filterList = [
  {
    id: 0,
    type: 'all',
    label: '全部'
  },
  {
    id: 1,
    type: 'completed',
    label: '已完成'
  },
  {
    id: 2,
    type: 'uncompleted',
    label: '未完成'
  }
];

const FilterTodoComponent = (props) => {

  const { current, changeCurrent, todoCount } = props.store.todo;

  return <section className='todo-filter'>
    {
      filterList.map(item => <label htmlFor={item.type} className='todo-filter_item' key={item.id}>
        <input type="radio" id={item.type} className='todo-filter_item-checkbox nes-radio' name='filter' checked={current === item.type} onChange={() => changeCurrent(item.type)}/>
        <span className='todo-filter_item-label'>{item.label}{todoCount[`${item.type}Count`]}</span>
      </label>)
    }
  </section>;
};

export default inject('store')(observer(FilterTodoComponent));

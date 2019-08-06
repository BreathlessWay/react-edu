import React from 'react';

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
    type: 'uncompleted',
    label: '未完成'
  }
];

const FilterTodoComponent = (props) => {

  const { current, onFilter } = props;

  return <section className='todo-filter'>
    {
      filterList.map(item => <label htmlFor={item.type} className='todo-filter_item' key={item.id}>
        <input type="radio" id={item.type} className='todo-filter_item-checkbox nes-radio' name='filter' checked={current === item.type} onChange={() => onFilter(item.type)}/>
        <span className='todo-filter_item-label'>{item.label}</span>
      </label>)
    }
  </section>;
};

export default FilterTodoComponent;

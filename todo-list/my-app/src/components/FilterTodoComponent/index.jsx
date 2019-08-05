import React from 'react';

const FilterTodoComponent = () => {
  return <section className='todo-filter'>
    <label htmlFor="all" className='todo-filter_item'>
      <input type="checkbox" className='todo-filter_item-checkbox nes-checkbox'/>
      <span className='todo-filter_item-label'>全部</span>
    </label>
    <label htmlFor="complete">
      <input type="checkbox" id='complete' className='todo-filter_item-checkbox nes-checkbox'/>
      <span className='todo-filter_item-label'>已完成</span>
    </label>
    <label htmlFor="uncomplete">
      <input type="checkbox" id='uncomplete' className='todo-filter_item-checkbox nes-checkbox'/>
      <span className='todo-filter_item-label'>未完成</span>
    </label>
  </section>;
};

export default FilterTodoComponent;

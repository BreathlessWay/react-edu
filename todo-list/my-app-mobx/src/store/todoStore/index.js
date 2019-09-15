import { action, autorun, computed, observable, toJS } from 'mobx';

export default class TodoStore {

  constructor () {
    autorun(() => console.log(this.report));
  }

  @observable
  list = [
    {
      content: '待办1',
      completed: false,
      id: 0
    },
    {
      content: '待办2',
      completed: true,
      id: 1
    }];

  @observable
  current = 'all';  // all  completed  uncompleted

  @action.bound
  addTodo (todo) {
    const list = toJS(this.list);
    list.push(todo);
    this.list = list;
  }

  @action.bound
  changeTodo (todo) {
    const list = toJS(this.list);
    list.forEach(_ => {
      if (_.id === todo.id) {
        _.completed = todo.completed;
        _.content = todo.content;
      }
    });
    this.list = list;
  }

  @action.bound
  deleteTodo (id) {
    const list = toJS(this.list);
    const index = list.findIndex(_ => _.id === Number(id));
    list.splice(index, 1);
    this.list = list;
  }

  @action.bound
  changeCurrent (type) {
    this.current = type;
  }

  @computed
  get showTodoList () {
    let showList = this.list;

    if (this.current === 'completed') {
      showList = this.list.filter(item => item.completed);
    }

    if (this.current === 'uncompleted') {
      showList = this.list.filter(item => !item.completed);
    }
    return showList;
  }

  @computed
  get report () {
    if (this.list.length === 0)
      return '<none>';
    return `Next todo: "${this.list[0].content}". ` +
      `Progress: ${this.todoCount.completedCount}/${this.todoCount.allCount}`;
  }

  @computed
  get todoCount () {
    const count = {
      allCount: this.list.length,
      completedCount: 0,
      uncompletedCount: 0
    };
    count.completedCount = this.list.filter(todo => todo.completed).length;
    count.uncompletedCount = count.allCount = count.completedCount;
    return count;
  }
}

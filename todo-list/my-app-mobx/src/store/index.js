import TodoStore from './todoStore';

export default class Store {
  constructor(){
    this.todo = new TodoStore()
  }
};

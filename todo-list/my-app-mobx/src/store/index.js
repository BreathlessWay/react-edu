import TodoStore from "./todoStore";

class Store {
	constructor() {
		this.todo = new TodoStore();
	}
}

export default new Store();

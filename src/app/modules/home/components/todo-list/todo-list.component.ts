import { Component, DoCheck } from '@angular/core';

// Interfaces
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || "[]");

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deleteItemTaskList(value: number): void {
    this.taskList.splice(value, 1);
  }

  public setEmitTaskList(value: string): void {
    this.taskList.push({
      task: value,
      checked: false
    });
  }

  public deleteAllTaskList(): void {
    const confirm = window.confirm("Você deseja realmente deletar tudo?");

    if (confirm) this.taskList = [];
  }

  public validateInput(value: string, index: number): void {
    if (!value.length) {
      const confirm = window.confirm("Tafera vazia, deseja deletar?");

      if (confirm) this.deleteItemTaskList(index);
    }
  }

  public setLocalStorage(): void {
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}

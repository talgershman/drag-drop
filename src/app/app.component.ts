import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, CdkDragStart} from '@angular/cdk/drag-drop';
import { without } from 'lodash-es';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dropdown';

  private selections = [];
  isDragging = false;

  items = [
    {
      name: 'Moshe Moseh',
      checked: false
    },
    {
      name: 'Tal Tal',
      checked: false
    },
    {
      name: 'Avi Avi',
      checked: false
    },
    {
      name: 'Dani Dani',
      checked: false
    },
    {
      name: 'Rotem Rotem',
      checked: false
    },
    {
      name: 'Or Or',
      checked: false
    }
  ];

  drop(event: CdkDragDrop<string[]>): void {
    if (this.selections.length > 1) {
      this.items = without(this.items, ...this.selections);
      this.items.splice(event.currentIndex - 1, 0, ...this.selections);
    } else {
      moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    }
    this.isDragging = false;
  }

  dragStatred(event: CdkDragStart): void{
    this.isDragging = true;
  }

  checkBoxChange(item: any , $event: any): void {
    item.checked = $event.checked;
    // tslint:disable-next-line: no-shadowed-variable
    this.selections = this.items.filter((item: any) => item.checked);
  }

  isItemDisabled(item: any): boolean{
    if (!this.selections.length){
      return false;
    }
    return !item.checked;
  }
}

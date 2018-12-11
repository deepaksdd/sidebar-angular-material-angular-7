import { OnInit, ViewChild, Input, Component, Output, EventEmitter, forwardRef } from "@angular/core";
// import { NG_VALUE_ACCESSOR } from "@angular/forms";


// const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => InlineEditComponent),
//   multi: true
// };

@Component({
  selector: 'lib-inline-edit',
  templateUrl: './inline-edit.component.html',
  // providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./inline-edit.component.css']
})



export class InlineEditComponent implements OnInit {

  // @ViewChild('inlineEditControl') inlineEditControl;
  @Input() id: string = '';
  @Input() value: valueModel = {};
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  @Output() action = new EventEmitter();
  @Output() addAction = new EventEmitter();

  editing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onAdd(value) {
    this.addAction.emit(this.value);
  }

  onEdit(value) {
    this.editing = true;
  }

  onBlur(value) {
    this.editing = false;
    this.action.emit(this.value);
  }

}
class valueModel {
  Id?: number;
  Name?: string;

  _error?: boolean;
}
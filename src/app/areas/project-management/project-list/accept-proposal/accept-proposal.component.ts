import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accept-proposal',
  templateUrl: './accept-proposal.component.html',
  styleUrls: ['./accept-proposal.component.scss']
})
export class AcceptProposalComponent implements OnInit {
  approvalForm = this.fb.group({
    CommentText: ['', Validators.required],
  });

  //#region variables
  ProjectDescription: any;
  myGroup: FormGroup;
  //#endregion

  //#region  input/output emit 
  @Input() projectId: number;
  @Input() winProjectFlag: boolean;
  @Output() appovalData = new EventEmitter();
  @Output() rejectedApproval = new EventEmitter();

  @Output() winApproval = new EventEmitter();
  @Output() lossApproval = new EventEmitter();
  //#endregion
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.winProjectFlag
  }


  //#region  click to emit event of approval to parent
  isApproved(text: any, tr) {
    this.appovalData.emit({ text, tr })
    this.projectId;
  }
  isRejceted(text: any, tr) {
    this.rejectedApproval.emit({ text, tr })
  }

  //#endregion click to emit event of win /loss to parent
  isWin(text: any, tr) {
    this.winApproval.emit({ text, tr })
    this.projectId;
  }
  isLoss(text: any, tr) {
    this.lossApproval.emit({ text, tr })
  }
  //#region 
  //#endregion

}

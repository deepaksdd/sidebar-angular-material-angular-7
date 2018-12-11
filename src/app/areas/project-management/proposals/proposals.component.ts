import { Component, OnInit } from '@angular/core';
import { UIModuleHeaders } from '../../../shared/enum';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent implements OnInit {

  setSelectedHeader = UIModuleHeaders.ProjectModule;
  setProjectHeader = 'PROJECTS';

  constructor() { }

  ngOnInit() {
  }

}

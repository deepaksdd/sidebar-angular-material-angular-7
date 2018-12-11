import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UIModuleHeaders } from './shared/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sidenavTrial';

  setSelectedHeader = UIModuleHeaders.ChartOfAccountHeader;
  setProjectHeader = 'Chart Of Account';

}

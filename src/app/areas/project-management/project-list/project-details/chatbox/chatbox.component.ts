import { ProjectDetailModel, ProjectChatModel } from './../models/project-details.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectListService } from '../../service/project-list.service';
import { AppUrlService } from 'src/app/shared/services/app-url.service';
import { GLOBAL } from 'src/app/shared/global';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  projectmsgDetail: ProjectChatModel;
  ProjectCommunicationModel: ProjectChatModel[];
  Projectid: any;
  public snackBar: MatSnackBar;
  //public _hubConnection: HubConnection;
  UserName = '';
  UserRole = '';
  private form: NgForm
  message = '';
  messages: string[] = [];

  // public sendProjectMessage(): void {
  //   this._hubConnection
  //     .invoke('ProjectChatSave', this.message)
  //     .then(() => this.message = '')
  //     .catch(err => console.error(err));
  // }

  constructor(private routeActive: ActivatedRoute,
    private projectListService: ProjectListService,
    private appurl: AppUrlService
  ) {

  }

  ngOnInit() {
    this.Projectid = this.routeActive.snapshot.paramMap.get('id');
    this.getChatDetails(Number(this.Projectid))

    //this.initProjectDetail();
    // this._hubConnection = new HubConnection('API_Project_AddProjectChat');

    // this._hubConnection
    //   .start()
    //   .then(() => console.log('Connection started!'))
    //   .catch(err => console.log('Error while establishing connection :('));

    //   this._hubConnection.on('ProjectChatSave', (UserRole:string,UserName: string, receivedMessage: string) => {
    //     const text = `${UserRole}: ${UserName}: ${receivedMessage}`;
    //     this.messages.push(text);
    //   });

  }
  initProjectDetail() {
    this.projectmsgDetail = {
      ProjectId: 0,
      ProjectDescription: '',
      FilePath: '',
      FileName: '',
      UserRole: '',
      CreatedByName: '',
      CreatedDate: ''
    }
  }
  getChatDetails(ProjectId) {
    let ProjectCommunicationModel: any = [];
    this.projectListService.GetChatByProjectId(this.appurl.getApiUrl() + GLOBAL.API_Project_GetChatByProjectId, ProjectId)
      .subscribe(
        (response) => {
          if (response.StatusCode == 200) {
           // if (response.data.ProjectCommunicationModel.length > 0) {
              this.ProjectCommunicationModel = response.data.ProjectCommunicationModel;
              this.message = '';
            //}
          }
        });
  }

  sendProjectMessage(data: any) {
    this.Projectid = this.routeActive.snapshot.paramMap.get('id');
    if (data != '' && data != "") {
      let projectmsgDetail: ProjectChatModel = {
        ProjectId: Number(this.Projectid),
        ProjectDescription: data
      };
      this.projectListService.AddProjectChat(this.appurl.getApiUrl() + GLOBAL.API_Project_AddProjectChat, projectmsgDetail)
        .subscribe(
          (response) => {
            this.getChatDetails(this.Projectid);
          }

        )
    }
  }
}

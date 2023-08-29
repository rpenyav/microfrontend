import { Component, InjectionToken, Injector, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { IFeature2DataItem } from './feature2.model';
import { Feature2Service } from './feature2.service';
import { Observable } from 'rxjs';
import { MessagingService, InjectionTokens } from 'cross-cutting-concern';

@Component({
  selector: 'app-feature2',
  templateUrl: './feature2.component.html',
  styleUrls: ['./feature2.component.scss'],
})
export class Feature2Component implements OnInit {
  messagingService: MessagingService = {} as MessagingService;
  displayedColumns: string[] = [
    'dataPoint1',
    'dataPoint2',
    'dataPoint3',
    'dataPoint4',
    'dataPoint5',
  ];
  dataSource: Feature2DataSource = {} as Feature2DataSource;

  constructor(
    private feature2Service: Feature2Service,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.messagingService = this.injector.get<any>(
      InjectionTokens.messagingServiceInjectionToken
    );
    this.dataSource = new Feature2DataSource(this.feature2Service);
  }

  onMessageButtonClick(): void {
    this.messagingService.messageToFeature1({
      messageText: 'Message from feature1',
      messageTime: new Date(),
    });
  }
}

export class Feature2DataSource extends DataSource<IFeature2DataItem> {
  constructor(private feature2Service: Feature2Service) {
    super();
  }
  connect(): Observable<IFeature2DataItem[]> {
    return this.feature2Service.getFeature2Data();
  }

  disconnect(): void {}
}

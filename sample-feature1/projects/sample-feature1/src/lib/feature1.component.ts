import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Feature1Service } from './feature1.service';
import { DataSource } from '@angular/cdk/collections';
import { IFeature1DataItem } from './feature1.model';
import { Observable, Subscription } from 'rxjs';
import { MessagingService, IMessageToFeature1, InjectionTokens } from 'cross-cutting-concern';

@Component({
  selector: 'feature1-component',
  templateUrl: './feature1.component.html',
  styleUrls: ['./feature1.component.scss']
})
export class Feature1Component implements OnInit, OnDestroy {
  messagingService: MessagingService = {} as MessagingService;
  messageToFeature1Sub: Subscription = {} as Subscription;
  message: string | null = null;
  displayedColumns: string[] = ['dataPoint1', 'dataPoint2', 'dataPoint3', 'dataPoint4', 'dataPoint5'];
  dataSource: Feature1DataSource = {} as Feature1DataSource;

  constructor(private feature1Service: Feature1Service,
              private injector: Injector) {}

  ngOnInit(): void {
    this.messagingService = this.injector.get<any>(InjectionTokens.messagingServiceInjectionToken);
    this.messageToFeature1Sub = this.messagingService.messageToFeature1$.subscribe(
      x => this.handleMessageToFeature1(x)
    );
    this.dataSource = new Feature1DataSource(this.feature1Service);
  }

  ngOnDestroy(): void {
   if (this.messageToFeature1Sub) {
      this.messageToFeature1Sub.unsubscribe();
    }
  }

  private handleMessageToFeature1(message: IMessageToFeature1 | undefined): void {
    if (message) {
      this.message = JSON.stringify(message);
    }
  }
}

export class Feature1DataSource extends DataSource<IFeature1DataItem> {
  constructor(private feature1Service: Feature1Service) {
    super();
  }
  connect(): Observable<IFeature1DataItem[]> {
    return this.feature1Service.getFeature1Data();
  }

  disconnect(): void {}
}

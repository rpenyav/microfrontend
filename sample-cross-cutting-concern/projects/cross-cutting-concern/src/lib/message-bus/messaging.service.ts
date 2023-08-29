import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMessageToFeature1 } from './messaging.contract';

@Injectable()
export class MessagingService {
  // Observable Source
  private messageToFeature1Source = new BehaviorSubject<IMessageToFeature1 | undefined>(undefined);
  // Observable Streams
  public messageToFeature1$ = this.messageToFeature1Source.asObservable();
  // Message Commands
  public messageToFeature1(message: IMessageToFeature1): void {
    this.messageToFeature1Source.next(message);
  }
}

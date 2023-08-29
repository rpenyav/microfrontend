import { InjectionToken } from '@angular/core';

class InjectionTokens {
  static messagingServiceInjectionToken = new InjectionToken('MessagingService');
}


interface IMessageToFeature1 {
  messageText: string;
  messageTime: Date;
}

export {
  IMessageToFeature1,
  InjectionTokens
};

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class MessageService {

  private subject: WebSocketSubject<any>;

  constructor() {
    this.connect();
  }

  public connect() {
    this.subject = webSocket({
      url: "wss://echo.websocket.org",
      openObserver: {
        next: () => {
            console.log('connexion ok');
        }
      },
      closeObserver: {
        next: () => {
            console.log('disconnect ok');
        }
      }
    });

    this.subject.subscribe(
      msg => console.log('message received: ' + msg),
      err => console.log(err),
      () => console.log('complete')
    );
  }

  public send(msg: string) {
    this.subject.next(msg);
  }

  public disconnect() {
    this.subject.complete();
  }
}
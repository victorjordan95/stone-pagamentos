import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { catchError, last, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    isLoading = false;
    headers = new Headers();
    private shouldShowDebugMessages = false;

    constructor(private _http: HttpClient) { }

    getBTC() {
        return this._http.get(`http://api.promasters.net.br/cotacao/v1/valores?moedas=USD,BTC&alt=json`, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            map(event => this.getEventMessage(event)),
            tap(message => this.showProgress(message)),
            last(), // return last (completed) message to caller
            catchError(this.handleError())
        );
    }

    private getEventMessage(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent:
                this.isLoading = true;
                return `Sending request of employees.`;

            case HttpEventType.DownloadProgress:
                const percentDone = Math.round(100 * event.loaded / event.total);
                return `The employee fetch is ${percentDone}% done.`;

            case HttpEventType.ResponseHeader:
                return `The response returned HTTP code ${event.status}`;

            case HttpEventType.Response:
                this.isLoading = false;
                if (this.shouldShowDebugMessages) {
                    console.log(`The download was successfull ${event.body}`);
                }
                return event.body;

            default:
                console.log(event);
                return `The fetch resulted in this surprising upload event: ${event}.`;
        }
    }

    private handleError() {
        const userMessage = `Upload failed.`;

        return (error: HttpErrorResponse) => {
            console.error(error); // log to console instead
            this.isLoading = false;
            const message = (error.error instanceof Error) ?
                error.error.message :
                `server returned code ${error.status} with body "${error.error}"`;
            return userMessage;
        };
    }

    private showProgress(message: string) {
        if (this.shouldShowDebugMessages) {
            console.log(message);
        }
    }

}

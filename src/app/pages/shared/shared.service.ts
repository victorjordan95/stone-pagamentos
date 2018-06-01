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

    getCurrencies() {
        return this._http.get(`https://api.promasters.net.br/cotacao/v1/valores?moedas=USD,BTC&alt=json`, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            map(event => this.getEventMessage(event)),
            tap(message => this.showProgress(message)),

            // Retorna a ultima (completa) mensagem
            last(),
            catchError(this.handleError())
        );
    }

    private getEventMessage(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent:
                this.isLoading = true;
                return `Sending request`;

            case HttpEventType.DownloadProgress:
                const percentDone = Math.round(100 * event.loaded / event.total);
                return `Fetch is ${percentDone}% done.`;

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

    convertDate(unix_timestamp) {

        // Cria um novo objeto baseado no timestamp
        // multiplica por 1000 pois o elemento está em milisegundos e não segundos.
        const date = new Date(unix_timestamp * 1000);

        // Formatando a data para que o
        // retorno seja em formato amigável
        return `${date.getDate()}/${date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth()}`}/${date.getUTCFullYear()}`;
    }

}

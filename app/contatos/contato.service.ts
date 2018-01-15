import { Injectable } from '@angular/core';
import { HttpModule, Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { Contato } from "./contato.model";
import { CONTATOS } from "./contatos-mock";
import { ServiceInterface } from '../interfaces/services.interface';


@Injectable()
export class ContatoService implements ServiceInterface<Contato> {

    private apiUrl: string = "app/contatos";
    private headers: Headers = new Headers({ 'Content-Type': 'application/json' })

    constructor(
        private http: Http
    ) {
    }

    findAll(): Promise<Contato[]> {
        return this.http.get(this.apiUrl).toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handlerError);
    }

    private handlerError(err: any): Promise<any> {
        console.log('Eror: ' + err);
        return Promise.reject(err.message || err);
    }

    find(id: number): Promise<Contato> {
        return this.findAll()
            .then((contatos: Contato[]) => contatos.find((contato) => contato.id === id)
            )
    }

    create(contato: Contato): Promise<Contato> {
        return this.http.post(this.apiUrl, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
            .catch(this.handlerError);
    };

    update(contato: Contato): Promise<Contato> {
        const url = this.apiUrl + '/' + contato.id;
        return this.http.put(url, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handlerError);
    }


    delete(contato: Contato): Promise<Contato> {
        const url = this.apiUrl + '/' + contato.id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handlerError);
    }

    search(term: string): Observable<Contato[]> {
        return this.http
            .get(this.apiUrl + "/?nome=" + term)
            .map((res: Response) => res.json().data as Contato[])
    }

    getContatoSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        })
            .then(() => {
                console.log('primeiro then');
                return 'Angular X';
            })
            .then((param: string) => {
                console.log('segundo then');
                console.log(param);
                return new Promise((resolveA, rejectA) => {
                    setTimeout(() => {
                        console.log('Promise inside promise  4 sec');
                        resolveA();
                    }, 4000);
                });
            })
            .then(() => {
                console.log('terceiro then');
                return this.findAll();
            });
    }
}
import { Injectable } from '@angular/core';

import { Contato } from "./contato.model";
import { CONTATOS } from "./contatos-mock";

@Injectable()
export class ContatoService {

    getContatos(): Promise<Contato[]> {
        return Promise.resolve(CONTATOS);
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
                return this.getContatos();
            });
    }
}
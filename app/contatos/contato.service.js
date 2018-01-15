"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
let ContatoService = class ContatoService {
    constructor(http) {
        this.http = http;
        this.apiUrl = "app/contatos";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    findAll() {
        return this.http.get(this.apiUrl).toPromise()
            .then(response => response.json().data)
            .catch(this.handlerError);
    }
    handlerError(err) {
        console.log('Eror: ' + err);
        return Promise.reject(err.message || err);
    }
    find(id) {
        return this.findAll()
            .then((contatos) => contatos.find((contato) => contato.id === id));
    }
    create(contato) {
        return this.http.post(this.apiUrl, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then((response) => response.json().data)
            .catch(this.handlerError);
    }
    ;
    update(contato) {
        const url = this.apiUrl + '/' + contato.id;
        return this.http.put(url, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handlerError);
    }
    delete(contato) {
        const url = this.apiUrl + '/' + contato.id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handlerError);
    }
    search(term) {
        return this.http
            .get(this.apiUrl + "/?nome=" + term)
            .map((res) => res.json().data);
    }
    getContatoSlowly() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        })
            .then(() => {
            console.log('primeiro then');
            return 'Angular X';
        })
            .then((param) => {
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
};
ContatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map
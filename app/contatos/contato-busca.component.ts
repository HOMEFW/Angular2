import { Component, OnInit, Input, OnChanges, EventEmitter, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';



@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover{
            cursor: pointer;
        }
    `]
})

export class ContatoBuscaComponent implements OnInit, OnChanges {

    contatos: Observable<Contato[]>;
    termoBusca: Subject<string> = new Subject<string>();
    @Input() busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.contatos = this.termoBusca
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }
    search(term: string): void {
        this.termoBusca.next(term);
        this.buscaChange.emit(term);
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
}
import { Component, OnInit } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "contato-detalhe",
    templateUrl: "contato-detalhe.component.html"
})

export class ContatoDetalheComponent implements OnInit {

    ngOnInit(): void {
        console.log('on init');
    }

}
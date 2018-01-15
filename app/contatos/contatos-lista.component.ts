import { Component, OnInit } from "@angular/core";
import { Contato } from "./contato.model";
import { ContatoService } from "./contato.service";
import { DialogService } from "../dialog.services";
import { clearTimeout } from "timers";

@Component({
    moduleId: module.id,
    selector: "contatos-lista",
    templateUrl: "contatos-lista.component.html"
})
export class ContatosListaComponent implements OnInit {
    contatos: Contato[] = [];
    mensagem: {};
    classCss: {};
    private currentTimeOut: any;

    constructor(
        private ContatoService: ContatoService,
        private dialogService: DialogService
    ) { }

    ngOnInit(): void {
        this.ContatoService.findAll() //getContatoSlowly
            .then((contatos: Contato[]) => {
                this.contatos = contatos;
            })
            .catch(err => {
                console.log(err);
                this.mostrarMensagem({ texto: 'Ocorreu um erro.' + err.mensagem, tipo: 'danger' });
            });
    }

    onDelete(contato: Contato): void {
        this.dialogService.confirm('Deseja deletar ' + contato.nome + ' ?')
            .then((canDelete: boolean) => {
                if (canDelete) {
                    this.ContatoService.
                        delete(contato)
                        .then((c: Contato) => {
                            this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
                            this.mostrarMensagem({ texto: 'Contato Excluído.', tipo: 'success' });
                        })
                        .catch(err => {
                            console.log(err);
                            this.mostrarMensagem({ texto: 'Ocorreu um erro.' + err.mensagem, tipo: 'danger' });
                        });
                }
            })
    }

    private mostrarMensagem(mensagem: { tipo: string, texto: string }): void {
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if (mensagem.tipo != 'danger') {
            console.log(this.currentTimeOut);

            if (this.currentTimeOut != undefined) {
                // clearTimeout(this.currentTimeOut.id);
            }

            this.currentTimeOut = setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
    }

    private montarClasses(tipo: string): void {
        this.classCss = {
            'alert': true,
        };
        this.classCss['alert-' + tipo] = true;
    }
}
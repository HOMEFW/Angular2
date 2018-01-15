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
const contato_service_1 = require("./contato.service");
const dialog_services_1 = require("../dialog.services");
let ContatosListaComponent = class ContatosListaComponent {
    constructor(ContatoService, dialogService) {
        this.ContatoService = ContatoService;
        this.dialogService = dialogService;
        this.contatos = [];
    }
    ngOnInit() {
        this.ContatoService.findAll() //getContatoSlowly
            .then((contatos) => {
            this.contatos = contatos;
        })
            .catch(err => {
            console.log(err);
            this.mostrarMensagem({ texto: 'Ocorreu um erro.' + err.mensagem, tipo: 'danger' });
        });
    }
    onDelete(contato) {
        this.dialogService.confirm('Deseja deletar ' + contato.nome + ' ?')
            .then((canDelete) => {
            if (canDelete) {
                this.ContatoService.
                    delete(contato)
                    .then((c) => {
                    this.contatos = this.contatos.filter((c) => c.id != contato.id);
                    this.mostrarMensagem({ texto: 'Contato Excluído.', tipo: 'success' });
                })
                    .catch(err => {
                    console.log(err);
                    this.mostrarMensagem({ texto: 'Ocorreu um erro.' + err.mensagem, tipo: 'danger' });
                });
            }
        });
    }
    mostrarMensagem(mensagem) {
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if (mensagem.tipo != 'danger') {
            console.log(this.currentTimeOut);
            if (this.currentTimeOut != undefined) {
            }
            this.currentTimeOut = setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
    }
    montarClasses(tipo) {
        this.classCss = {
            'alert': true,
        };
        this.classCss['alert-' + tipo] = true;
    }
};
ContatosListaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "contatos-lista",
        templateUrl: "contatos-lista.component.html"
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        dialog_services_1.DialogService])
], ContatosListaComponent);
exports.ContatosListaComponent = ContatosListaComponent;
//# sourceMappingURL=contatos-lista.component.js.map
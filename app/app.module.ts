import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { ContatosModule } from "./contatos/contatos.module"
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        ContatosModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule {

}
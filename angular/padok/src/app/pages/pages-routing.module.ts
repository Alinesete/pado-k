import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogOverviewExampleDialog, ProdutosComponent } from './produtos/produtos.component';
import { DialogClientes, ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'clientes', component: ClientesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

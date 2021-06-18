import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { HistFornecedoresComponent } from './hist-fornecedores/hist-fornecedores.component';
import { HistFuncionariosComponent } from './hist-funcionarios/hist-funcionarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { MateriaisComponent } from './materiais/materiais.component';
import { VendasComponent } from './vendas/vendas.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'funcionarios', component: FuncionariosComponent },
    { path: 'fornecedores', component: FornecedoresComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'materiais', component: MateriaisComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'histFornecedores', component: HistFornecedoresComponent },
    { path: 'histFuncionarios', component: HistFuncionariosComponent },
    { path: 'vendas', component: VendasComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
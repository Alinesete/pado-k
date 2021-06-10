import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { KanbanComponent } from './kanban/kanban.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { MateriaisComponent } from './materiais/materiais.component';
import { HistFornecedoresComponent } from './hist-fornecedores/hist-fornecedores.component';
import { HistFuncionariosComponent } from './hist-funcionarios/hist-funcionarios.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'kanban-board', component: KanbanComponent },
    { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
    { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
    { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
    { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UIModule) },
    { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
    { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
    { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
    { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
    { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
    { path: 'funcionarios', component: FuncionariosComponent },
    { path: 'fornecedores', component: FornecedoresComponent },
    { path: 'materiais', component: MateriaisComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'histFornecedores', component: HistFornecedoresComponent },
    { path: 'histFuncionarios', component: HistFuncionariosComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

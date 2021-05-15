import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';   
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'clientes', component: ClientesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

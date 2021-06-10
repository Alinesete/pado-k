import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Dashboard Component
 */
export class DashboardComponent implements OnInit {
  public funcionarios: Array<any>;
  public clientes: Array<any>;
  public produtos: Array<any>;
  public vendas: Array<any>;


  constructor(
    private db: AngularFirestore,
  ) {
    this.funcionarios = new Array<any>();
    this.clientes = new Array<any>();
    this.produtos = new Array<any>();
    this.vendas = new Array<any>();
    this.buscarfuncionarios();
    this.buscarclientes();
    this.buscarprodutos();
    this.buscarvendas();

    this.buscarfuncionarios().subscribe((data) => {
      this.funcionarios = data.map((e) => {
        return {
          id: e.payload.doc.data()['id'],
        };
      })
    });

    this.buscarclientes().subscribe((data) => {
      this.clientes = data.map((e) => {
        return {
          id: e.payload.doc.data()['id'],
        };
      })
    });

    

    this.buscarprodutos().subscribe((data) => {
      this.produtos = data.map((e) => {
        return {
          id: e.payload.doc.data()['id'],
        };
      })
    });

    this.buscarvendas().subscribe((data) => {
      this.vendas = data.map((e) => {
        return {
          id: e.payload.doc.data()['id'],
        };
      })
    });
  }

  buscarfuncionarios() {
    return this.db.collection("funcionarios").snapshotChanges();
  }

  buscarclientes() {
    return this.db.collection("clientes").snapshotChanges();
  }

  buscarprodutos() {
    return this.db.collection("produtos").snapshotChanges();
  }

  buscarvendas() {
    return this.db.collection("vendas").snapshotChanges();
  }
  ngOnInit(): void {
  }

}

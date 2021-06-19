import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-relatorioVendas',
  templateUrl: './relatorioVendas.component.html',
  styleUrls: ['./relatorioVendas.component.scss']
})
export class RelatorioVendasComponent implements OnInit {
  public dataVenda: number;
  public nomeFuncionario: string;
  public nomeCliente: string;
  public nomeProduto: Array<string>;
  public valorFinalVenda: number;
  public formaPgtoVenda: string;
  public vendas: Array<any>;
  public date: number;
  public selecionado: any;

  constructor(
    private db: AngularFirestore,
  ) {
    this.vendas = new Array<any>();
    this.getVendas();
    this.getVendas().subscribe((data) => {
      this.vendas = data.map((e) => {
        return {
          dataVenda: e.payload.doc.data()['dataVenda'],
          nomeFuncionario: e.payload.doc.data()['nomeFuncionario'],
          nomeCliente: e.payload.doc.data()['nomeCliente'],
          nomeProduto: e.payload.doc.data()['idProduto'][0]['nomeProduto'],
          valorFinalVenda: e.payload.doc.data()['valorFinalVenda'], 
          formaPgtoVenda: e.payload.doc.data()['formaPgtoVenda'],
          id: e.payload.doc.data()['id'], 
        };
      })
    });
    this.date = Date.now();
   }

 public getVendas(){
  return this.db.collection("vendas").snapshotChanges();
  }

  ngOnInit(): void {
  }

}
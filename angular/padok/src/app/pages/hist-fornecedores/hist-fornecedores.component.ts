import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-hist-fornecedores',
  templateUrl: './hist-fornecedores.component.html',
  styleUrls: ['./hist-fornecedores.component.scss']
})
export class HistFornecedoresComponent implements OnInit {
  public fornecedores: Array<any>;

  constructor(
    private db: AngularFirestore,
  ) { 
    this.fornecedores = Array<any>();
    this.getFornecedor();
    this.getFornecedor().subscribe((data) => {
      this.fornecedores = data.map((e) => {
        return {
          nomeFornecedor: e.payload.doc.data()['nomeFornecedor'],
          dataIni: e.payload.doc.data()['dataIni'],
          dataFim: e.payload.doc.data()['dataFim'],
          id: e.payload.doc.data()['id'],
        };
      })
    });
  }

  public getFornecedor(){
    return this.db.collection("historico_fornecedores").snapshotChanges();
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-hist-funcionarios',
  templateUrl: './hist-funcionarios.component.html',
  styleUrls: ['./hist-funcionarios.component.scss']
})
export class HistFuncionariosComponent implements OnInit {
  public funcionarios: Array<any>;

  constructor(
    private db: AngularFirestore,
  ) { 
    this.funcionarios = Array<any>();
    this.getFuncionarios();
    this.getFuncionarios().subscribe((data) => {
      this.funcionarios = data.map((e) => {
        return {
          nomeFuncionario: e.payload.doc.data()['nomeFuncionario'],
          dataIni: e.payload.doc.data()['dataIni'],
          dataFim: e.payload.doc.data()['dataFim'],
          id: e.payload.doc.data()['id'],
        };
      })
    });
  }

  public getFuncionarios(){
    return this.db.collection("historico_funcionarios").snapshotChanges();
  }

  ngOnInit(): void {
  }

}

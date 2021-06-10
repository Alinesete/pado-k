import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {
  public nomeFun: string;
  public cpfFun: string;
  public telFun: string;
  public endFun: string;
  public funcFun: string;
  public salFun: string;
  public funcionarios: Array<any>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.funcionarios = new Array<any>();
    this.getFuncionario();
    this.getFuncionario().subscribe((data) => {
      this.funcionarios = data.map((e) => {
        return {
          atvFuncionario: e.payload.doc.data()['atvFuncionario'],
          cpfFuncionario: e.payload.doc.data()['cpfFuncionario'],
          endFuncionario: e.payload.doc.data()['endFuncionario'],
          foneFuncionario: e.payload.doc.data()['foneFuncionario'],
          nomeFuncionario: e.payload.doc.data()['nomeFuncionario'],
          salFuncionario: e.payload.doc.data()['salFuncionario'],
          funFuncionario: e.payload.doc.data()['funFuncionario'],
          id: e.payload.doc.data()['id']
        };
      })
    });
  }

  gravarFuncionario() {
    var date = Date.now();

    var newFun = {
      atvFuncionario: true,
      cpfFuncionario: this.cpfFun,
      endFuncionario: this.endFun,
      foneFuncionario: this.telFun,
      nomeFuncionario: this.nomeFun,
      salFuncionario: this.salFun,
      funFuncionario: this.funcFun,
      id: date.toString()
    }
    this.db.collection("funcionarios").doc(date.toString()).set(newFun);

    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = (mes.length == 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    var histFornecedores = {
      nomeFuncionario: this.nomeFun,
      dataIni: diaF + "/" + mesF + "/" + anoF,
      dataFim: "Atual",
      id: date.toString()
    }
    this.db.collection("historico_funcionarios").doc(date.toString()).set(histFornecedores);

    Swal.fire({
        title: 'Tudo certo!',
        text: 'Funcionário gravado com sucesso!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#5438dc',
      });
    }

 public getFuncionario() {
    return this.db.collection("funcionarios").snapshotChanges();
  }





  ngOnInit(): void {
  }

}

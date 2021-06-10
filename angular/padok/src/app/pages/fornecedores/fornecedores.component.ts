import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {
  public nomeFornecedor: string;
  public regFornecedor: string;
  public foneFornecedor: string;
  public endFornecedor: string;
  public fornecedores: Array<any>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.fornecedores = new Array<any>();
    this.getFuncionario();
    this.getFuncionario().subscribe((data) => {
      this.fornecedores = data.map((e) => {
        return {
          atvFornecedor: e.payload.doc.data()['atvFornecedor'],
          endFornecedor: e.payload.doc.data()['endFornecedor'],
          foneFornecedor: e.payload.doc.data()['foneFornecedor'],
          idFornecedor: e.payload.doc.data()['idFornecedor'],
          nomeFornecedor: e.payload.doc.data()['nomeFornecedor'],
          regFornecedor: e.payload.doc.data()['regFornecedor']
        };
      })
    });
  }

  gravarFuncionario() {
    var date = Date.now();

    var newFornecedor = {
      atvFornecedor: true,
      nomeFornecedor: this.nomeFornecedor,
      foneFornecedor: this.foneFornecedor,
      endFornecedor: this.endFornecedor,
      regFornecedor: this.regFornecedor,
      id: date.toString()
    }
    this.db.collection("fornecedores").doc(date.toString()).set(newFornecedor);

    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = (mes.length == 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    var histFornecedores = {
      nomeFornecedor: this.nomeFornecedor,
      dataIni: diaF + "/" + mesF + "/" + anoF,
      dataFim: "Atual",
      id: date.toString()
    }
    this.db.collection("historico_fornecedores").doc(date.toString()).set(histFornecedores);

    Swal.fire({
      title: 'Tudo certo!',
      text: 'Fornecedor gravado com sucesso!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#5438dc',
    });
  }

  public getFuncionario() {
    return this.db.collection("fornecedores").snapshotChanges();
  }





  ngOnInit(): void {
  }

}

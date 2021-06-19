import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  public novoAtv: String;
  public novoNomeFornecedor: String;
  public novoFoneFornecedor: String;
  public novoEndFornecedor: String;
  public novoRegFornecedor: String;
  public novoId: string




  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal
  ) {
    this.fornecedores = new Array<any>();
    this.getFuncionario();
    this.getFuncionario().subscribe((data) => {
      this.fornecedores = data.map((e) => {
        return {
          atvFornecedor: e.payload.doc.data()['atvFornecedor'],
          endFornecedor: e.payload.doc.data()['endFornecedor'],
          foneFornecedor: e.payload.doc.data()['foneFornecedor'],
          id: e.payload.doc.data()['id'],
          nomeFornecedor: e.payload.doc.data()['nomeFornecedor'],
          regFornecedor: e.payload.doc.data()['regFornecedor']
        };
      })
    });
  }



  modalMenu(centerDataModal: any, fornecedor) {
    console.log(fornecedor)

    this.novoNomeFornecedor =  fornecedor.nomeFornecedor;
    this.novoFoneFornecedor = fornecedor.foneFornecedor;
    this.novoEndFornecedor = fornecedor.endFornecedor;
    this.novoRegFornecedor = fornecedor.regFornecedor;
    this.novoId = fornecedor.id;
   
    this.modalService.open(centerDataModal, { centered: true });
  }

  deletar(id){
    this.db.collection("fornecedores").doc(id).delete();
  }

  EditarProduto(){
    var newFornecedor = {
      atvFornecedor: this.novoNomeFornecedor,
      nomeFornecedor: this.novoNomeFornecedor,
      foneFornecedor: this.novoFoneFornecedor,
      endFornecedor: this.novoEndFornecedor,
      regFornecedor: this.novoRegFornecedor,
      id: this.novoId
    }
    console.log(newFornecedor)


    this.db.collection("fornecedores").doc(this.novoId).set(newFornecedor);
    this.novoNomeFornecedor =  "";
    this.novoFoneFornecedor = "";
    this.novoEndFornecedor = "";
    this.novoRegFornecedor = "";
    this.novoId = "";

    Swal.fire({
      title: 'Tudo certo!',
      text: 'Fornecedor atualizado com sucesso!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#5438dc',
    });
    this.modalService.dismissAll();
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

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  public novoAtvFuncionario: String;
  public novoCpfFuncionario: String;
  public novoEndFuncionario: String;
  public novoFoneFuncionario: String;
  public novoNomeFuncionario: String;
  public novoSalFuncionario: String;
  public novoFunFuncionario: String;
  public novoId: string

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal
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

    
  modalMenu(centerDataModal: any, fun) {
    this.novoAtvFuncionario =  fun.atvFuncionario;
    this.novoCpfFuncionario =  fun.cpfFuncionario;
    this.novoEndFuncionario =  fun.endFuncionario;
    this.novoFoneFuncionario =  fun.foneFuncionario;
    this.novoNomeFuncionario =  fun.nomeFuncionario;
    this.novoSalFuncionario =  fun.salFuncionario;
    this.novoFunFuncionario = fun.funFuncionario;
    this.novoId = fun.id;
   
    this.modalService.open(centerDataModal, { centered: true });
  }

 public getFuncionario() {
    return this.db.collection("funcionarios").snapshotChanges();
  }

  deletar(id){
    this.db.collection("funcionarios").doc(id).delete();
  }

  EditarProduto(){
    var newFun = {
      atvFuncionario: this.novoAtvFuncionario,
      cpfFuncionario: this.novoCpfFuncionario,
      endFuncionario: this.novoEndFuncionario,
      foneFuncionario: this.novoFoneFuncionario,
      nomeFuncionario: this.novoNomeFuncionario,
      salFuncionario: this.novoSalFuncionario,
      funFuncionario: this.novoFunFuncionario,
      id: this.novoId
    }




    this.db.collection("funcionarios").doc(this.novoId).set(newFun);
    this.novoAtvFuncionario =  '';
    this.novoCpfFuncionario =  '';
    this.novoEndFuncionario =  '';
    this.novoFoneFuncionario =  '';
    this.novoNomeFuncionario =  '';
    this.novoSalFuncionario =  '';
    this.novoFunFuncionario = '';
    this.novoId = '';

    Swal.fire({
      title: 'Tudo certo!',
      text: 'Funcionário atualizado com sucesso!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#5438dc',
    });
    this.modalService.dismissAll();
  }




  ngOnInit(): void {
  }

}

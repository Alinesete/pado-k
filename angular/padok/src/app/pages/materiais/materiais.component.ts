import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  styleUrls: ['./materiais.component.scss']
})
export class MateriaisComponent implements OnInit {
  public nomeMaterial: String;
  public descMaterial: String;
  public qtdMaterial: String;
  public materiais: Array<any>;
  public date: number;
  public selecionado: any;

  public novoNomeMaterial : String;
  public novoDescMaterial : String;
  public novoQtdMaterial : String;
  public novoAtvMaterial : String;
  public novoId : string;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal
  ) {
    this.materiais = new Array<any>();
    this.getMateriais();
    this.getMateriais().subscribe((data) => {
      this.materiais = data.map((e) => {
        return {
          nomeMaterial: e.payload.doc.data()['nomeMaterial'],
          descMaterial: e.payload.doc.data()['descMaterial'],
          qtdMaterial: e.payload.doc.data()['qtdMaterial'], 
          id: e.payload.doc.data()['id'], 
        };
      })
    });
    this.date = Date.now();
   }

 



  gravarMateriais(){
    

    var newMaterial = {
      atvFornecedor: true,
      nomeMaterial: this.nomeMaterial,
      descMaterial: this.descMaterial,
      qtdMaterial: this.qtdMaterial,
      id: this.date.toString()
    }
    this.db.collection("materiais").doc(this.date.toString()).set(newMaterial);

    Swal.fire({
      title: 'Tudo certo!',
      text: 'Material gravado com sucesso!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#5438dc',
    });
  }

 public getMateriais(){
  return this.db.collection("materiais").snapshotChanges();
  }



  modalMenu(centerDataModal: any, material) {

    this.novoNomeMaterial =  material.nomeMaterial;
    this.novoDescMaterial= material.descMaterial;
    this.novoQtdMaterial = material.qtdMaterial;
    this.novoId = material.id;

    console.log(material);



   
    this.modalService.open(centerDataModal, { centered: true });
  }

  deletar(id){
    this.db.collection("materiais").doc(id).delete();
  }

  EditarProduto(){
    var newMaterial = {
      descMaterial: this.novoDescMaterial,
      nomeMaterial: this.novoNomeMaterial,
      qtdMaterial: this.novoQtdMaterial,
      id: this.novoId
    }

    console.log(newMaterial);


    this.db.collection("materiais").doc(this.novoId).set(newMaterial);
    this.novoAtvMaterial =  "";
    this.nomeMaterial = "";
    this.novoDescMaterial = "";
    this.novoQtdMaterial = "";
    this.novoId = "";

    Swal.fire({
      title: 'Tudo certo!',
      text: 'Material atualizado com sucesso!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#5438dc',
    });
    this.modalService.dismissAll();
  }
  



  ngOnInit(): void {
  }

}
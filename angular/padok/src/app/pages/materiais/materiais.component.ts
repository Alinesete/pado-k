import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.component.html',
  styleUrls: ['./materiais.component.scss']
})
export class MateriaisComponent implements OnInit {
  public nomeMaterial: string;
  public descMaterial: string;
  public qtdMaterial: string;
  public materiais: Array<any>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.materiais = new Array<any>();
    this.getMateriais();
    this.getMateriais().subscribe((data) => {
      this.materiais = data.map((e) => {
        return {
          nomeMaterial: e.payload.doc.data()['nomeMaterial'],
          descMaterial: e.payload.doc.data()['descMaterial'],
          qtdMaterial: e.payload.doc.data()['qtdMaterial'],
        };
      })
    });
   }

  gravarMateriais(){
    var date = Date.now();

    var newMaterial = {
      atvFornecedor: true,
      nomeMaterial: this.nomeMaterial,
      descMaterial: this.descMaterial,
      qtdMaterial: this.qtdMaterial,
      id: date.toString()
    }
    this.db.collection("materiais").doc(date.toString()).set(newMaterial);

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

  



  ngOnInit(): void {
  }

}
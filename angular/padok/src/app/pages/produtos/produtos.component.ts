import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  public nomeProduto: string;
  public descProduto: string;
  public precoProduto: number;
  public qtdProduto: number;
  public produtos: Array<any>;
  public img: any;
  public fileFormat: any;
  public type: any;
  public files: any;
  public file: any;
  public saveFileData: any;
  public config: any;


  public novoDescProduto: String;
  public novoNomeProduto: String;
  public novoPrecoProduto: String;
  public novoQtdProduto: String;
  public novoImgProduto: String;
  public novoId: string;


  public users: Array<any>;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private modalService: NgbModal
  ) { 
    this.produtos = new Array<any>();


    this.getProdutos();
    this.getProdutos().subscribe((data) => {
      this.produtos = data.map((e) => {
        return {
          nomeProduto: e.payload.doc.data()['nomeProduto'],
          descProduto: e.payload.doc.data()['descProduto'],
          precoProduto: e.payload.doc.data()['precoProduto'],
          qtdProduto: e.payload.doc.data()['qtdProduto'],
          imgProduto: e.payload.doc.data()['imgProduto'],
          id: e.payload.doc.data()['id']
        };
      })
    });
  }

  public modalMenu(centerDataModal: any, produto) {

    this.novoDescProduto =  produto.descProduto;
    this.novoNomeProduto= produto.nomeProduto;
    this.novoQtdProduto = produto.qtdProduto;
    this.novoPrecoProduto = produto.precoProduto;
    this.novoImgProduto = produto.imgProduto;
    this.novoId = produto.id;


   
    this.modalService.open(centerDataModal, { centered: true });
  }


  deletar(id){
    this.db.collection("produtos").doc(id).delete()
  }


  EditarProduto(){
    var newMaterial = {
      descProduto: this.novoDescProduto,
      nomeProduto: this.novoNomeProduto,
      precoProduto: this.novoPrecoProduto,
      imgProduto: this.novoImgProduto,
      qtdProduto: this.novoQtdProduto,
      id: this.novoId
    }


    this.db.collection("produtos").doc(this.novoId).set(newMaterial);
    this.novoDescProduto =  "";
    this.novoNomeProduto = "";
    this.novoPrecoProduto = "";
    this.novoQtdProduto = "";
    this.novoImgProduto = "";
    this.novoId = "";



    Swal.fire({
      title: 'Tudo certo!',
      text: 'Produto atualizado com sucesso!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#5438dc',
    });
    this.modalService.dismissAll();
  }
  




  getProdutos(){
    return this.db.collection("produtos").snapshotChanges();
  }
  

  gravarProduto() {
    var date = Date.now();

    var newProduto = {
      nomeProduto: this.nomeProduto,
      descProduto: this.descProduto,
      precoProduto: this.precoProduto,
      qtdProduto: this.qtdProduto,
      imgProduto: this.img,
      id: date.toString()
    }
    this.db.collection("produtos").doc(date.toString()).set(newProduto);

    Swal.fire({
        title: 'Tudo certo!',
        text: 'Produto gravado com sucesso!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#5438dc',
      });
    }


    onUploadSuccess(event, id) {
      this.fileFormat = event[0].name;
      this.type = event[0].type;
      this.files = event[1].files.file.replace("data:" +  this.type + ";base64,","");
      console.log(event);
    
      const byteCharacters = atob(this.files);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: this.type});
    
     
        this.file = blob;
        this.startUpload();
      }
  
      startUpload() {
  
        // The storage path
        const path = `padok/${Date.now()}_${this.file.name}`;;
        // Reference to storage bucket
        const ref = this.storage.ref(path);
        // The main task
        this.task = this.storage.upload(path, this.file);
        this.percentage = this.task.percentageChanges();
        this.task.snapshotChanges().pipe(
          finalize( async() =>  {
            ref.getDownloadURL().subscribe(downloadURL => {
              this.saveFileData = downloadURL;
              this.img = this.saveFileData;
              console.log(this.img);
            });
          })
        ).subscribe();
      }


  ngOnInit(): void {
  }

}

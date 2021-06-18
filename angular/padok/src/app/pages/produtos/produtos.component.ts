import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
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
  public precoProduto: string;
  public qtdProduto: number;
  public produtos: Array<any>;
  public img: any;
  public fileFormat: any;
  public type: any;
  public files: any;
  public file: any;
  public saveFileData: any;
  public config: any;
  public users: Array<any>;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
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


  deletar(id){
    this.db.collection("produtos").doc(id).delete()
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

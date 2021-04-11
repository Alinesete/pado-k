import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { analytics } from 'firebase';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  public produtos: Array<any>;
  public nomeProduto: string;
  public precoProduto: string;
  public descProduto: string;
  public imgProduto: string;



  constructor(
    private db: AngularFirestore,
    public dialog: MatDialog

  ) {
    this.produtos = new Array<any>();



   this.readProdutos();
   this.readProdutos().subscribe((data) => {
    this.produtos = data.map((e) => {
      return {
        imgProduto: e.payload.doc.data()['imgProduto'],
        precoProduto: e.payload.doc.data()['precoProduto'],
        nomeProduto: e.payload.doc.data()['nomeProduto'],
        descProduto: e.payload.doc.data()['descProduto'],
        id: e.payload.doc.data()['id']
      };
    })
  });
   }

   ngOnInit(){

   }
   private readProdutos(){
    return this.db.collection('produtos').snapshotChanges();
   }

   public deleteProduto(id){
     this.db.collection('produtos').doc(id).delete();
   }



   openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}



@Component({
  selector: 'app-produtos',
  templateUrl: 'dialog-overview.html',
})
export class DialogOverviewExampleDialog {
  public fileFormat: any;
  public type: any;
  public files: any;
  public file: any;
  public saveFileData: any;
  public imagens: any;

  public produtos: Array<any>;
  public nomeProduto: string;
  public precoProduto: string;
  public descProduto: string;
  public imgProduto: string;

  task: AngularFireUploadTask;
  percentage: Observable<number>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public createProduto(){
    var date = Date.now().toString();
    var produto = {
      nomeProduto: this.nomeProduto,
      precoProduto: this.precoProduto,
      descProduto: this.descProduto,
      imgProduto: this.saveFileData,
      id: date
    }

    this.db.collection("produtos").doc(date).set(produto);
    this.dialogRef.close();
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
      console.log("fotas",this.file);  

    this.startUpload();


  }

  startUpload() {

    // The storage path
    const path = `ancora/${Date.now()}_${this.file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);
  
    // The main task
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
  

    this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize( async() =>  {
        ref.getDownloadURL().subscribe(downloadURL => {
         
        

          
          this.saveFileData = downloadURL;


        });
      })
    ).subscribe();
  }

}

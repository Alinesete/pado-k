import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { analytics } from 'firebase';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  public clientes: Array<any>;
  public nomeCliente: string;
  public regCliente: string;
  public foneCliente: string;
  public tipoCliente: string;

  constructor(
    private db: AngularFirestore,
    public dialog: MatDialog

  ) {
    this.clientes = new Array<any>();

   this.readClientes();
   this.readClientes().subscribe((data) => {
    this.clientes = data.map((e) => {
      return {
        regCliente: e.payload.doc.data()['regCliente'],
        nomeCliente: e.payload.doc.data()['nomeCliente'],
        foneCliente: e.payload.doc.data()['foneCliente'],
        tipoCliente: e.payload.doc.data()['tipoCliente'],
        id: e.payload.doc.data()['id']
      };
    })
  });
   }

   ngOnInit(){

   }
   private readClientes(){
    return this.db.collection('clientes').snapshotChanges();
   }

   public deleteCliente(id){
     console.log(id);
     this.db.collection('clientes').doc(id).delete();
   }

   public updateCliente(cliente){
    const dialogRef = this.dialog.open(DialogClientes, {
      data: { nomeCliente: cliente.nomeCliente,
      regCliente: cliente.regCliente,
      foneCliente: cliente.foneCliente,
      tipoCliente: cliente.tipoCliente,
      id: cliente.id,
    },

      width: '400px',
    });
   }



   openDialog(): void {
    const dialogRef = this.dialog.open(DialogClientes, {
      data: {
        nomeCliente: '',
        regCliente: '',
        foneCliente: '',
        tipocliente: '',
        id: '',
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}



@Component({
  selector: 'app-clientes',
  templateUrl: 'dialog-clientes.html',
})
export class DialogClientes {
  public clientes: Array<any>;
  public nomeCliente: string;
  public regCliente: string;
  public foneCliente: string;
  public tipoCliente: string;
  public id: string;

  task: AngularFireUploadTask;
  percentage: Observable<number>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<DialogClientes>,
    @Inject(MAT_DIALOG_DATA) public data: 
    {
      nomeCliente: string,
      regCliente: string,
      foneCliente: string,
      id: string,
      tipoCliente: string,
    }
    ) {

this.nomeCliente = this.data.nomeCliente;
this.regCliente = this.data.regCliente;
this.foneCliente = this.data.foneCliente;
this.tipoCliente = this.data.tipoCliente;
this.id = this.data.id;


    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public createCliente(){
    var date = Date.now().toString();
    var cliente = {
      nomeCliente: this.nomeCliente,
      regCliente: this.regCliente,
      foneCliente: this.foneCliente,
      tipoCliente: this.tipoCliente,
      id: date
    }
    if(this.id == undefined || this.id == ''){
      this.db.collection("clientes").doc(date).set(cliente);
      this.dialogRef.close();
    } else {
      this.db.collection("clientes").doc(this.id).update(cliente);
      this.dialogRef.close();
    }


  }
}
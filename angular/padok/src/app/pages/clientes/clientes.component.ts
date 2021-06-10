import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  public nomeCliente: string;
  public regCliente: string;
  public foneCliente: string;
  public tipoCliente: string;
  public clientes: Array<any>;


  constructor(
    private db: AngularFirestore,
  ) {
    this.clientes = new Array<any>();
    this.getClientes();
    this.getClientes().subscribe((data) => {
      this.clientes = data.map((e) => {
        return {
          nomeCliente: e.payload.doc.data()['nomeCliente'],
          regCliente: e.payload.doc.data()['regCliente'],
          foneCliente: e.payload.doc.data()['foneCliente'],
          tipoCliente: e.payload.doc.data()['tipoCliente'],
          id: e.payload.doc.data()['id']
        };
      })
    });
  }

  gravarClientes() {
    var date = Date.now();

    var newClientes = {
      nomeCliente: this.nomeCliente,
      regCliente: this.regCliente,
      foneCliente: this.foneCliente,
      tipoCliente: this.tipoCliente,
      id: date.toString()
    }
    this.db.collection("clientes").doc(date.toString()).set(newClientes);

    Swal.fire({
        title: 'Tudo certo!',
        text: 'Cliente gravado com sucesso!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#5438dc',
      });
    }

 public getClientes() {
    return this.db.collection("clientes").snapshotChanges();
  }





  ngOnInit(): void {
  }

}


import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {
  public produtos : Array<any>;
  public produtosAux : Array<any>;
  public totalProdutos: Array<any>;
  public totalPrecoProdutos: number;
  public searchTerm : String;

  public nomeFun: String;
  public nomeCliente: String;
  public formaPgtoVenda: String;
  public data: string;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal
  ) { 
    this.produtos = new Array<any>();
    this.totalPrecoProdutos = 0.0;
    this.produtosAux = new Array<any>();
    this.totalProdutos = new Array<any>();

    var data = new Date(),
    dia = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = (mes.length == 1) ? '0' + mes : mes,
    anoF = data.getFullYear();
    this.data = diaF + "/" + mesF + "/" + anoF,


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
      this.produtosAux = this.produtos;
    });
   
  }

  adcLista(produtos: Array<any>, preco: number){ 
  this.totalProdutos.push(produtos);
  this.totalPrecoProdutos =  this.totalPrecoProdutos + preco;
  }



  vender(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true });
  }



  getProdutos(){
    return this.db.collection("produtos").snapshotChanges();
  }

  setFilteredItems() {
    this.produtosAux = this.filterItems(this.searchTerm);
  }

  finalizarCompra(){
    var date = Date.now();
    var compra = {
      dataVenda : this.data,
      formaPgtoVenda: this.formaPgtoVenda,
      nomeCliente: this.nomeCliente,
      nomeFuncionario: this.nomeFun,
      valorFinalVenda: this.totalPrecoProdutos,
      idProduto: this.totalProdutos,
      id: date
    }
    this.db.collection("vendas").doc(date.toString()).set(compra);
    this.totalProdutos = new Array<any>();
    this.totalPrecoProdutos = 0.0
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Tudo certo!',
      text: 'Venda finalizada com sucesso!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#5438dc',
    });
   

  }

  filterItems(searchTerm) {
    return this.produtos.filter(objVO0538 => {
      var conteudo = objVO0538.nomeProduto;
      return conteudo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  

  ngOnInit(): void {
  }

}

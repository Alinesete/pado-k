import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(
    private db: AngularFirestore,
  ) { 
    this.produtos = new Array<any>();
    this.totalPrecoProdutos = 0.0;
    this.produtosAux = new Array<any>();
    this.totalProdutos = new Array<any>();

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


  getProdutos(){
    return this.db.collection("produtos").snapshotChanges();
  }

  setFilteredItems() {
    this.produtosAux = this.filterItems(this.searchTerm);
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

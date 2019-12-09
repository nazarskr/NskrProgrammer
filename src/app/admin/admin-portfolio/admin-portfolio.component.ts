import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { IPortfolio } from '../../shared/interfaces';
import { Portfolio } from '../../shared/classes/portfolio.class';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-portfolio',
  templateUrl: './admin-portfolio.component.html',
  styleUrls: ['./admin-portfolio.component.scss']
})
export class AdminPortfolioComponent implements OnInit {
  productName: string;
  productUrl: string;
  productImageUrl: string;
  productStack: string;
  productDescription: string;
  productDate: Date;
  portfolioData: any;
  product: IPortfolio;
  productId: string;
  uploadImage: any;
  imageName: string;
  ref: any;
  newImageUrl: any;
  uploadProgress$: Observable<number>;
  constructor(private portfolioService: PortfolioService,
              private afStorage: AngularFireStorage) {
                this.getPortfolio();
  }

  ngOnInit() {
  }
  getPortfolio() {
    this.portfolioService
    .getPortfolio()
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    )
    .subscribe(res => {
      this.portfolioData = res;
    });
  }
  createProduct() {
    if (this.productName && this.productUrl && this.productImageUrl && this.productStack && this.productDescription) {
      this.productDate = new Date();
      const newProduct = new Portfolio
      (this.productName, this.productUrl, this.productImageUrl, this.productStack, this.productDescription, this.productDate);
      this.portfolioService.createProduct(newProduct)
          .then(() => {
              this.productName = '';
              this.productUrl = '';
              this.productImageUrl = '';
              this.productStack = '';
              this.productDescription = '';
      });
      alert('Create successful');
    } else {
      alert('Enter all data');
    }
  }
  deleteProduct(product) {
    const delProduct = confirm('Are you sure?');
    if (delProduct) {
      this.portfolioService.deleteProduct(product.id);
      this.afStorage.storage.refFromURL(product.imageUrl).delete();
    } else {
      alert('Cancelled');
    }
  }
  editProduct(product) {
    this.product = product;
    this.productId = product.id;
    this.productName = product.name;
    this.productUrl = product.url;
    this.productImageUrl = product.imageUrl;
    this.productStack = product.stack;
    this.productDescription = product.description;
    this.productDate = product.date;
  }
  updateProduct() {
    this.product.name = this.productName;
    this.product.url = this.productUrl;
    this.product.imageUrl = this.productImageUrl;
    this.product.stack = this.productStack;
    this.product.description = this.productDescription;
    this.product.date = this.productDate;
    this.portfolioService.updateProduct(this.productId, this.product)
                    .then(() => {
                      this.productName = '';
                      this.productUrl = '';
                      this.productImageUrl = '';
                      this.productStack = '';
                      this.productDescription = '';
                      this.productDate = null;
    });
    alert('Update successful');
  }
  upload() {
    if (this.imageName) {
     const task = this.afStorage.upload(`portfolioImages/${this.imageName}`, this.uploadImage);
     this.uploadProgress$ = task.percentageChanges();
     this.afStorage.upload(`portfolioImages/${this.imageName}`, this.uploadImage).then(() => {
        const storage = firebase.storage();
        const pathReference = storage.ref(`portfolioImages/${this.imageName}`);
        pathReference.getDownloadURL().then((url) => {
          this.productImageUrl = url;
          document.getElementById('progress').style.display = 'none';
        }).catch((error) => {
          console.log(error);
        });
      });
    }
  }
  onFilesAdded(files: File[]) {
    files.forEach(file => {
      this.imageName = file.name;
      this.uploadImage = file;
    });
  }
  onFilesRejected(file: File) {
    console.log(file);
  }

}

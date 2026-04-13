




export class Product {
    productId: number;
    productTitle: string;
    productPrice: number;

    constructor(productId: number, productTitle: string, productPrice: number) {
        this.productId = productId;
        this.productTitle = productTitle;
        this.productPrice = productPrice;
    }

   public getProductId(): number {
       return this.productId;
   }
   
   public getProductTitle(): string {
       return this.productTitle;
   }

   public getProductPrice(): number {
       return this.productPrice;
   }

   public setProductTitle(productTitle: string): void {
            this.productTitle = productTitle;
   }

   public setProductPrice(productPrice: number): void {
       this.productPrice = productPrice;
   }


   printProduct(): string {
     return `Product ID: ${this.productId}, Title: ${this.productTitle}, Price: ${this.productPrice.toFixed(2)} DH`;
   }
}
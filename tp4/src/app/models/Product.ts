




export class Product {
   private productId: number;
   private productTitle: string;
   private productPrice: number;
   private quantity: number;
   private category:string;
   private imageUrl: string;
    constructor(productId: number, productTitle: string, productPrice: number, quantity: number, category: string, imageUrl: string) {
        this.productId = productId;
        this.productTitle = productTitle;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.category = category;
        this.imageUrl = imageUrl;
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
   public getQuantity(): number {
       return this.quantity;
   }

   public getCategory(): string {
       return this.category;
   }

   public getImageUrl(): string {
       return this.imageUrl;
   }

   public setProductTitle(productTitle: string): void {
            this.productTitle = productTitle;
   }

   public setProductPrice(productPrice: number): void {
       this.productPrice = productPrice;
   }

   public setQuantity(quantity: number): void {
       this.quantity = quantity;
   }

   public setCategory(category: string): void {
       this.category = category;
   }

   public setImageUrl(imageUrl: string): void {
       this.imageUrl = imageUrl;
   }

   printProduct(): string {
     return `Product ID: ${this.productId}, Title: ${this.productTitle}, Price: ${this.productPrice.toFixed(2)} DH`;
   }

   decreaseQuantity(amount: number = 1): boolean {
    if(this.quantity >= amount) {
        this.quantity -= amount;
        return true;
    }
    return false;

   }

   increaseQuantity(amount: number = 1): void {
    this.quantity += amount;
   }
}

import { Product } from "./Product";

export class ShoppingCartItem {
    
    constructor(public itemProduct: Product,public quantity: number){}

    addProduct(quantity: number = 1): void {
     this.quantity += quantity;
    }
    subtractProduct(quantity: number): void {
        this.quantity -= quantity;
        if (this.quantity < 0) {    
            this.quantity = 0;
        }
    }

    displayItem(): string {
        return `Product: ${this.itemProduct.getProductTitle()}, Quantity: ${this.quantity} `;
    }

    getTotalPrice(): number {
        return this.itemProduct.getProductPrice() * this.quantity;
    }
}

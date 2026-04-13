
import { Product } from "./Product";

export class ShoppingCartItem {
    
    constructor(public itemProduct: Product,public quantity: number){}

    addProduct(otherItem: ShoppingCartItem): void {
     this.quantity+= otherItem.quantity;
    }
    subtractProduct(otherItem: ShoppingCartItem): void {
        this.quantity -= otherItem.quantity;
        if(this.quantity < 0){
            this.quantity = 0;
        }
    }

    displayItem(): string {
        return `Product: ${this.itemProduct.getProductTitle()}, Quantity: ${this.quantity} `;
    }
}

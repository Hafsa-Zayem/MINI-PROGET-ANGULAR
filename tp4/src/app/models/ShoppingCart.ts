
import { ShoppingCartItem } from "./ShoppingCartItem";
import { Product } from "./Product";

export class ShoppingCart {
    private itemsProduct: ShoppingCartItem[] = [] ;
    private total: number =0;

    constructor(){}

     addItem(product: Product , quantity: number): void {
        const newItem = new ShoppingCartItem(product, quantity);
        const existingItem = this.itemsProduct.find(
            (item) => item.itemProduct.getProductId() === product.getProductId()
        );
        if (existingItem) {
            existingItem.addProduct(quantity);

        } else {
            this.itemsProduct.push(newItem); 
        }
        this.total += product.getProductPrice() * quantity;
     }

     removeItem(product: Product, quantity: number): void {
        const existingItem = this.itemsProduct.find(
            (item) => item.itemProduct.getProductId() === product.getProductId()
        );
        if (!existingItem) return;

        const actualRemovedQuantity = Math.min(quantity, existingItem.quantity);

        const removItem = new ShoppingCartItem(product, quantity)
            existingItem.subtractProduct(quantity);
            this.total -= product.getProductPrice() * actualRemovedQuantity;
            if(this.total < 0) this.total =0;
            
            if (existingItem.quantity === 0){
                this.itemsProduct = this.itemsProduct.filter(
                    item => item.itemProduct.getProductId() !== product.getProductId()

                );
            }
        

    }

    getItems(): ShoppingCartItem[] {
        return [...this.itemsProduct];
    }
    getTotal(): number {
        return this.total;
    }
}


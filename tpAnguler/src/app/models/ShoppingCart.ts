
import { ShoppingCartItem } from "./ShoppingCartItem";
import { Product } from "./Product";

export class ShoppingCart {
    private itemsProduct: ShoppingCartItem[] ;
    private total: number;

    constructor(){
        this.itemsProduct = [];
        this.total = 0;
    }

     addItem(product: Product , quantity: number): void {
        const newItem = new ShoppingCartItem(product, quantity);
        const existingItem = this.itemsProduct.find(
            (item) => item.itemProduct.getProductId() === product.getProductId()
        );
        if (existingItem) {
            existingItem.addProduct(newItem);

        } else {
            this.itemsProduct.push(newItem); 
        }
        this.total += product.getProductPrice() * quantity;
     }

     removeItem(product: Product, quantity: number): void {
        const removeItem = new ShoppingCartItem(product, quantity);
        const existingItem = this.itemsProduct.find(
            (item) => item.itemProduct.getProductId() === product.getProductId()
        );
        if (existingItem){
            existingItem.subtractProduct(new ShoppingCartItem(product, quantity));
            this.total -= product.getProductPrice() * quantity;
        }

    }
}


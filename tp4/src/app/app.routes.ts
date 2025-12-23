import { Routes } from '@angular/router';
import { Catalog } from './components/catalog/catalog';
import { Cart } from './components/cart/cart';
import { ProductDetails } from './components/product-details/product-details';
import {Login } from './components/login/login'
import { authGuard } from './guards/auth-guard-guard';


export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: Login
    },


    {
        path: 'catalog',
        component: Catalog,
        canActivate: [authGuard]
    },

    {
        path: 'catalog/:category',
        component: Catalog,
        canActivate: [authGuard]
    },

    {
        path: 'cart',
        component: Cart,
        canActivate: [authGuard]
    },

    {
        path: 'product-details/:id',
        component: ProductDetails,
        canActivate: [authGuard]
    },

    {
        path: '**',
        redirectTo: '/login'
    }
];

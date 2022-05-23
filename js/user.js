import { Item } from "/js/item.js";
import { items } from "/js/config.js";

export class User {
    constructor(name, age, effectClick, effectRealEstate, effectFinancialProduct, haveBurgers, haveMoney, spentDays, haveItems, newUser, rich) {
        this.name = name;
        // 新規登録
        if(newUser) {
            this.age = 20;
            this.effectClick = 25;
            this.effectRealEstate = 0;
            this.effectFinancialProduct = 0;
            this.haveBurgers = 0;
            this.haveMoney = 50000;
            this.spentDays = 1;
            this.haveItems = items.map(item => new Item(item.name, 
                                                        item.type, 
                                                        item.effect, 
                                                        0,
                                                        item.maxAmount, 
                                                        item.description, 
                                                        item.imageUrl, 
                                                        item.price));
        } else if(name == "rich") {
            this.age = 50;
            this.effectClick = 1000;
            this.effectRealEstate = 0;
            this.effectFinancialProduct = 0;
            this.haveBurgers = 0;
            this.haveMoney = 10000000000;
            this.spentDays = 1;
            this.haveItems = items.map(item => new Item(item.name, 
                                                        item.type, 
                                                        item.effect, 
                                                        0,
                                                        item.maxAmount, 
                                                        item.description, 
                                                        item.imageUrl, 
                                                        item.price));
        } else {
            // ログイン
            this.age = age;
            this.effectClick = effectClick;
            this.effectRealEstate = effectRealEstate;
            this.effectFinancialProduct = effectFinancialProduct;
            this.haveBurgers = haveBurgers;
            this.haveMoney = haveMoney;
            this.spentDays = spentDays;
            this.haveItems = haveItems.map(item => new Item(item.name, 
                                                            item.type, 
                                                            item.effect, 
                                                            item.currentAmount,
                                                            item.maxAmount, 
                                                            item.description, 
                                                            item.imageUrl, 
                                                            item.price));
        }
    }

    // 購入
    buyItem(item, amount) {
        this.haveMoney -= item.price * amount;
        item.currentAmount += amount;

        // エフェクトの条件分岐
        let effect = item.effect * item.currentAmount;
        if(item.type == "能力") {
            this.effectClick += effect;
        }
        else if(item.type == "金融商品") {
            effect *= item.price;
            if(effect - this.effectFinancialProduct < 0) {
                this.effectFinancialProduct += -1 * (effect - this.effectFinancialProduct);
            }
            else {
                this.effectFinancialProduct += effect;
            }
        }
        else if(item.type == "不動産") {
            if(effect - this.effectRealEstate < 0) {
                this.effectRealEstate += -1 * (effect - this.effectRealEstate);
            }
            else {
                this.effectRealEstate += effect;
            }
        }
    }

    clickHamburger() {
        this.haveMoney += this.effectClick;
        this.haveBurgers++;
    }
}
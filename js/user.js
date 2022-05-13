import { Item } from "/js/item.js";
import { items } from "/js/config.js";

export class User {
    constructor(name) {
        this.name = name;
        this.age = 20;
        this.effectClick = 25;
        this.effectRealEstate = 0;
        this.effectFinancialProduct = 0;
        this.haveBurgers = 0;
        this.haveMoney = 1000000000000000;
        this.spentDays = 1;
        this.haveItems = items.map(item => 
            new Item(item.name, item.type, item.effect, item.maxAmount, 
                    item.description, item.imageUrl, item.price));
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
}
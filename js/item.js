export class Item {
    constructor(name, type, effect, maxAmount, description, imageUrl, price) {
        this.name = name;
        this.type = type;
        this.effect = effect;
        this.currentAmount = 0;
        this.maxAmount = maxAmount;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    effectToString() {
        if(this.type == "金融商品") {
            return this.effect + "%";
        }
        else {
            return "￥" + this.effect;
        }
    }
}
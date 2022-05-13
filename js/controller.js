import { User } from "/js/user.js";
import { View } from "/js/view.js";

export class Controller {
    static startGame() {
        // Entrance
        View.createEntrancePage();
        // New
        this.createNewGame();
        // Login
        // this.continueGame();
    }

    static createNewGame() {
        document.getElementById("sign-up-btn").addEventListener("click", () => {
            let user = new User(document.getElementById("user-name").value);
            View.createMainPage(user);
            this.advanceDate(user);
        });
    }

    // static continueGame(user) {

    // }

    // 日にちを進める
    static advanceDate(user) {
        setInterval(function(){
            user.spentDays++;
            document.getElementById("spent-days").innerHTML = `${user.spentDays} days`;

            // userが歳をとる
            if(user.spentDays % 365 == 0) {
                user.age++;
                document.getElementById("user-age").innerHTML = `${user.age} years old`;
            }

            // 不動産、金融商品の効果
            user.haveMoney += user.effectRealEstate + user.effectFinancialProduct;
            document.getElementById("have-money").innerHTML = `￥ ${View.numberWithCommas(user.haveMoney)}`;

            // リセット
            // if (window.confirm("Do you really want to reset?")) {
            //     reset();
            // }

            // セーブ
        },1000)
    }
}
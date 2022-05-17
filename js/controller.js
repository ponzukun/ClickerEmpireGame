import { User } from "/js/user.js";
import { View } from "/js/view.js";

export class Controller {
    static startGame() {
        // Entrance
        View.createEntrancePage();
        // New
        document.getElementById("sign-up-btn").addEventListener("click", () => {
            this.createNewGame(document.getElementById("entrance-user-name").value);
        });
        // Login
        // this.continueGame();
    }

    static createNewGame(userName) {
        let user = new User(userName);
        View.createMainPage(user);
        let myTimer;

        myTimer = setInterval(function(){Controller.advanceDate(user);}, 1000);
        
        // ハンバーガークリック
        document.getElementById("hamburger").addEventListener("click", () => {
            user.clickHamburger();
            document.getElementById("have-burgers").innerHTML = `${user.haveBurgers} Burgers`;
            document.getElementById("have-money").innerHTML = `￥ ${View.numberWithCommas(user.haveMoney)}`;
        });

        // リセット
        document.getElementById("reset").addEventListener("click", () => {
            if (window.confirm("Do you really want to reset?")) {
                clearInterval(myTimer);
                this.createNewGame(document.getElementById("main-user-name").innerText);
            }
        });

        // セーブ
        document.getElementById("save").addEventListener("click", () => {
            if (window.confirm("Do you really want to save?")) {
                clearInterval(myTimer);
                // object -> json string
                let jsonEncoded = JSON.stringify(user);
                // save at localStrage
                localStorage.setItem(user.name, jsonEncoded);
                // back to EntrancePage
                View.createEntrancePage();
            }
        });
        
    }

    // static continueGame(user) {

    // }

    // 日にちを進める
    static advanceDate(user) {
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
    }
}
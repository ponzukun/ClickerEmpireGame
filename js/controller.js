import { User } from "/js/user.js";
import { View } from "/js/view.js";

export class Controller {
    static createNewUser(userName) {
        let newUser = new User(userName, 
                                0, // age
                                0, // effectClick
                                0, // effectRealEstate
                                0, // effectFinancialProduct
                                0, // haveBugers
                                0, // haveMoney
                                0, // spentDays
                                null, // haveItems
                                true); // newUser
        return newUser;
    }

    static createRich() {
        let newUser = new User("rich", 
                                0, // age
                                0, // effectClick
                                0, // effectRealEstate
                                0, // effectFinancialProduct
                                0, // haveBugers
                                0, // haveMoney
                                0, // spentDays
                                null, // haveItems
                                false); // newUser
        // object -> json string
        let jsonEncoded = JSON.stringify(newUser);
        // save at localStrage
        localStorage.setItem(newUser.name, jsonEncoded);
        
    }

    static startGame() {
        View.createEntrancePage();

        // 新規登録
        document.getElementById("sign-up-btn").addEventListener("click", () => {
            let userName = document.getElementById("entrance-user-name").value;
            Controller.createGame(Controller.createNewUser(userName));
        });

        // ログイン
        document.getElementById("login-btn").addEventListener("click", () => {
            let userJsonString = localStorage.getItem(document.getElementById("entrance-user-name").value);
            if(userJsonString === null) {
                alert("This user is not saved.");
            } else {
                let user = JSON.parse(userJsonString);
    
                // user.haveItemsをobjectを含んだarrayに変換
                let userHaveItems = Object.entries(user.haveItems).map(ele => ele[1]);
    
                user = new User(user.name, 
                                user.age, 
                                user.effectClick, 
                                user.effectRealEstate, 
                                user.effectFinancialProduct, 
                                user.haveBurgers, 
                                user.haveMoney, 
                                user.spentDays, 
                                userHaveItems,
                                false);

                Controller.createGame(user);
            }
        });
    }

    static createGame(user) {
        View.createMainPage(user);
        let myTimer;

        myTimer = setInterval(function(){Controller.advanceDate(user);}, 1000);
        
        // ハンバーガークリック
        document.getElementById("hamburger").addEventListener("click", () => {
            user.clickHamburger();
            document.getElementById("have-burgers").innerHTML = `${user.haveBurgers} Burgers`;
            document.getElementById("have-money").innerHTML = `￥ ${View.numberWithCommas(user.haveMoney)}`;
            // この流れで良いあとは場所を変えるだけ
            document.getElementById("money-icon").innerHTML = "";
            document.getElementById("money-icon").append(View.createMoneyIcon());
        });

        // リセット
        document.getElementById("reset").addEventListener("click", () => {
            if (window.confirm("Do you really want to reset?")) {
                clearInterval(myTimer);
                let userName = document.getElementById("main-user-name").innerText;
                this.createGame(Controller.createNewUser(userName));
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
                Controller.startGame();
            }
        });
        
    }

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
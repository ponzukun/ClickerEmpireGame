import { User } from "/js/user.js";
import { View } from "/js/view.js";

export class Controller {
    static createNewUser(userName) {
        let newUser = new User(true, userName);
        return newUser;
    }

    static createRich() {
        let newUser = new User(true, "rich");
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
                // json string -> object
                let user = JSON.parse(userJsonString);
    
                // user.haveItemsをobjectを含んだarrayに変換
                let userHaveItems = Object.entries(user.haveItems).map(ele => ele[1]);
    
                user = new User(false,
                                user.name, 
                                user.age, 
                                user.haveMoney, 
                                user.effectClick, 
                                user.effectRealEstate, 
                                user.effectFinancialProduct, 
                                user.haveBurgers, 
                                user.spentDays, 
                                userHaveItems);

                Controller.createGame(user);
            }
        });

        // ランキング
        document.getElementById("ranking-btn").addEventListener("click", () => {
            Controller.createRanking();
        });
    }

    static createGame(user) {
        View.createMainPage(user);
        let myTimer;

        myTimer = setInterval(function(){Controller.advanceDate(user);}, 1000);
        
        // ハンバーガークリック
        let burger = document.getElementById("hamburger");
        burger.addEventListener("click", () => {
            user.clickHamburger();
            document.getElementById("have-burgers").innerHTML = `${user.haveBurgers} Burgers`;
            document.getElementById("have-money").innerHTML = `￥ ${View.numberWithCommas(user.haveMoney)}`;
            document.getElementById("money-icon").innerHTML = "";
            document.getElementById("money-icon").append(View.createMoneyIcon());
        });
        burger.addEventListener("mousedown", () => {
            burger.classList.add("burger-jump");
        })
        burger.addEventListener("animationend", ()=>{
            burger.classList.remove("burger-jump");
        })
        burger.addEventListener("animationcancel", () => {
            burger.classList.remove("burger-jump");
        })

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

    static createRanking() {
        let users = Controller.sortUser(Controller.getAllStorage());

        View.createRankingPage(users);

        document.getElementById("ranking-back-btn").addEventListener("click", () => {
            Controller.startGame();
        })
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

    static getAllStorage() {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
    
        while ( i-- ) {
            values.push( JSON.parse(localStorage.getItem(keys[i])) );
        }
    
        return values;
    }

    static sortUser(users) {
        const sortedAllUser = [...users];
        sortedAllUser.sort(function (a, b) { return b.haveMoney > a.haveMoney ? 1 : -1 });
        return sortedAllUser
    }
}
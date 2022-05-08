import { User } from "/js/user.js";
import { View } from "/js/view.js";
import { itemObjects } from "/js/config.js";

export class Controller {
    static startGame() {
        // console.log(1);
        // loginページの表示
        document.getElementById("login-page").append(View.createLoginPage());
        // loginページからuserを取得
        document.getElementById("login-btn").addEventListener("click", () => {
            window.alert("login!!");
        });
        // itemlistの表示
        // View.displayItemsList(config.assetList, itemObjects, new User("ponzukun"));
    }
}
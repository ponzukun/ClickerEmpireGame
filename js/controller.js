import { User } from "/js/user.js";
import { View } from "/js/view.js";
import { itemObjects } from "/js/config.js";

export class Controller {
    static startGame() {
        // loginページの表示
        document.getElementById("login-page").append(View.createLoginPage());
        // loginページからuserを取得
        document.getElementById("sign-up-btn").addEventListener("click", () => {
            let user = new User(document.getElementById("user-name").value);

            document.getElementById("login-page").innerHTML = "";
            document.getElementById("main-page").append(View.createMainPage(user));
        });
    }
}
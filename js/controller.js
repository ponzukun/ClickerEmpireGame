import { User } from "/js/user.js";
import { View } from "/js/view.js";

export class Controller {
    static startGame() {
        View.createEntrancePage();

        document.getElementById("sign-up-btn").addEventListener("click", () => {
            let user = new User(document.getElementById("user-name").value);
            View.createMainPage(user);
            this.advanceDate(user);
        });
    }

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
            // リセット
            // セーブ
        },1000)
    }

    // 購入
}
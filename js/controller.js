import { User } from "/js/user.js";
import { View } from "/js/view.js";

export class Controller {
    static startGame() {
        // loginページの表示
        document.getElementById("entrance-page").append(View.createEntrancePage());
        // loginページからuserを取得
        document.getElementById("sign-up-btn").addEventListener("click", () => {
            let user = new User(document.getElementById("user-name").value);

            document.getElementById("entrance-page").innerHTML = "";
            document.getElementById("main-page").append(View.createMainPage(user));
            Controller.advanceDate(user);
        });
    }

    static advanceDate(user) {
        setInterval(function(){
            user.spentDays++;
            document.getElementById("spent-days").innerHTML = `${user.spentDays} days`;
            if(user.spentDays % 365 == 0) {
                user.age++;
                document.getElementById("user-age").innerHTML = `${user.age} years old`;
            }
        },1000)
    }
}
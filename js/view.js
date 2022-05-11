import { itemObjects } from "/js/config.js";

export class View {
    static createItemList() {
        let itemCon = document.createElement("div");
        itemCon.classList.add("bg-dark", "px-2", "pt-2");

        itemObjects.forEach(item => {
            itemCon.innerHTML += `
                <div class="border-dark bg-success d-flex py-2 mb-2 hover">
                    <div class="col-7 col-md-5 col-lg-4">
                        <img class="col-12" src="${item.imageUrl}">
                    </div>
                    <div class="col-2 col-md-4 col-lg-5 d-flex flex-column justify-content-center">
                        <p class="rem1p5">${item.name}</p>
                        <p class="rem1p5">￥ ${this.numberWithCommas(item.price)}</p>
                    </div>
                    <div class="col-3 d-flex flex-column justify-content-center">
                        <h3 class="pt-3">0</h3>
                        <p class="text-danger">￥0</p>
                    </div>
                </div>
            `;
        });
        return itemCon;
    }

    static createEntrancePage() {
        let loginCon = document.createElement("div");
        loginCon.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center", "bg-dark");
        loginCon.innerHTML = `
            <div class="d-flex justify-content-center align-items-center col-md-7 col-10">
                <div id="initial-form" class="d-block p-4 bg-white text-center d-flex justify-content-center">
                    <div id="login-form" class="col-12">
                        <h2>Clicker Empire Game</h2>
                        <div class="mt-3 form-group">
                            <input id="user-name" type="text" name="userName" class="form-control" placeholder="Your name" value="ponzukun" required>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="pl-0 col-6">
                                <button id="sign-up-btn" class="col-12 btn btn-primary">New</button>
                            </div>
                            <div class="pr-0 col-6">
                                <button id="login-btn" class="col-12 btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        `;
        return loginCon;
    }

    static createMainPage(user) {
        let mainCon = document.createElement("div");
        mainCon.classList.add("d-flex", "justify-content-center", "align-items-center", "bg-dark");
        mainCon.innerHTML = `
            <div class="vh-88 d-block d-flex bg-white col-9 text-center text-white my-5 p-4">
                <div class="bg-danger mr-2 col-4">
                    <div class="pt-2">
                        <p class="rem1p5">0 Burgers</p>
                        <p class="rem1p5">one click ￥25</p>
                    </div>
                    <i class="fa-10x fas fa-hamburger hover"></i>
                </div>
                <div class="ml-2 col-8">
                    <div class="bg-primary py-2">
                        <div class="d-flex justify-content-between col-12">
                            <div class="border my-1 mr-1 col-6 rem1">${user.name}</div>
                            <div id="user-age" class="border my-1 ml-1 col-6 rem1">${user.age} years old</div>
                        </div>
                        <div class="d-flex justify-content-between col-12">
                            <div id="spent-days" class="border my-1 mr-1 col-6 rem1">${user.spentDays} days</div>
                            <div class="border my-1 ml-1 col-6 rem1">￥ ${this.numberWithCommas(user.haveMoney)}</div>
                        </div>
                    </div>
                    <div id="asset-list" class="mt-4 bg-dark overflow-auto flowHeight"></div>
                    <div class="d-flex justify-content-end mt-2">
                        <div class="border border-dark p-2 mr-3 hover">
                            <i class="text-dark fa-3x fas fa-undo"></i>
                        </div>
                        <div class="border border-dark p-2 hover">
                            <i class="text-dark fa-3x fas fa-save"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        mainCon.querySelectorAll("#asset-list").item(0).append(this.createItemList());
        return mainCon;
    }

    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
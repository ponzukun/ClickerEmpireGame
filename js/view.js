import { itemObjects } from "/js/config.js";

export class View {
    // アイテムリストの画面を作成
    static createItemList() {
        let itemListCon = document.createElement("div");
        itemListCon.classList.add("px-2", "pt-2");

        itemObjects.forEach(item => {
            let itemCon = document.createElement("div");
            itemCon.classList.add("border-dark", "bg-success", "d-flex", "py-2", "mb-2", "hover");
            itemCon.innerHTML = `
                    <div class="col-4">
                        <img class="img-item" src="${item.imageUrl}">
                    </div>
                    <div class="col-6 d-flex flex-column justify-content-center">
                        <p class="rem1p5">${item.name}</p>
                        <p class="rem1p5">￥ ${this.numberWithCommas(item.price)}</p>
                    </div>
                    <div class="col-2 d-flex flex-column justify-content-center">
                        <h3 class="pt-3">0</h3>
                        <p class="text-danger">￥0</p>
                    </div>
            `;
            // アイテムの購入画面に遷移
            itemCon.addEventListener("click", () => {
                document.getElementById("asset-list").innerHTML = "";
                document.getElementById("asset-list").append(this.createItemDetail(item));

                // 戻る
                document.getElementById("back-btn").addEventListener("click", () => {
                    document.getElementById("asset-list").innerHTML = "";
                    document.getElementById("asset-list").append(this.createItemList());    
                });

                // 購入→所持金より購入金額が下か判定→所持金から購入金額を引く→購入量を増やす
            });
            itemListCon.append(itemCon);
        });
        return itemListCon;
    }

    // アイテムの詳細画面を作成
    static createItemDetail(item) {
        let itemDetailCon = document.createElement("div");
        itemDetailCon.classList.add("px-2", "pt-2");
        itemDetailCon.innerHTML = `
            <div class="border-dark bg-success py-2">
                <div class="d-flex mb-4">
                    <div class="col-8">
                        <div class="col-12">
                            <h1 class="mb-2">${item.name}</h1>
                            <div class="text-left mb-1 rem1p5">Max purchases: ${item.maxAmount}</div>
                            <div class="text-left mb-3 rem1p5">Price: ￥${this.numberWithCommas(item.price)}</div>
                            <div class="text-left rem1">${item.description}</div>
                        </div>
                    </div>
                    <div class="col-4">
                        <img class="col-12" src="${item.imageUrl}">
                    </div>
                </div>
                <div class="my-4">
                    <h2>How many would you like to purchase?</h2>
                    <div>
                        <input id="amount-purchase" class="text-right col-11 px-1" type="number" min="1" value="1">
                    </div>
                    <div>
                        <div id="total-price" class="col-12 rem1p5 text-right pr-4">Total: ￥${this.numberWithCommas(item.price)}</div>
                    </div>
                </div>
                <div class="d-flex my-4">
                    <div class="pl-2 col-6">
                        <button id="back-btn" class="col-12 btn btn-secondary">Go Back</button>
                    </div>
                    <div class="pr-2 col-6">
                        <button id="purchase-btn" class="col-12 btn btn-danger">Purchase</button>
                    </div>
                </div>
            </div>
        `;
        // 購入量を変更すると合計価格が変化
        itemDetailCon.querySelector("#amount-purchase").addEventListener("input", (event) => {
            let totalPrice = item.price * event.target.value;
            itemDetailCon.querySelector("#total-price").innerHTML = `Total: ￥${this.numberWithCommas(totalPrice)}`;
        });
        return itemDetailCon;
    }

    // このゲームの入り口の画面を作成
    static createEntrancePage() {
        let EntranceCon = document.createElement("div");
        EntranceCon.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center", "bg-dark");
        EntranceCon.innerHTML = `
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
        document.getElementById("entrance-page").append(EntranceCon);
    }

    // このゲームのメイン画面を作成
    static createMainPage(user) {
        document.getElementById("entrance-page").innerHTML = "";

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
        document.getElementById("main-page").append(mainCon);
    }

    // 数字にコンマを入れる
    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
export class View {

    static clearPage() {
        document.getElementById("entrance-page").innerHTML = "";
        document.getElementById("main-page").innerHTML = "";
    }

    // このゲームの入り口の画面を作成
    static createEntrancePage() {
        View.clearPage();

        let EntranceCon = document.createElement("div");
        EntranceCon.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center", "color-background");
        EntranceCon.innerHTML = `
        <div class="d-flex justify-content-center align-items-center col-md-7 col-10">
            <div class="d-block p-4 color-main color-text text-center d-flex justify-content-center">
                <div class="col-12">
                    <h2>Clicker Empire Game</h2>
                    <div class="mt-3 form-group">
                        <input id="entrance-user-name" type="text" name="userName" class="form-control color-text" placeholder="Your name" value="ponzukun" required>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="pl-0 col-6">
                            <button id="sign-up-btn" class="col-12 btn color-button color-text">New</button>
                        </div>
                        <div class="pr-0 col-6">
                            <button id="login-btn" class="col-12 btn color-button color-text">Login</button>
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
        View.clearPage();

        let mainCon = document.createElement("div");
        mainCon.classList.add("d-flex", "justify-content-center", "align-items-center", "color-background");
        
        let mainConChild = document.createElement("div");
        mainConChild.classList.add("vh-88", "d-block", "d-flex", "color-main", "col-9", "text-center", "color-text", "my-5", "p-4");

        mainConChild.append(View.createBurgerCon(user));
        mainConChild.append(View.createMenuCon(user));
        mainCon.append(mainConChild);

        // アイテムリストの表示
        mainCon.querySelector("#asset-list").append(View.createItemList(user));
        
        document.getElementById("main-page").append(mainCon);
    }

    static createBurgerCon(user) {
        let burgerCon = document.createElement("div");
        burgerCon.classList.add("mr-2", "col-4");

        burgerCon.append(View.createBurgerDetail(user));

        let moneyIcon = document.createElement("div");
        moneyIcon.setAttribute("id", "money-icon")
        moneyIcon.append(View.createMoneyIcon());
        burgerCon.append(moneyIcon);
        
        burgerCon.append(View.createBurger());
        return burgerCon;
    }

    static createBurgerDetail(user) {
        let burgerDetail = document.createElement("div");
        burgerDetail.classList.add("pt-2");
        burgerDetail.innerHTML = `
            <p id="have-burgers" class="rem1p5">${user.haveBurgers} Burgers</p>
            <p id="effect-click" class="rem1p5">one click ￥${user.effectClick}</p>
        `;
        return burgerDetail;
    }

    static createMoneyIcon() {
        let moneyIcon = document.createElement("div");
        moneyIcon.classList.add("d-flex", "justify-content-end", "align-items-end");
        moneyIcon.innerHTML = `<i class="fa-3x fas fa-money-bill-alt money"></i>`;
        return moneyIcon;
    }
    
    static createBurger() {
        let burger = document.createElement("div");
        burger.setAttribute("id","hamburger");
        burger.innerHTML = `<img class="img-item hover" src="/images/Hamburger.png">`;
        return burger;
    }

    static createMenuCon(user) {
        let menuCon = document.createElement("div");
        menuCon.classList.add("ml-2", "col-8");
        menuCon.innerHTML = `
                <div class="py-2">
                    <div class="d-flex justify-content-between col-12">
                        <div id="main-user-name" class="border my-1 mr-1 col-6 rem1">${user.name}</div>
                        <div id="user-age" class="border my-1 ml-1 col-6 rem1">${user.age} years old</div>
                    </div>
                    <div class="d-flex justify-content-between col-12">
                        <div id="spent-days" class="border my-1 mr-1 col-6 rem1">${user.spentDays} days</div>
                        <div id="have-money" class="border my-1 ml-1 col-6 rem1">￥ ${View.numberWithCommas(user.haveMoney)}</div>
                    </div>
                </div>
                <div id="asset-list" class="mt-4 bg-dark overflow-auto flowHeight"></div>
                <div class="d-flex justify-content-end mt-2">
                    <div id="reset" class="border border-dark p-2 mr-3 hover">
                        <i class="text-dark fa-3x fas fa-undo"></i>
                    </div>
                    <div id="save" class="border border-dark p-2 hover">
                        <i class="text-dark fa-3x fas fa-save"></i>
                    </div>
                </div>
        `;
        return menuCon;
    }

    // アイテムリストの画面を作成
    static createItemList(user) {
        let itemListCon = document.createElement("div");
        itemListCon.classList.add("px-2", "pt-2");

        user.haveItems.forEach(item => {
            let itemCon = document.createElement("div");
            itemCon.classList.add("border", "color-main", "d-flex", "py-2", "mb-2", "hover");
            itemCon.innerHTML = `
                    <div class="col-4">
                        <img class="img-item" src="${item.imageUrl}">
                    </div>
                    <div class="col-6 d-flex flex-column justify-content-center">
                        <p class="rem1p5">${item.name}</p>
                        <p class="rem1p5">￥ ${View.numberWithCommas(item.price)}</p>
                    </div>
                    <div class="col-2 d-flex flex-column justify-content-center">
                        <h3 class="pt-3">${item.currentAmount}</h3>
                        <div class="text-danger">+${item.effectToString()}</div>
                        <div class="text-danger">/day</div>
                    </div>
            `;
            // アイテムの購入画面に遷移
            itemCon.addEventListener("click", () => {
                document.getElementById("asset-list").innerHTML = "";
                document.getElementById("asset-list").append(View.createItemDetail(item));

                // 戻る
                document.getElementById("back-btn").addEventListener("click", () => {
                    document.getElementById("asset-list").innerHTML = "";
                    document.getElementById("asset-list").append(View.createItemList(user));    
                });

                // 購入→所持金より購入金額が下か判定→所持金から購入金額を引く→購入量を増やす
                document.getElementById("purchase-btn").addEventListener("click", () => {
                    let itemAmount = parseInt(document.getElementById("amount-purchase").value, 10);
                    let totalPrice = item.price * itemAmount;
                    if(totalPrice <= user.haveMoney) {
                        user.buyItem(item, itemAmount);
                        document.getElementById("asset-list").innerHTML = "";
                        document.getElementById("asset-list").append(View.createItemList(user));
                        document.getElementById("effect-click").innerHTML = `one click ￥${user.effectClick}`;
                    } else {
                        window.alert("Too expensive for you!!");
                    }
                });
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
            <div class="border color-main py-2">
                <div class="d-flex mb-4">
                    <div class="col-8">
                        <div class="col-12">
                            <h1 class="mb-2">${item.name}</h1>
                            <div class="text-left mb-1 rem1p5">Max purchases: ${item.maxAmount}</div>
                            <div class="text-left mb-3 rem1p5">Price: ￥${View.numberWithCommas(item.price)}</div>
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
                        <div id="total-price" class="col-12 rem1p5 text-right pr-4">Total: ￥${View.numberWithCommas(item.price)}</div>
                    </div>
                </div>
                <div class="d-flex my-4">
                    <div class="pl-2 col-6">
                        <button id="back-btn" class="col-12 btn color-button-secondary color-text">Go Back</button>
                    </div>
                    <div class="pr-2 col-6">
                        <button id="purchase-btn" class="col-12 btn color-button color-text">Purchase</button>
                    </div>
                </div>
            </div>
        `;
        // 購入量を変更すると合計価格が変化
        itemDetailCon.querySelector("#amount-purchase").addEventListener("input", (event) => {
            let totalPrice = item.price * event.target.value;
            itemDetailCon.querySelector("#total-price").innerHTML = `Total: ￥${View.numberWithCommas(totalPrice)}`;
        });
        return itemDetailCon;
    }

    // 数字にコンマを入れる
    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
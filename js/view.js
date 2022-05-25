export class View {

    static clearPage() {
        document.getElementById("entrance-page").innerHTML = "";
        document.getElementById("main-page").innerHTML = "";
        document.getElementById("ranking-page").innerHTML = "";
    }

    // このゲームの入り口の画面を作成
    static createEntrancePage() {
        View.clearPage();

        let EntranceCon = document.createElement("div");
        EntranceCon.classList.add("p-4", "color-main", "color-text", "text-center", "d-flex", "justify-content-center");
        EntranceCon.innerHTML = `
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
                    <div class="mt-3 d-flex justify-content-center">
                        <div class="col-6">
                            <button id="ranking-btn" class="col-12 btn color-button-secondary color-text">Ranking</button>
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
        mainCon.classList.add("row");
        
        mainCon.append(View.createBurgerCon(user));
        mainCon.append(View.createMenuCon(user));

        // アイテムリストの表示
        mainCon.querySelector("#asset-list").append(View.createItemList(user));
        
        document.getElementById("main-page").append(mainCon);
    }

    static createBurgerCon(user) {
        let burgerCon = document.createElement("div");
        burgerCon.classList.add("color-main", "col-md-4", "justify-content-center", "text-center", "p-2", "pb-0", "pb-md-2");
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
        burgerDetail.classList.add("bg-dark", "px-3", "py-2");
        burgerDetail.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center color-main">
                <div id="have-burgers" class="rem1p5">${user.haveBurgers} Burgers</div>
                <div id="effect-click" class="rem1">one click ￥${user.effectClick}</div>
            </div>
        `;
        return burgerDetail;
    }

    static createMoneyIcon() {
        let moneyIcon = document.createElement("div");
        moneyIcon.classList.add("col-8", "col-md-10", "d-flex", "justify-content-end", "align-items-end");
        moneyIcon.innerHTML = `<i class="fa-2x fa-md-3x fas fa-money-bill-alt money"></i>`;
        return moneyIcon;
    }
    
    static createBurger() {
        let burger = document.createElement("div");
        burger.setAttribute("id","hamburger");
        burger.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center", "color-main")
        burger.innerHTML = `<img id="hamburger-img" class="img-burger hover" src="/images/Hamburger.png">`;
        return burger;
    }

    static createMenuCon(user) {
        let menuCon = document.createElement("div");
        menuCon.classList.add("p-2", "col-md-8", "justify-content-center", "text-center", "color-main");
        menuCon.innerHTML = `
                <div class="p-1 mb-2 bg-dark">
                    <div class="d-flex flex-row justify-content-center flex-wrap color-text color-main">
                        <div class="col-6 border p-2 rem1">
                            <div id="main-user-name">${user.name}</div>
                        </div>
                        <div class="col-6 border p-2 rem1">
                            <div id="user-age">${user.age} years old</div>
                        </div>
                        <div class="col-6 border p-2 rem1">
                            <div id="spent-days">${user.spentDays} days</div>
                        </div>
                        <div class="col-6 border p-2 rem1">
                            <div id="have-money">￥ ${View.numberWithCommas(user.haveMoney)}</div>
                        </div>
                    </div>
                </div>
                <div id="asset-list" class="mt-4 bg-dark overflow-auto flowHeight"></div>
                <div class="d-flex justify-content-end mt-2 rem0p5">
                    <div id="reset" class="border p-2 mr-3 hover">
                        <i class="text-dark fa-3x fas fa-undo"></i>
                    </div>
                    <div id="save" class="border p-2 hover">
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
                <div class="d-flex mb-1">
                    <div class="col-8">
                        <div class="col-12">
                            <h3 class="mb-1">${item.name}</h3>
                            <div class="text-left mb-1">Max purchases: ${item.maxAmount}</div>
                            <div class="text-left mb-1">Price: ￥${View.numberWithCommas(item.price)}</div>
                            <div class="text-left">${item.description}</div>
                        </div>
                    </div>
                    <div class="col-4">
                        <img class="col-12" src="${item.imageUrl}">
                    </div>
                </div>
                <div class="my-1">
                    <h4>How many would you like to purchase?</h4>
                    <div>
                        <input id="amount-purchase" class="rem1 text-right col-11 px-1" type="number" min="1" value="1">
                    </div>
                    <div>
                        <div id="total-price" class="col-12 rem1p5 text-right pr-4">Total: ￥${View.numberWithCommas(item.price)}</div>
                    </div>
                </div>
                <div class="d-flex my-1">
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

    static createRankingPage(users) {
        View.clearPage();

        let rankingCon = document.createElement("div");
        rankingCon.classList.add("col-12", "color-main");

        let rankingTitle = document.createElement("div");
        rankingTitle.classList.add("color-text", "d-flex", "text-center");
        rankingTitle.innerHTML = `
            <h3 class="col-2 py-3 mb-0"></h3>
            <h3 class="col-3 py-3 mb-0">Name</h3>
            <h3 class="col-3 py-3 mb-0">Age</h3>
            <h3 class="col-4 py-3 mb-0">Cache</h3>
        `;
        rankingCon.append(rankingTitle);

        let rankingList = document.createElement("div");
        rankingList.classList.add("color-background", "mt-2", "p-1", "overflow-auto", "flowHeight");
        let rank = 1;
        users.forEach(user => {
            rankingList.innerHTML += `
                    <div class="color-text border-bottom row align-items-center m-1 text-center">
                        <p class="col-2 py-3 mb-0">${rank}</p>
                        <p class="col-3 py-3 mb-0">${user.name}</p>
                        <p class="col-3 py-3 mb-0">${user.age}</p>
                        <p class="col-4 py-3 mb-0">${View.numberWithCommas(user.haveMoney)}</p>
                    </div>
            `;
            rank++;
        });
        rankingCon.append(rankingList);

        let rankingButton = document.createElement("div");
        rankingButton.classList.add("row", "justify-content-center", "py-3");
        rankingButton.innerHTML = `
            <div class="col-6">
                <button id="ranking-back-btn" class="col-12 btn color-button-secondary color-text">Go Back</button>
            </div>
        `;
        rankingCon.append(rankingButton);

        document.getElementById("ranking-page").append(rankingCon);
    }

    // 数字にコンマを入れる
    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
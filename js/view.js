export class View {
    static displayItemsList(target, itemObjList, user) {
        // Viewの処理
        itemObjList.forEach(itemObj => {
            console.log(itemObj);
            let asset = document.createElement("div");
            asset.classList.add("bg-dark", "px-2", "pt-2");
            asset.innerHTML += `
                <div class="border-dark bg-success d-flex py-2">
                    <div class="col-7 col-md-5 col-lg-4">
                        <img class="col-12" src="${itemObj.imageUrl}">
                    </div>
                    <div class="col-2 col-md-4 col-lg-5 d-flex flex-column justify-content-center">
                        <p class="rem1p5">${itemObj.name}</p>
                        <p class="rem1p5">￥ ${itemObj.price}</p>
                    </div>
                    <div class="col-3 d-flex flex-column justify-content-center">
                        <h3 class="pt-3">${user.getItemCount(itemObj.name)}</h3>
                        <p class="text-danger">￥${user.getItemEffect(itemObj)}</p>
                    </div>
                </div>
            `;
    
            target.append(asset);
    
            // addeventlisterで購入画面表示

        });
    }

    static displayUserInfo() {
        console.log(0);
    }

    static createLoginPage() {
        let loginCon = document.createElement("div");
        loginCon.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center", "bg-dark");
        loginCon.innerHTML = `
            <div class="d-flex justify-content-center align-items-center col-md-7 col-10">
                <div id="initial-form" class="d-block p-4 bg-white text-center d-flex justify-content-center">
                    <div id="login-form" class="col-12">
                        <h2>Clicker Empire Game</h2>
                        <div class="mt-3 form-group">
                            <input type="text" name="userName" class="form-control" placeholder="Your name" value="ponzukun" required>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="pl-0 col-6">
                                <button class="col-12 btn btn-primary sign-up-btn">New</button>
                            </div>
                            <div class="pr-0 col-6">
                                <button id="login-btn" class="col-12 btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        `;

        // loginCon.querySelectorAll("#login-btn").item(0).addEventListener("click", () => {
        //     window.alert("login!!");
        // });
        // console.log(loginCon.querySelectorAll("#login-btn").item(0))

        return loginCon;
    }
}
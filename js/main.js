
for(let i = 0; i < 5; i++) {
    let asset = document.createElement("div");
    asset.classList.add("bg-dark", "px-2", "pt-2");
    asset.innerHTML += `
        <div class="border-dark bg-success d-flex py-2">
            <div class="col-4">
                <img class="col-12" src="/images/FlipMachine.png">
            </div>
            <div class="col-5 d-flex flex-column justify-content-center">
                <h3>Flip machine</h3>
                <h4>￥ 150000</h4>
            </div>
            <div class="col-3 d-flex flex-column justify-content-center">
                <h3 class="pt-3">0</h3>
                <p class="text-danger">￥25 / click</p>
            </div>
        </div>
    `;

    document.getElementById("asset-list").append(asset);
}
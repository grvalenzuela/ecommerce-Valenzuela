let btcValor = $.ajax({
  url: "https://api.coingecko.com/api/v3/coins/bitcoin",
  type: "GET",
  success: function (data) {
    let contenedor = $("#valor-btc");
    let cripto = `<h4 class="p-2 text-info">${data.market_data.current_price["usd"]} U$D</h4>`;

    $(cripto).hide().appendTo("#valor-btc").fadeIn(1000);
  },
});

let ethValor = $.ajax({
  url: "https://api.coingecko.com/api/v3/coins/ethereum",
  type: "GET",
  success: function (data) {
    let cripto = `<h4 class="p-2 text-info">${data.market_data.current_price["usd"]} U$D</h4>`;

    $(cripto).hide().appendTo("#valor-eth").fadeIn(1000);
  },
});

let bnbValor = $.ajax({
  url: "https://api.coingecko.com/api/v3/coins/oec-binance-coin",
  type: "GET",
  success: function (data) {
    let cripto = `<h4 class="p-2 text-info">${data.market_data.current_price["usd"]} U$D</h4>`;

    $(cripto).hide().appendTo("#valor-bnb").fadeIn(1000);
  },
});

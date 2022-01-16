$(document).ready(function () {
  function getMarketCaps(companies) {
    return companies.map((company) => {
      return $.ajax({
        url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${company.ticker}`,
        dataType: "JSON",
        headers: {
          "x-api-key": "mKGrMeHAbE4ZKM0H50NCF6b38QnZKyLv6LdGCSdG",
        },
      }).then(res => res.quoteResponse.result[0].marketCap / 1000000000)
      .catch(err => {
        console.log(`${company.ticker} error ${err}`)
        return 0;
      })
    });
  }

  const companies = [
    { ticker: "TSLA", name: "Tesla" },
    { ticker: "TM", name: "Toyota" },
    { ticker: "F", name: "Ford" },
    { ticker: "RIVN", name: "Rivian" },
    { ticker: "LCID", name: "Lucid" },
    { ticker: "NIO", name: "NIO" },
    { ticker: "HMC", name: "Honda" },
    { ticker: "STLA", name: "Stellantis" },
  ];

  Promise.all(getMarketCaps(companies)).then((res) => {
    const data = {
      labels: companies.map((c) => c.name),
      datasets: [
        {
          label: "Automaker Market Cap",
          backgroundColor: "#000",
          borderColor: "#000",
          data: res
        },
      ],
    };
    const config = {
      type: "bar",
      data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        indexAxis: "y",
        animation: {
          duration: 2000,
          easing: "easeInOutExpo",
        },
      },
    };
    Chart.defaults.font.size = 20;
    Chart.defaults.font.weight = "bold";
    var myChart = new Chart(document.getElementById("myChart"), config);
  });

  // const TSLA = getMarketCap("TSLA");
  // const F = getMarketCap("F");
  // const GM = getMarketCap("GM");

  // Promise.all([TSLA, F, GM]).then(res => {
  //   console.log(res)
  //   const teslaInfo = res[0]
  //   const fInfo = res[1]
  //   const gmInfo = res[2]
  //   const labels = ["Tesla", "Ford", "GM", "VW", "Toyota", "Honda"];
  //   const data = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "Automaker Market Cap",
  //         backgroundColor: "#000",
  //         borderColor: "#000",
  //         data: [teslaInfo, fInfo, gmInfo, 2, 20, 30, 45],
  //       },
  //     ],
  //   };
  //   const config = {
  //     type: "bar",
  //     data,
  //     options: {
  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //       },
  //       indexAxis: "y",
  //       animation: {
  //         duration: 1500,
  //         easing: 'easeInOutExpo'
  //       }
  //     },
  //   };
  //   Chart.defaults.font.size = 20;
  //   Chart.defaults.font.weight = "bold";
  //   var myChart = new Chart(document.getElementById("myChart"), config);
  // })
});

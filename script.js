window.onload = function() {
  const apiKey = "<your_api_key>";
  const appId = "<your_app_id>";
  const refreshInterval = 5 * 60 * 1000; // Refresh interval in milliseconds (5 minutes)
  let days = [];
  let playerCounts = [];

  // Function to fetch and update data
  function fetchDataAndUpdate() {
    fetch(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const playerCount = data.response.player_count;
        const currentDate = new Date().toLocaleDateString(); // Get current date in format MM/DD/YYYY

        // Append current date and player count to arrays
        days.push(currentDate);
        playerCounts.push(playerCount);

        // If arrays exceed 7 days, remove the oldest data
        if (days.length > 7) {
          days.shift();
          playerCounts.shift();
        }

        // Update chart data
        playerCountGraph.data.labels = days;
        playerCountGraph.data.datasets[0].data = playerCounts;
        playerCountGraph.update();
      })
      .catch(error => console.error("Error fetching data:", error));
  }

  // Initial fetch and update
  fetchDataAndUpdate();

  // Set interval to periodically fetch and update data
  setInterval(fetchDataAndUpdate, refreshInterval);
};

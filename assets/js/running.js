const activitiesJSONPath = "assets/js/data/response.json";
const trainingPlanPath = "assets/js/data/training-plan-format.json";
const skippedActivities = ["AlpineSki", "Yoga"];

function calculateWeeklyVolume(data) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let totalVolume = 0;

  days.forEach((day) => {
    const entry = data[day];

    if (entry && !["Rest", "RACE DAY!"].includes(entry)) {
      const distance = parseFloat(entry);
      if (!isNaN(distance)) {
        totalVolume += distance;
      }
    }
  });

  return totalVolume;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(trainingPlanPath)
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("training-plan-tbody");
      data.forEach((week) => {
        const row = document.createElement("tr");

        console.log(week);
        row.innerHTML = `
        <td title="">${week["Week Number"]}</td>
        <td title="${week["Monday Tooltip"]}">${week.Monday}</td>
        <td title="${week["Tuesday Tooltip"]}">${week.Tuesday}</td>
        <td title="${week["Wednesday Tooltip"]}">${week.Wednesday}</td>
        <td title="${week["Thursday Tooltip"]}">${week.Thursday}</td>
        <td title="${week["Friday Tooltip"]}">${week.Friday}</td>
        <td title="${week["Saturday Tooltip"]}">${week.Saturday}</td>
        <td title="${week["Sunday Tooltip"]}">${week.Sunday}</td>
        <td title="">${calculateWeeklyVolume(week)} miles</td>
        `;
        tbody.appendChild(row);
      });
    });

  fetch(activitiesJSONPath)
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("activities-tbody");

      // Iterate over each activity in the JSON data
      data.forEach((activity) => {
        if (!skippedActivities.includes(activity.type)) {
          // Create a new div for each activity
          const row = document.createElement("tr");

          // Add content to the activity div
          row.innerHTML = `
          <td>${activity.name}</td>
          <td>${new Date(activity.start_date).toLocaleDateString()}</td>
          <td>${activity.type}</td>
          <td>${activity.distance} km</td>
          <td>${activity.moving_time}</td>
          <td>${activity.average_speed} ?</td>
          <td>${activity.average_heartrate}</td>
          <td>${activity.suffer_score}</td>
        `;

          // Append the activity div to the activities container
          tbody.appendChild(row);
        }
      });
    })
    .catch((error) => console.error("Error fetching activities:", error));
});

// const accessToken = "2d91bfe63aa5c12a8ec3ac96b338dbed0ad5345b";
// const athleteId = 69044704;

// async function fetchActivity() {
//   const activityId = 11873829995;
//   const url = `https://www.strava.com/api/v3/activities/${activityId}`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   if (!response.ok) {
//     console.error("Failed to fetch activity:", response.statusText);
//     return;
//   }
//   console.log("API called successfully. Returned data:", data);
//   document.getElementById("output").textContent = JSON.stringify(data, null, 2);
// }

// async function fetchAthleteStats() {
//   const url = `https://www.strava.com/api/v3/athletes/${athleteId}/stats`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   if (!response.ok) {
//     console.error("Failed to fetch activity:", response.statusText);
//     return;
//   }

//   const data = await response.json();
//   console.log("API called successfully. Returned data:", data);
//   document.getElementById("output").textContent = JSON.stringify(data, null, 2);
// }

// async function fetchActivities(after, page, perPage) {
//   const url = `https://www.strava.com/api/v3/athletes/${athleteId}/activities`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   if (!response.ok) {
//     console.error("Failed to fetch activity:", response.statusText);
//     return;
//   }

//   const data = await response.json();
//   console.log("API called successfully. Returned data:", data);
//   document.getElementById("output").textContent = JSON.stringify(data, null, 2);
// }

// document.getElementById("myButton").onclick = fetchActivity;
// // document.getElementById("myButton").onclick = fetchActivities(
// //   1719795600,
// //   10,
// //   10
// // );

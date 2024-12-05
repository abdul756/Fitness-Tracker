const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 },
];

// Add a new activity
function addActivity(activityList, activityId, type, duration, caloriesBurned) {
  const newActivity = {
    activityId: parseInt(activityId, 10),
    type: type,
    duration: parseInt(duration, 10),
    caloriesBurned: parseInt(caloriesBurned, 10),
  };
  activityList.push(newActivity);
  return activityList;
}

// Sort activities by duration
function sortActivitiesByDuration(activityList) {
  return activityList.sort((a, b) => a.duration - b.duration);
}

// Filter activities by type
function filterActivitiesByType(activityList, type) {
  return activityList.filter(
    (activity) => activity.type.toLowerCase() === type.toLowerCase()
  );
}

// Calculate total calories burned using a for loop
function calculateTotalCalories(activityList) {
  let totalCalories = 0;
  for (let i = 0; i < activityList.length; i++) {
    totalCalories += activityList[i].caloriesBurned;
  }
  return totalCalories;
}

// Update activity duration by ID using a for loop
function updateActivityDuration(activityList, activityId, duration) {
  for (let i = 0; i < activityList.length; i++) {
    if (activityList[i].activityId === parseInt(activityId, 10)) {
      activityList[i].duration = parseInt(duration, 10);
      break;
    }
  }
  return activityList;
}

// Delete an activity by ID
function deleteActivityById(activityList, activityId) {
  return activityList.filter(
    (activity) => activity.activityId !== parseInt(activityId, 10)
  );
}

// Delete all activities by type
function deleteActivitiesByType(activityList, type) {
  return activityList.filter(
    (activity) => activity.type.toLowerCase() !== type.toLowerCase()
  );
}

// Endpoints

// Add an activity
app.get('/activities/add', (req, res) => {
  const { activityId, type, duration, caloriesBurned } = req.query;
  activities = addActivity(
    activities,
    activityId,
    type,
    duration,
    caloriesBurned
  );
  res.json({ activities });
});

// Sort activities by duration
app.get('/activities/sort-by-duration', (req, res) => {
  const sortedActivities = sortActivitiesByDuration(activities);
  res.json({ activities: sortedActivities });
});

// Filter activities by type
app.get('/activities/filter-by-type', (req, res) => {
  const { type } = req.query;
  const filteredActivities = filterActivitiesByType(activities, type);
  res.json({ activities: filteredActivities });
});

// Calculate total calories burned
app.get('/activities/total-calories', (req, res) => {
  const totalCaloriesBurned = calculateTotalCalories(activities);
  res.json({ totalCaloriesBurned });
});

// Update activity duration by ID
app.get('/activities/update-duration', (req, res) => {
  const { activityId, duration } = req.query;
  activities = updateActivityDuration(activities, activityId, duration);
  res.json({ activities });
});

// Delete an activity by ID
app.get('/activities/delete', (req, res) => {
  const { activityId } = req.query;
  activities = deleteActivityById(activities, activityId);
  res.json({ activities });
});

// Delete all activities by type
app.get('/activities/delete-by-type', (req, res) => {
  const { type } = req.query;
  activities = deleteActivitiesByType(activities, type);
  res.json({ activities });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

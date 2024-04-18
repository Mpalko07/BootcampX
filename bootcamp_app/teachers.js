const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

pool
.query(
  `
SELECT cohorts.name as cohort, sum(completed_at-started_at) as total_duration
FROM assistance_requests
JOIN students ON students.id = student_id
JOIN cohorts on cohorts.id = cohort_id
GROUP BY cohorts.name
ORDER BY total_duration;
`
)
.then((res) => {
  res.rows.forEach((user) => {
    console.log(
      `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
    );
  });
})
.catch((err) => console.error("query error", err.stack));
import express from 'express';
import { studentList } from './students.js';

const app = express();
let sortedBy = 'name';
let reverseSort = false;
let students = studentList;

app.listen(3000, () => {
  console.log("Server running");
});
app.get("/students", (req, res) => {
  const params = req.query;
  const startIndex = (params.page - 1) * 5;
  const endIndex = params.page * 5;

  // Checking for sorting method changes
  if (params.sortBy !== sortedBy) {
    sortedBy = params.sortBy;
    sortStudents(params.sortBy);
  }

  if (params.reverseSort !== reverseSort) {
    reverseSort = params.reverseSort;
    students.reverse();
  }
  const result = students
    .filter(student => student.name.toLocaleLowerCase().includes(params.search.toLocaleLowerCase()))
    .slice(startIndex, endIndex);
  res.json(result);
});
// Sorts the students array by given sortBy method
// by default sorted by name
function sortStudents(sortBy) {
  students = students.sort((student1, student2) => {
    if (student1[sortBy] < student2[sortBy]) {
      return -1;
    }
    if (student1[sortBy] > student2[sortBy]) {
      return 1;
    }
    return 0;
  })
}

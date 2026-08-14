import CourseItem from "./CourseItem";

const Courses = ({ courses }) => {

  return (
    courses.map(c => <CourseItem course={c} />)
  )
}

export default Courses;

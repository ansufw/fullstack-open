import Content from "./Content"
import Header from "./Header"
import Total from "./Total"


const CourseItem = ({ course }) => {
  return (
    <div id={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default CourseItem;
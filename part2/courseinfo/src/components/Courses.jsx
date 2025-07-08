import Title from "./Title"
import Course from "./Course"

const Courses = ({courses}) => (
    <div>
        <Title text={'Web development curriculum'} />
        {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
)

export default Courses
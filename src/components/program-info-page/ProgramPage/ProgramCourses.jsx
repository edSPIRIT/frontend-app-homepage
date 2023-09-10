const ProgramCourses = () => {
  const chunkedArray = [];
  // const chunkSize = () => {
  //   for (let i = 0; i < SIMILAR_COURSES.length; i += 3) {
  //     chunkedArray.push(SIMILAR_COURSES.slice(i, i + 3));
  //   }
  // };
  // chunkSize();

  return (
    <section className=" program-courses-wrapper pt-3" id="courses">
      {/* <h3>Courses</h3>
      <span>It includes the following 5 courses</span> */}
      {/* <Carousel
        interval={null}
        indicators={false}
        nextIcon={
          <Icon style={{ height: '38px', width: '38px' }} src={ChevronRight} />
        }
        prevIcon={
          <Icon style={{ height: '38px', width: '38px' }} src={ChevronLeft} />
        }
      >
        {chunkedArray.map((chunkCourses, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Carousel.Item key={i}>
            <div className="course-container mt-4.5">
              {chunkCourses.map((course) => (
                <CourseCard info={course} key={course.id} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel> */}
    </section>
  );
};

export default ProgramCourses;

var LessonPeriod = React.createClass({
  getInitialState() {
    return {  lessonCount: 0, defaultLessonLength: 30,
              student: undefined, instrument: undefined, teacher: undefined,  
              deleting: false, editing: false, unavailableDates: [] }
  },
  componentWillReceiveProps(nextProps) {
    this.updateStateFromProps(nextProps);
  },
  componentDidMount() {
    this.updateStateFromProps(this.props);  
  },
  updateStateFromProps(props) {
    var lessonPeriod = props.lessonPeriod;
    var instrument = props.instruments.find((instrument) => {
      return instrument.id === lessonPeriod.instrument_id;
    });
    var teacher = props.teachers.find((teacher) => {
      return teacher.id === lessonPeriod.teacher_id;
    });
    var student = props.students.find((student) => {
      return student.id === lessonPeriod.student_id;
    });
    this.setState({ lessonCount: lessonPeriod.lesson_count,
                    defaultLessonLength: lessonPeriod.default_lesson_length,
                    student: student,       
                    instrument: instrument, 
                    teacher: teacher,       
                    unavailableDates: teacher.unavailable_dates });
  },
  getLessonCount(weeks) {
    var count = 0;
    weeks.map((week) => {
      week.lesson ? count += 1 : count += 0;
    });
    this.setState({lessonCount: count});
    this.props.updateLessonCount(count, this.props.lessonPeriod);
  },
  changeLessonCount(change) {
    var newCount = this.state.lessonCount + change;
    this.setState({ lessonCount: newCount })
    this.props.updateLessonCount(newCount, this.props.lessonPeriod);
  },
  handleToggleEditing() {
    var editing = this.state.editing ? false : true;
    this.setState({ editing: editing });
  },
  passEditLessonPeriod(name, instrumentId, teacherId, defaultLessonLength) {
    this.handleToggleEditing();
    var lessonPeriod = this.props.lessonPeriod
    lessonPeriod.defaultLessonLength = defaultLessonLength;
    this.props.passEditLessonPeriod(name, instrumentId, teacherId, lessonPeriod);
  },
  confirmDelete() {
    this.props.handleDelete(this.props.lessonPeriod);
  },
  cancelDelete() {
    this.setState({ deleting: false });
  },
  handleDelete() {
    this.setState({ deleting: true });
  },
  render() {
    if ( !this.state.instrument || !this.state.teacher || !this.state.student) {
      return (
        <div className="lesson-period col-sm-6 col-md-4">
          <p>Loading..</p>
        </div>
      )
    }

    var header; 
    if(this.state.deleting) {
      header = 
        <div className="lesson-period-delete-confirm-wrapper">
          <div className="lesson-period-delete-confirm">
            <h3>You sure?</h3>
            <div>
              <button className="btn btn-danger" onClick={this.confirmDelete}>Yes</button>
              <button className="btn btn-default" onClick={this.cancelDelete}>Oops!</button>
            </div>
          </div>
        </div>
    } else if (this.state.editing) {
      var buttonText = "Save Student"
      header = <FormFields  handleSubmit={this.passEditLessonPeriod}
                            instruments={this.props.instruments}
                            teachers={this.props.teachers}
                            lessonPeriod={this.props.lessonPeriod}
                            buttonText={buttonText} 
                            studentName={this.state.student.name}
                            instrumentId={this.state.instrument.id}
                            teacherId={this.state.teacher.id} 
                            defaultLessonLength={this.state.defaultLessonLength} />
    } else {
      header = 
        <div>
          <h3>{this.state.student.name}</h3>
          <p className="instrument">{this.state.instrument.name}</p>
          <p className="teacher">{this.state.teacher.first_name} {this.state.teacher.last_name}</p>
          <p className="lesson-count"><strong>{this.state.lessonCount}</strong> Lessons</p>
          <div className="lesson-period-hover-menu">
            <span className="edit-lesson-period glyphicon glyphicon-pencil" title="Edit" onClick={this.handleToggleEditing}></span> 
            <span className="delete-lesson-period glyphicon glyphicon-remove" title="Delete" onClick={this.handleDelete}></span> 
          </div>
        </div>
    }

    var editing = this.state.editing ? "editing" : ""
    var headerClasses = "lesson-period-header " + editing;
    return (
      <div className="lesson-period col-sm-6 col-md-4">
        <div className={headerClasses}>
          {header}
        </div>
        <Weeks  lessonPeriodId={this.props.lessonPeriod.id} 
                weeks={this.props.weeks}
                getLessonCount={this.getLessonCount} 
                changeLessonCount={this.changeLessonCount}
                unavailableDates={this.state.unavailableDates} />
      </div>
    )
  }
});
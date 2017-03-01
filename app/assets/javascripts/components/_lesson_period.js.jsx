var LessonPeriod = React.createClass({
  getInitialState() {
    return {  lessonPeriod: undefined, lessonCount: 0,
              student: undefined, instrument: undefined, teacher: undefined,  
              deleting: false, editing: false, unavailableDates: [] }
  },
  componentDidMount() {
    var id = this.props.lessonPeriod.id;

    $.ajax({
      url: `/api/v1/lesson_periods/${id}.json`, 
      type: 'GET',
      success: (response) => { 
        this.setState({ lessonPeriod: response["lesson_period"], 
                        lessonCount: response["lesson_period"].lesson_count,
                        student: response["student"],       
                        instrument: response["instrument"], 
                        teacher: response["teacher"],       
                        unavailableDates: response["teacher"].unavailable_dates});
      }
    });
  },
  getLessonCount(weeks) {
    var count = 0;
    weeks.map((week) => {
      week.lesson ? count += 1 : count += 0;
    });
    this.setState({lessonCount: count});
    this.props.updateLessonCount(count, this.state.lessonPeriod);
  },
  changeLessonCount(change) {
    var newCount = this.state.lessonCount + change;
    this.setState({ lessonCount: newCount })
    this.props.updateLessonCount(newCount, this.state.lessonPeriod);
  },
  showEdit() {
    this.setState({ editing: true })
  },
  handleEdit(name, instrumentId, teacherId) {
    this.props.handleEdit(name, instrumentId, teacherId, this.props.lessonPeriod);
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
    if ( !this.state.instrument ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    var header 
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
      header = 
        <FormFields handleSubmit={this.handleEdit}
                    instruments={this.props.instruments}
                    teachers={this.props.teachers}
                    buttonText={buttonText} 
                    studentName={this.state.student.name}
                    instrumentId={this.state.instrument.id}
                    teacherId={this.state.teacher.id} />
    } else {
      header = 
        <div>
          <h3>{this.state.student.name}</h3>
          <p className="instrument">{this.state.instrument.name}</p>
          <p className="teacher">{this.state.teacher.first_name} {this.state.teacher.last_name}</p>
          <p className="lesson-count"><strong>{this.state.lessonCount}</strong> Lessons</p>
          <div className="lesson-period-hover-menu">
            <span className="edit-lesson-period glyphicon glyphicon-pencil" title="Edit" onClick={this.showEdit}></span> 
            <span className="delete-lesson-period glyphicon glyphicon-remove" title="Delete" onClick={this.handleDelete}></span> 
          </div>
        </div>
    }

    return (
      <div className="lesson-period col-sm-6 col-md-4">
        <div className="lesson-period-header">
          {header}
        </div>
        <Weeks  lessonPeriodId={this.state.lessonPeriod.id} 
                getLessonCount={this.getLessonCount} 
                changeLessonCount={this.changeLessonCount}
                unavailableDates={this.state.unavailableDates} />
      </div>
    )
  }
});
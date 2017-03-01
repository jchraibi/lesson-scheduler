var NewLessonPeriod = React.createClass({
  handleSubmit(name, instrumentId, teacherId) {
    var formId = this.props.form.id;
    $.ajax({
      url: '/api/v1/lesson_periods.json', 
      type: 'POST',
      data: { 
              family_id: this.props.form.family_id,
              name: name,
              lesson_period: {  form_id: formId, instrument_id: instrumentId, 
                                teacher_id: teacherId } 
            },
      success: (lessonPeriod) => { 
        console.log(lessonPeriod);
        this.props.handleSubmit(lessonPeriod);
      }
    });
  },
  render() {
    var buttonText = "Add Lesson Period";
    return (
      <div className="lesson-period col-sm-6 col-md-4">
        <div className="lesson-period-header">
          <FormFields handleSubmit={this.handleSubmit}
                      instruments={this.props.instruments}
                      teachers={this.props.teachers} 
                      buttonText={buttonText}/>
        </div>
      </div>
    )
  }
});
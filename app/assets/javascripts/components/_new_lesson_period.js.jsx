var NewLessonPeriod = React.createClass({
  handleSubmit(name, instrumentId, teacherId, defaultLessonLength) {
    var formId = this.props.form.id;
    $.ajax({
      url: '/api/v1/lesson_periods.json', 
      type: 'POST',
      data: { 
              family_id: this.props.form.family_id,
              name: name,
              lesson_period: {  form_id: formId, instrument_id: instrumentId, 
                                teacher_id: teacherId, default_lesson_length: defaultLessonLength } 
            },
      success: (lessonPeriod, string, jqXHR) => { 
        console.log("New Lesson Period created")
        this.props.handleSubmit(lessonPeriod);
      },
      error: (jqXHR, errorString, exception) => {
        console.log(jqXHR);  
        console.log(errorString);  
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
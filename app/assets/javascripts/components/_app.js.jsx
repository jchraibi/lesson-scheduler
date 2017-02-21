var App = React.createClass({
  getInitialState() {
    return { family: undefined, totalLessonCount: 0, forms: [], showAddStudent: false, 
 }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/families.json', 
      type: 'GET',
      success: (response) => { 
        this.setState({ family: response[0], 
                        totalLessonCount: response[0].week_count, 
                        forms: response[1] });
      }
    });
  },
  toggleNewStudentForm() {
    var showStudent = this.state.showAddStudent ? false : true;
    this.setState({ showAddStudent: showStudent });
  },
  handleNewForm(form) {
    var forms = this.state.forms;
    forms.push(form);
    this.setState({ forms: forms });
  },
  handleEdit(form) {
    var forms = this.state.forms;
    var index = forms.indexOf(form);
    forms[index] = form;
    this.setState({ forms: forms });
  },
  adjustLessonCount(form) {
    // update the form and forms array
    var forms = this.state.forms;
    var formIndex = forms.indexOf(form);
    forms[formIndex] = form;

    // update the lesson count
    var newTotal = 0;
    forms.map((form) => {
      newTotal += form.lesson_count;
    });

    this.setState({ totalLessonCount: newTotal, forms: forms });
  },
  getLessonCount() {
    return this.state.totalLessonCount;
  },
  handleDeletedForm(form) {
    var forms = this.state.forms;
    var formIndex = forms.indexOf(form);
    forms.splice(formIndex, 1);

    this.adjustLessonCount(form);
  },
  render() {
    if ( !this.state.family ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    return (
      <div>
        <Header family={this.state.family} 
                lessonCount={this.state.totalLessonCount} 
                forms={this.state.forms}
                toggleNewStudentForm={this.toggleNewStudentForm} />
        <Body   passLessonCount={this.adjustLessonCount} 
                forms={this.state.forms} 
                handleSubmit={this.handleNewForm}
                handleDeletedForm={this.handleDeletedForm} 
                toggleNewStudentForm={this.toggleNewStudentForm} 
                showAddStudent={this.state.showAddStudent} />
      </div>
    )
  }
});
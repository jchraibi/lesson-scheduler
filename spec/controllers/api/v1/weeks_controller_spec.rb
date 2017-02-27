require 'rails_helper'
include ControllerHelpers

RSpec.describe Api::V1::WeeksController, :type => :controller do
  
  context "anonymous user" do
    it "should be redirected to signin" do
      get :index
      expect(subject).to redirect_to(new_user_session_url)

      get :update, params: { id: 1 }
      expect(subject).to redirect_to(new_user_session_url)
    end
  end

  context "family user" do
    let(:family)     { create(:family) }
    let(:instrument) { create(:instrument) }
    let(:teacher)    { create(:teacher) }
    let(:form)       { family.find_or_create_current_form }
    let(:student) do
      student = form.students.create( student_name:   "Susan", 
                                      instrument_id:  instrument.id,
                                      teacher_id:     teacher.id,
                                      start_date:     Date.new(2017, 6, 5),
                                      end_date:       Date.new(2017, 9, 1))
      student.form = form
      student.save
      return student       
    end

    before :each do
      @request.env["devise.mapping"] = Devise.mappings[:family]
      sign_in family
    end

    it "requires a signed in family" do
      expect(subject.current_user).to_not be_nil
      expect(subject.current_user).to eq(family)

      sign_out family
      get :index, format: :json, params: { id: 1 }
      expect(response.body).to include("You need to sign in or sign up before continuing.")
    end

    describe "index" do
      it "returns a sorted array of weeks for the given student" do
        get :index, format: :json, params: { student_id: student.id }

        original_weeks = student.weeks.sort_by { |week| week.start_date }
        response_weeks = response_body

        expect(response_body).to eq( JSON.parse(response_weeks.to_json) )
      end
    end

    describe "update" do
      it "marks a week as lesson: true or lesson: false" do
        week = student.weeks.first
        expect(week.lesson).to eq(true)
        params = { 
          week: { lesson: false },
          id: week.id 
        }
        put :update, format: :json, params: params
        expect(response_body["lesson"]).to eq(false)
      end
    end

  end

end
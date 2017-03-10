# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# admin = Admin.create(first_name: 'DMS', last_name: 'Admin', 
#   email: 'admin@dmusicstudios.com', 
#   password: 'password', password_confirmation: 'password')

family = Family.create(first_name: 'John', last_name: 'Smith', 
  email: 'family@example.com',
  password: 'password', password_confirmation: 'password')

piano = Instrument.create(name: 'Piano')
guitar = Instrument.create(name: 'Guitar')

teacher = Teacher.create(first_name: 'Nathan', last_name: 'Arnold')
teacher.instruments << piano
teacher2 = Teacher.create(first_name: 'David', last_name: 'Chapman')
teacher2.instruments << guitar

form = Form.create( year: Date.today.year, family_id: family.id,
                    start_date: Date.new(2017,6,5), end_date: Date.new(2017,9,1))

jim = family.students.create(name: 'Jim')
sarah = family.students.create(name: 'Sarah')

lesson_period = form.lesson_periods.create( teacher_id: teacher.id, 
                                            instrument_id: piano.id, 
                                            student_id: jim.id,
                                            default_lesson_length: 30)



lesson_period = form.lesson_periods.create( teacher_id: teacher2.id, 
                                            instrument_id: guitar.id, 
                                            student_id: sarah.id,
                                            default_lesson_length: 30)
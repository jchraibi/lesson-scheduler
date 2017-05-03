class AdminMailer < ApplicationMailer
  helper :application
  admin_email = AppSetting.where(key: "adminEmail").take.value
  default from: admin_email

  def submission_pricing_email(form)
    @form = form
    @family = form.family
    @students = form.students
    @lesson_periods = form.lesson_periods
    mail(to: ['davidchappy@gmail.com', admin_email], subject: ("Form submission from the " + @family.last_name + " family -- Pricing") )
  end

  def submission_scheduling_email(form)
    @form = form
    @family = form.family
    @students = form.students
    @lesson_periods = form.lesson_periods
    mail(to: ['davidchappy@gmail.com', admin_email, @family.email], subject: ("Thanks for signing up! Lesson schedule for the " + @family.last_name + " family") )
  end

end

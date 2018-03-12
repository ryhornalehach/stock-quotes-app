class ApplicationMailer < ActionMailer::Base
  default from: 'Dispatcher Application <no-reply@smart-transportation.herokuapp.com>'
  layout 'mailer'
end

const queue = require('../config/kue');

const resetPasswordmailer = require('../mailers/reset_password_mailer');

queue.process('resetPassword', function(job,done){
    
    resetPasswordmailer.resetpassword(job.data);

    done();
});
const ZhenzismsClient =require('./zhenzisms');

var client =new ZhenzismsClient('sms_developer.zhenzikj.com','102630','8586000c-ce7a-4c2a-9a72-89cdc66d84e0');

function send(tel,code){
    return client.send(`您的验证码为${code},请勿泄露给他人!`, tel)
}

module.exports={
    send
}
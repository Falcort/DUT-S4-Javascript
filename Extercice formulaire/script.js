function create_form()
{
    document.getElementById('age').addEventListener('input', validate_age);
    document.getElementById('id').addEventListener('input', validate_id);
    document.getElementById('password').addEventListener('input', validate_pwd);
    document.getElementById('passwordRe').addEventListener('input', validate_pwdRe);
    document.getElementById('cgu').addEventListener('change', validate_cgu);
}

window.addEventListener("load", create_form);


var global_age, global_id, global_pwd, global_pwdRe, global_cgu;

function validate_age()
{
    var age = document.getElementById('age').value;
    if(age < 18)
    {
        global_age = false;
    }
    else
    {
        global_age = true;
    }
    validate_form()
}

function validate_id()
{
    var id = document.getElementById('id').value;
    if(id.length > 12 || id.length <2 || !/^[a-zA-Z]+$/.test(id))
    {
        global_id = false;
    }
    else
    {
        global_id = true;
    }
    validate_form()
}

function validate_pwd()
{
    var pwd = document.getElementById('password').value;

    if(pwd.length > 30 || pwd.length <8 || !/^[a-zA-Z]+$/.test(pwd))
    {
        global_pwd = false;
        document.getElementById('passwordRe').disabled = true;
    }
    else
    {
        document.getElementById('passwordRe').disabled = false;
        global_pwd = true;
    }
    validate_form()
}

function validate_pwdRe()
{
    var pwd = document.getElementById('password').value;
    var pwd_re = document.getElementById('passwordRe').value;

    if(pwd === pwd_re)
    {
        global_pwdRe = true;
    }
    else
    {
        global_pwdRe = false;
    }
    validate_form()
}

function validate_cgu()
{
    var cgu = document.getElementById('cgu').checked;

    if(cgu)
    {
        global_cgu = true
    }
    else
    {
        global_cgu = false;
    }
    validate_form()
}

function validate_form()
{
    if(global_age && global_id && global_pwd && global_pwdRe && global_cgu)
    {
        document.getElementById('submit').disabled = false;
    }
    else
    {
        document.getElementById('submit').disabled = true;
    }
}
function create_form()
{
    document.getElementById('age').addEventListener('input', validate_age);
    document.getElementById('id').addEventListener('input', validate_id);
    document.getElementById('password').addEventListener('input', validate_pwd);
    document.getElementById('passwordRe').addEventListener('input', validate_pwdRe);
    document.getElementById('cgu').addEventListener('change', validate_cgu);
}

window.addEventListener("load", create_form);


var g_age, g_id, g_pwd, g_pwdRe, g_cgu;

function validate_age()
{
    var age = document.getElementById('age').value;
    if(age < 18)
    {
        g_age = false;
    }
    else
    {
        g_age = true;
    }
    validate_form()
}

function validate_id()
{
    var id = document.getElementById('id').value;
    if(id.length > 12 || id.length <2 || !/^[a-zA-Z]+$/.test(id))
    {
        g_id = false;
    }
    else
    {
        g_id = true;
    }
    validate_form()
}

function validate_pwd()
{
    var pwd = document.getElementById('password').value;

    if(pwd.length > 30 || pwd.length <8 || !/^[a-zA-Z]+$/.test(pwd))
    {
        g_pwd = false;
        document.getElementById('passwordRe').disabled = true;
    }
    else
    {
        document.getElementById('passwordRe').disabled = false;
        g_pwd = true;
    }
    validate_form()
}

function validate_pwdRe()
{
    var pwd = document.getElementById('password').value;
    var pwd_re = document.getElementById('passwordRe').value;

    if(pwd === pwd_re)
    {
        g_pwdRe = true;
    }
    else
    {
        g_pwdRe = false;
    }
    validate_form()
}

function validate_cgu()
{
    var cgu = document.getElementById('cgu').checked;

    if(cgu)
    {
        g_cgu = true
    }
    else
    {
        g_cgu = false;
    }
    validate_form()
}

function validate_form()
{
    if(g_age && g_id && g_pwd && g_pwdRe && g_cgu)
    {
        document.getElementById('submit').disabled = false;
    }
    else
    {
        document.getElementById('submit').disabled = true;
    }
    console.log(("-----------------------"));
    console.log("age = " + g_age);
    console.log("id = " + g_id);
    console.log("pwd = " + g_pwd);
    console.log("pwdRe = " + g_pwdRe);
    console.log("cgu " + g_cgu);
    console.log(("-----------------------"));

}
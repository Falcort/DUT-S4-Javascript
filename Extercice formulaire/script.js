function creat_form()
{
    document.getElementById('age').addEventListener('input', fun_age);
    document.getElementById('id').addEventListener('input', fun_id);
    document.getElementById('password').addEventListener('input', fun_pwd);
    document.getElementById('passwordRe').addEventListener('input', fun_pwd_re);
    document.getElementById('cgu').addEventListener('change', fun_cgu);
}

window.addEventListener("load", creat_form);

var errors = 0;

function fun_age()
{
    var age = document.getElementById('age').value;
    if(age < 18)
    {
        console.log("Trop jeune");
        errors++;
    }
    else
    {
        console.log("Age ok");
        errors--;
    }
}

function fun_id()
{
    var id = document.getElementById('id').value;
    if(id.length > 12 || id.length <2 || !/^[a-zA-Z]+$/.test(id))
    {
        console.log("Id non valide");
        errors++;
    }
    else
    {
        console.log("Id ok");
        errors--;
    }
}

function fun_pwd()
{
    var pwd = document.getElementById('id').value;
}

function fun_pwd_re()
{
    var pwd = document.getElementById('password').value;
    var pwd_re = document.getElementById('passwordRe').value;

    if(pwd === pwd_re)
    {
        console.log('Confirmation ok');
        errors--;
    }
    else
    {
        console.log('Confimation pas ok');
        errors++;
    }
}

function fun_cgu()
{
    var cgu = document.getElementById('cgu').checked;
    if(cgu === true)
    {
        console.log("cgu ok");
        errors--;
    }
    else
    {
        console.log("cgu pas ok");
        errors++;
    }
}
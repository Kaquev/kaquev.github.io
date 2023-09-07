import styles from "./../css/home.module.css";
import iconLogo from "./../asset/icons/Logo.tripify.svg";
import iconLinea from "../asset/icons/linea.icon.svg";
import { saveUserSession } from ".//../lib/index";
import { userSignin, signInWithFirestore } from "../lib/firebase";

function home(navigateTo) {
  const sectionHome = document.createElement("section");
  sectionHome.className = styles.contenedor_home;

  const logo = document.createElement("img");
  logo.className = styles.img_logo;
  
  const errorLogin = document.createElement('p');
  
  const formGrilla = document.createElement("form");
  formGrilla.className = styles.grilla_form;
  formGrilla.setAttribute('id', 'form_login')
  
  const labelEmail = document.createElement("label");
  const inputEmail = document.createElement("input");
  const labelPass = document.createElement("label");
  const inputPass = document.createElement("input");

  const buttonGoogle = document.createElement("button");
  buttonGoogle.className = styles.button_google;
  
  const lineaIcon = document.createElement("img");
  lineaIcon.className = styles.img_linea;

  const buttonLogin = document.createElement("button");
  buttonLogin.className = styles.button_login;

  const forgetPass = document.createElement("a");

  const newAccount = document.createElement("button");
  newAccount.className = styles.btn_crear_cuenta;

  logo.src = iconLogo;
  lineaIcon.src = iconLinea;

  buttonLogin.textContent = "Iniciar Sesión";
  buttonLogin.setAttribute('type', 'submit');
  buttonLogin.addEventListener("click", async(e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPass.value;
    try {
      const userData = await signInWithFirestore(email, password); 
      saveUserSession(userData);
      navigateTo('/feed');
    } catch (error) {
      errorLogin.style.display = "block";
      const cleanForm = document.getElementById('form_login');
      cleanForm.reset();
      console.error('Error al iniciar sesión:', error.message);
    }
  });

  
  labelEmail.textContent = "Nombre de usuario o correo";
  labelPass.textContent = "Contraseña";
  inputPass.setAttribute('type', 'password');

  errorLogin.setAttribute('id','incorrect_user');
  errorLogin.style.fontWeight = 'bolder';
  errorLogin.style.color = '#E8868C';
  errorLogin.textContent = 'Usuario o contraseña incorrectos';
  errorLogin.style.display = "none";
  
  buttonGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const user = await userSignin();
      console.log(saveUserSession(user));
      navigateTo('/feed');
    } catch (error) {
      errorLogin.style.display = "block";
      console.log(error);
    }
  });
  
  forgetPass.textContent = "¿Olvidaste tu contraseña?";
  forgetPass.setAttribute('href', '/forgetpassword');

  newAccount.textContent = "Crear nueva cuenta";
  newAccount.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/new_account");
  });

  formGrilla.append(
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    buttonLogin,
    lineaIcon,
    buttonGoogle,
    forgetPass,
    newAccount
  );
  sectionHome.append(logo, errorLogin, formGrilla);

  return sectionHome;

}

export default home;

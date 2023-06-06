export interface RegisterModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive?: boolean;
}

export interface loginModel {
  username: string;
  password: string;
}

export class LoginModel {
  data!: RegisterModel;
  constructor(
    loginForm: string,
    serverData: RegisterModel,
    router: { navigate: (arg0: string[]) => void }
  ) {
    console.log(loginForm, serverData);
    if (loginForm === serverData?.password) {
      if (serverData.isActive) {
        sessionStorage.setItem('username', serverData.id);
        sessionStorage.setItem('role', serverData.role);
        if (serverData.role === 'salesperson') {
          router.navigate(['product']);
        } else {
          router.navigate(['']);
        }
      } else {
        alert('Please contact admin to activate');
      }
    } else {
      alert('invalid credentials');
    }
  }
}
